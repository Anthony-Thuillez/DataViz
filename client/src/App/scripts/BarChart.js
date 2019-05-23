import React, { Component } from 'react';
import * as d3 from "d3";
import SortByRate from './SortByRate';
import { connect } from 'react-redux';


import data from '../../data.json';

const linearGradient = (svg, id, color1, color2) => {
    /* 180deg du gradient */
    var defs = svg.append("defs");

    var linearGradient = defs.append("linearGradient")
        .attr("id", id)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    /* Haut du gradient */
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color1);

    /* Bas du gradient */
    linearGradient.append("stop")
        .attr("offset", "98.8%")
        .attr("stop-color", color2);
}

class BarChart extends Component {
    removePreviousChart() {
        let chart = document.querySelector('svg');
        chart.remove();
    }

    componentWillMount() {
        this.drawChart(
            this.findFirstValOfArray(),
            this.findLastValOfArray(),
            this.displayChamp(this.props.selectedRate),
            this.median()
        );
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.selectedRate !== prevProps.selectedRate) {
            /* For re-render the graph we need to remove it first */
            this.removePreviousChart();
            this.drawChart(
                this.findFirstValOfArray(),
                this.findLastValOfArray(),
                this.displayChamp(this.props.selectedRate),
                this.median()
            );
        }
    }

    findFirstValOfArray = () => {
        let arr = SortByRate.orderByRate(data, this.props.selectedRate, "top")
        for (let i = 0; i < arr.length; i++) {
            let firstEl = arr[0]
            return firstEl
        }
    }

    findLastValOfArray = () => {
        let arr = SortByRate.orderByRate(data, this.props.selectedRate, "top")
        for (let i = 0; i < arr.length; i++) {
            const lastEl = arr[arr.length - 1]
            return lastEl
        }
    }

    displayChamp(rate) {
        let champion = SortByRate.getChampByPost(data, "top")
        var champ = champion.map((champ) => {
            return {
                name: champ.name,
                rate: champ[rate]
            }
        })
        return champ
    }

    median() {
        let _median = SortByRate.medianRate(data, this.props.selectedRate, "top")
        return _median
    }

    drawChart(func_firstEl, func_lastEl, func_champ, func_median) {
        let data = func_champ
        let _median = func_median
        let firstEl = func_firstEl
        let lastEl = func_lastEl
        let { selectedRate } = this.props

        console.log(this.props.selectedRate)

        /* Dimentions du graph */
        var margin = { top: 40, right: 40, bottom: 40, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

        /* Propriété du graph */
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.3);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var svg = d3.select("body").append("svg")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var minimum = lastEl - 5
        var maximum = firstEl + 5

        x.domain(data.map((d) => d.name));
        y.domain([minimum, maximum]);

        /* Axes */
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            // .call(d3.axisLeft(y).tickFormat(d => d + "%"))
            .call(d3.axisLeft(y).tickValues([]));

        linearGradient(svg, 'blue-gradient', "#00CBE0", "rgba(0, 203, 224, 0.2)")
        linearGradient(svg, 'red-gradient', "#FC0044", "rgba(252, 0, 68, 0.2)")

        const min = svg.append('g')
        min
            .append("line")
            .style("stroke", "#A6843C")
            .style("stroke-width", 3)
            .attr("x1", 0)
            .attr("y1", y(lastEl))
            .attr("x2", width)
            .attr("y2", y(lastEl))
        min
            .append('text')
            .attr('fill', '#A6843C')
            .text(lastEl + '%')
            .style("font-size", "18px")
            .attr("x", -10)
            .attr("y", y(lastEl))
            .attr("text-anchor", "end")
            .attr('alignment-baseline', 'middle')


        const max = svg.append('g')
        max
            .append("line")
            .style("stroke", "#A6843C")
            .style("stroke-width", 3)
            .attr("x1", 0)
            .attr("y1", y(firstEl))
            .attr("x2", width)
            .attr("y2", y(firstEl))

        max
            .append('text')
            .attr('fill', '#A6843C')
            .text(firstEl + '%')
            .style("font-size", "18px")
            .attr("x", -10)
            .attr("y", y(firstEl))
            .attr("text-anchor", "end")
            .attr('alignment-baseline', 'middle')

        const median = svg.append('g')

        median
            .append("line")
            .style("stroke", "#A6843C")
            .style("stroke-width", 3)
            .attr("x1", 0)
            .attr("y1", y(_median))
            .attr("x2", width)
            .attr("y2", y(_median))
        median
            .append('text')
            .attr('fill', '#A6843C')
            .text(_median + '%')
            .style("font-size", "18px")
            .attr("x", -10)
            .attr("y", y(_median))
            .attr("text-anchor", "end")
            .attr('alignment-baseline', 'middle')


        /* Propriété fill du graph */
        svg.selectAll(".bar", selectedRate)
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => x(d.name))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y(d.rate))
            .attr("height", (d) => height - y(d.rate))
            // eslint-disable-next-line
            .style("fill", function (d) {
                var Rate = selectedRate

                if (Rate && Rate !== "ban") {
                    if (d.rate > _median || (d.rate === _median)) { return "url(#blue-gradient)" }
                    else { return "url(#red-gradient)" }
                } else if (Rate && Rate === "ban") {
                    if (d.rate > _median ) { return "url(#red-gradient)" }
                    else { return "url(#blue-gradient)" }
                }
            })

        svg.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => d.rate === _median ? "=" : d.rate)
            .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
            .attr("y", (d) => (y(d.rate) + height) / 2)
            .style('fill', 'white')
            .attr("text-anchor", "middle");

        var w = document.querySelectorAll(".domain")
        for (let i = 0; i < w.length; i++) {
            w[i].setAttribute('stroke', "rgb(166, 132, 60)");
            w[i].setAttribute('stroke-width', 3);
        }
    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedRate: state.selectedRate
    }
}
export default connect(mapStateToProps, null)(BarChart);