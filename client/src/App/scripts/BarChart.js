import React, { Component } from 'react';
import * as d3 from "d3";
import SortByRate from './SortByRate';

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
    state = {
        rates: SortByRate.orderByRate(data, "win", "top"),
        median: SortByRate.medianRate(data, "win", "top")
    }
    componentDidMount() {
        this.drawChart();
    }

    findFirstValOfArray = () => {
        let arr = SortByRate.orderByRate(data, "win", "top")
        for (let i = 0; i < arr.length; i++) {
            let firstEl = arr[0]
            return firstEl
        }
    }

    findLastValOfArray = () => {
        let arr = SortByRate.orderByRate(data, "win", "top")
        for (let i = 0; i < arr.length; i++) {
            const lastEl = arr[arr.length - 1]
            return lastEl
        }
    }

    displayChamp() {
        let champion = SortByRate.getChampByPost(data, "top")
        var champ = champion.map((champ) => {
            return {
                name: champ.name,
                win: champ.win
            }
        })
        return champ
    }



    drawChart() {
        const data = this.displayChamp();

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

        var minimum = this.findLastValOfArray() - 5
        var maximum = this.findFirstValOfArray() + 5

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
            .attr("y1", y(this.findLastValOfArray()))
            .attr("x2", width)
            .attr("y2", y(this.findLastValOfArray()))
        min
            .append('text')
            .attr('fill', '#A6843C')
            .text(this.findLastValOfArray() + '%')
            .style("font-size", "18px")
            .attr("x", -10)
            .attr("y", y(this.findLastValOfArray()))
            .attr("text-anchor", "end")
            .attr('alignment-baseline', 'middle')


        const max = svg.append('g')
        max
            .append("line")
            .style("stroke", "#A6843C")
            .style("stroke-width", 3)
            .attr("x1", 0)
            .attr("y1", y(this.findFirstValOfArray()))
            .attr("x2", width)
            .attr("y2", y(this.findFirstValOfArray()))

        max
            .append('text')
            .attr('fill', '#A6843C')
            .text(this.findFirstValOfArray() + '%')
            .style("font-size", "18px")
            .attr("x", -10)
            .attr("y", y(this.findFirstValOfArray()))
            .attr("text-anchor", "end")
            .attr('alignment-baseline', 'middle')

        const median = svg.append('g')

        median
            .append("line")
            .style("stroke", "#A6843C")
            .style("stroke-width", 3)
            .attr("x1", 0)
            .attr("y1", y(this.state.median))
            .attr("x2", width)
            .attr("y2", y(this.state.median))
        median
            .append('text')
            .attr('fill', '#A6843C')
            .text(this.state.median + '%')
            .style("font-size", "18px")
            .attr("x", -10)
            .attr("y", y(this.state.median))
            .attr("text-anchor", "end")
            .attr('alignment-baseline', 'middle')

        /* Propriété fill du graph */
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => x(d.name))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y(d.win))
            .attr("height", (d) => height - y(d.win))
            // eslint-disable-next-line
            .style("fill", d => d.win > this.state.median || (d.win == this.state.median) ? "url(#blue-gradient)" : "url(#red-gradient)");
        svg.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => d.win === this.state.median ? "=" : d.win)
            .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
            .attr("y", (d) => (y(d.win) + height) / 2)
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

export default BarChart;