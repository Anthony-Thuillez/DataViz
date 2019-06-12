import React, { Component } from 'react';
import * as d3 from "d3";

class LiquidGauge extends Component {

    state = {
        minValue: 0,
        maxValue: 100,
        circleThickness: 0.05,
        circleFillGap: 0,
        waveHeight: 0.05,
        waveCount: 1,
        waveRiseTime: 1000,
        waveAnimateTime: 1000,
        waveRise: true,
        waveHeightScaling: true,
        waveAnimate: true,
        waveOffset: 0,
        textVertPosition: 0.5,
        textSize: 0.8,
        valueCountUp: true,
        displayPercent: true,
        textColor: "#045681",
        waveTextColor: "#A4DBf8"
    };

    animateWave = () => {
        this.wave.attr(
            "transform",
            "translate(" + this.waveAnimateScale(this.wave.attr("T")) + ",0)"
        );
        this.wave
            .transition()
            .duration(this.state.waveAnimateTime * (1 - this.wave.attr("T")))
            .ease(d3.easeLinear)
            .attr("transform", "translate(" + this.waveAnimateScale(1) + ",0)")
            .attr("T", 1)
            .on("end", (d, i, nodes) => {
                d3.select(nodes[i]).attr("T", 0);
                this.animateWave(this.state.waveAnimateTime);
            });
    }

