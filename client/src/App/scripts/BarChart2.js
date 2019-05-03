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
        console.log(data)

        /* Dimentions du graph */
        var margin = { top: 40, right: 40, bottom: 40, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 900 - margin.top - margin.bottom;

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

        x.domain(data.map((d) => d.name));
        y.domain([this.findLastValOfArray(), this.findFirstValOfArray()]);
        
        svg.selectAll(".text")
            .data(data.map((d) => d.win))
            .enter()
            .append("text")
            .text((d) => d)
            .attr('x', (d, i) => x(i) + x.bandwidth() /2)
            .attr('y', (d, i) => height - y(d) + 14)
            .style('fill', 'white')
            .attr("text-anchor", "middle");

        /* Axes */
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis axis--y")
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
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.name))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y(d.win))
            .attr("height", (d) => height - y(d.win))
            .style("fill", "url(#linear-gradient)");
    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;