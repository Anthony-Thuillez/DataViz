import React, { Component } from 'react';
import * as d3 from "d3";
import SortByRate from '../scripts/SortByRate'

import data from '../../data.json'

class BarChart extends Component {
    state = {
        rates: SortByRate.orderByRate(data, "pick", "top")
    }
    componentDidMount() {
        this.drawChart();
    }

    findFirstValOfArray = () => {
        let arr = SortByRate.orderByRate(data, "ban", "top")
        for (let i = 0; i < arr.length; i++) {
            let firstEl = arr[0]
            return firstEl
        }
    }

    findLastValOfArray = () => {
        let arr = SortByRate.orderByRate(data, "ban", "top")
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

        var rate = data.map((x) => {
            return x.win
        })

        var margin = { top: 40, right: 40, bottom: 40, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 900 - margin.top - margin.bottom;

        /* Propriétés du Graph */
        const svg = d3.select("body").append("svg")
            .style("background-color", "darkcyan")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        /* Taille + data de x */
        var x = d3.scaleBand()
            .domain(data.map(function (d) { return d.name; }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        /* Taille + data de y */
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.win; })])
            // .domain([this.findLastValOfArray(), this.findFirstValOfArray()])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        /* 180deg du gradient */
        var defs = svg.append("defs");

        var linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        /* Haut du gradient */
        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#00CBE0");

        /* Bas du gradient */
        linearGradient.append("stop")
            .attr("offset", "98.8%")
            .attr("stop-color", "rgba(0, 203, 224, 0.2)");

        /* Propriété fill du graph */
        svg.selectAll("rect")
            .classed('filled', true)
            .data(rate)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 90)
            .attr("y", (d, i) => height - 10 * d)
            .attr("width", 50)
            .attr("height", (d, i) => d * 10)
            .style("fill", "url(#linear-gradient)");
    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;