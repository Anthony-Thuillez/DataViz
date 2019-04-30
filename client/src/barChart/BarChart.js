import React, { Component } from 'react';
import * as d3 from "d3";

import './style.css'

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = this.props.data;

        const svg = d3.select("body").append("svg")
            .attr("width", this.props.width)
            .attr("height", this.props.height);

        var defs = svg.append("defs");

        var linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        linearGradient.append("stop")
            .attr("offset", "0%")
            // .attr("stop-color", "#FC0044"); // En dessous de la médianne
            .attr("stop-color", "#00CBE0");

        linearGradient.append("stop")
            .attr("offset", "98.8%")
            // .attr("stop-color", "rgba(252, 0, 68, 0.2)"); // En dessous de la médianne
            .attr("stop-color", "rgba(0, 203, 224, 0.2)");

        svg.selectAll("rect")
            .classed('filled', true)
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => this.props.height - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .style("fill", "url(#linear-gradient)");
    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;