    renderDisplay = () => {
        var config = this.state;

        var { id, median } = this.props

        var waveHeightScale;
        var gauge = d3.select("#" + id);
        var width = parseInt(gauge.style("width")) / 1.5
        var height = parseInt(gauge.style("height")) / 1.5
        var centerX = width / 2;
        var centerY = height / 2;
        var numPoints = 6;
        var strokePenta = 3;
        var radius =
            Math.min(
                width,
                height
            ) / 2;
        const points = d3.range(numPoints)
            .map(i => {
                const angle = i / numPoints * Math.PI * 2 + Math.PI;
                return {
                    x: Math.sin(angle) * radius + centerX,
                    y: Math.cos(angle) * radius + centerY
                };
            });
        const wheelLines = d3.range(numPoints).map(i => ({
            x1: points[i].x,
            y1: points[i].y,
            x2: points[(i + 1) % numPoints].x,
            y2: points[(i + 1) % numPoints].y
        }));

        var fillPercent =
            Math.max(config.minValue, Math.min(config.maxValue, this.props.value)) /
            config.maxValue;

        if (config.waveHeightScaling) {
            waveHeightScale = d3.scaleLinear()
                .range([0, config.waveHeight, 0])
                .domain([0, 50, 100]);
        } else {
            waveHeightScale = d3.scaleLinear()
                .range([config.waveHeight, config.waveHeight])
                .domain([0, 100]);
        }
        var textPixels = config.textSize * radius / 2;
        var textFinalValue = parseFloat(this.props.value).toFixed(2);
        var textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
        var percentText = config.displayPercent ? "%" : "";
        var circleThickness = config.circleThickness * radius;
        var circleFillGap = config.circleFillGap * radius;
        var fillCircleMargin = circleThickness + circleFillGap;
        var fillCircleRadius = radius - fillCircleMargin;
        var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
        var waveLength = fillCircleRadius * 2 / config.waveCount;
        var waveClipCount = 1 + config.waveCount;
        var waveClipWidth = waveLength * waveClipCount;

        var textRounder = function (value) {
            return Math.round(value);
        };
        if (parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))) {
            textRounder = function (value) {
                return parseFloat(value).toFixed(1);
            };
        }
        if (parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))) {
            textRounder = function (value) {
                return parseFloat(value).toFixed(2);
            };
        }

        var data = [];
        for (var i = 0; i <= 40 * waveClipCount; i++) {
            data.push({ x: i / (40 * waveClipCount), y: i / 40 });
        }

        var waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
        var waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);

        var waveRiseScale = d3.scaleLinear()

            .range([
                fillCircleMargin + fillCircleRadius * 2 + waveHeight,
                fillCircleMargin - waveHeight
            ])
            .domain([0, 1]);
        this.waveAnimateScale = d3.scaleLinear()
            .range([0, waveClipWidth - fillCircleRadius * 2])
            .domain([0, 1]);

        var textRiseScaleY = d3.scaleLinear()
            .range([
                fillCircleMargin + fillCircleRadius * 2,
                fillCircleMargin + textPixels * 0.7
            ])
            .domain([0, 1]);

        var gaugeGroup = gauge.append("g")
            .attr("transform", "translate(" + radius + "," + (centerY - radius) + ")");

        var text1 = gaugeGroup.append("text")
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", config.textColor)
            .attr(
                "transform",
                "translate(" +
                radius +
                "," +
                textRiseScaleY(config.textVertPosition) +
                ")"
            );

        /* 180deg du gradient */
        var defs = gaugeGroup.append("defs");

        var linearGradient = defs.append("linearGradient")
            .attr("id", "gradientColor")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        /* Haut du gradient */
        linearGradient.append("stop")
            .attr("offset", "0%")
            // .attr("stop-color", "#FC0044");
            .attr("stop-color", median && median < this.props.value && parseFloat(this.props.value) ? "#00CBE0" : "#FC0044");
        // "#00CBE0", "rgba(0, 203, 224, 0.2)"

        /* Bas du gradient */
        linearGradient.append("stop")
            .attr("offset", "98.8%")
            // .attr("stop-color", "rgba(252, 0, 68, 0.2)");
            .attr("stop-color", median && median < this.props.value && parseFloat(this.props.value) ? "rgba(0, 203, 224, 0.2)" : "rgba(252, 0, 68, 0.2)");

        var clipArea = d3.area()
            .x(function (d) {
                return waveScaleX(d.x);
            })
            .y0(function (d) {
                return waveScaleY(
                    Math.sin(
                        Math.PI * 2 * config.waveOffset * -1 +
                        Math.PI * 2 * (1 - config.waveCount) +
                        d.y * 2 * Math.PI
                    )
                );
            })
            .y1(function (d) {
                return fillCircleRadius * 2 + waveHeight;
            });
        var waveGroup = gaugeGroup.append("defs")
            .append("clipPath")
            .attr("id", "clipWave" + this.props.id);
        this.wave = waveGroup.append("path")
            .data([data])
            .attr("d", clipArea)
            .attr("T", 0);

        var fillCircleGroup = gaugeGroup.append("g")
            .attr("clip-path", "url(#clipWave" + this.props.id + ")");
        fillCircleGroup.append("path")
            .attr('d', `
                M 0 0 
                ${wheelLines.map(({ x2, y2 }) =>
                'L ' + (x2 - 50) + " " + y2
            )}
                L ${wheelLines[0].x2 - 75} ${wheelLines[0].y2}
            `)
            .style("fill", "url(#gradientColor)");
        gauge.selectAll('line').data(wheelLines)
            .enter().append('line')
            .attr('x1', d => d.x1)
            .attr('y1', d => d.y1)
            .attr('x2', d => d.x2)
            .attr('y2', d => d.y2)
            .attr('stroke', "#A6843C")
            .attr('stroke-width', strokePenta);

        var text2 = fillCircleGroup.append("text")
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", config.waveTextColor)
            .attr(
                "transform",
                "translate(" +
                radius +
                "," +
                textRiseScaleY(config.textVertPosition) +
                ")"
            );

        if (config.valueCountUp) {
            var textTween = function () {
                var i = d3.interpolate(this.textContent, textFinalValue);
                return function (t) {
                    this.textContent = textRounder(i(t)) + percentText;
                };
            };
            text1.transition().duration(config.waveRiseTime).tween("text", textTween);
            text2.transition().duration(config.waveRiseTime).tween("text", textTween);
        }

        var waveGroupXPosition =
            fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
        if (config.waveRise) {
            waveGroup.attr(
                "transform",
                "translate(" + waveGroupXPosition + "," + waveRiseScale(0) + ")"
            )
                .transition()
                .duration(config.waveRiseTime)
                .attr(
                    "transform",
                    "translate(" +
                    waveGroupXPosition +
                    "," +
                    waveRiseScale(fillPercent) +
                    ")"
                )
                .on('start', function () {
                    d3.select(this).attr({ "transform": "translate(1,0)" });
                });
        } else {
            waveGroup.attr(
                "transform",
                "translate(" +
                waveGroupXPosition +
                "," +
                waveRiseScale(fillPercent) +
                ")"
            );
        }

        if (config.waveAnimate) this.animateWave();
    }

    componentDidMount() {
        this.renderDisplay();
    }

    render() {
        const { id } = this.props
        return <svg id={id} className="fillgauge" />;
    }
}

export default LiquidGauge