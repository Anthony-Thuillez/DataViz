import React, { Component } from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = this.props.data;
        var margin = { top: 40, right: 40, bottom: 40, left: 60 },
            // width = 700 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var x = d3.scaleBand()
            .domain(data)
            .paddingInner(0.05)
            .range([0, height]);

        var y = d3.scaleLinear()
            .domain([43,55])
            .range([height, 0]);

        const svg = d3.select("body").append("svg")
            .style("background-color", "darkcyan")
            // .call(xAxis)
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
            
        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        var defs = svg.append("defs");

        // 180deg gradient
        var linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        // Haut du gradient
        linearGradient.append("stop")
            .attr("offset", "0%")
            // .attr("stop-color", "#FC0044"); // En dessous de la médianne
            .attr("stop-color", "#00CBE0");

        // Bas du gradient
        linearGradient.append("stop")
            .attr("offset", "98.8%")
            // .attr("stop-color", "rgba(252, 0, 68, 0.2)"); // En dessous de la médianne
            .attr("stop-color", "rgba(0, 203, 224, 0.2)");

        // Propriété du graph
        svg.selectAll("rect")
            .classed('filled', true)
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 50)
            .attr("y", (d, i) => height - 10 * d)
            .attr("width", 40)
            .attr("height", (d, i) => d * 10)
            .style("fill", "url(#linear-gradient)");
    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;