import React, { Component } from 'react'
import SortByRate from '../../scripts/SortByRate'
import { connect } from 'react-redux';
import Chart from 'chart.js';


class Fiche extends Component {
    /**
     * @param {String} name(props) [Champion name]
     * @return {String[]} the statistics of a champion
    */
    champStats() {
        let champion = SortByRate.getChampByName(this.props.data, this.props.selectedChamp)
        return [
            champion.damage,
            champion.toughness,
            champion.control,
            champion.speed,
            champion.utility
        ]
    }
    componentDidMount() {
        var ctx = document.getElementById('myChart').getContext('2d');
        Chart.defaults.global.legend.display = false;
        Chart.platform.disableCSSInjection = true;
        ctx.canvas.parentNode.style.height = '357px';
        ctx.canvas.parentNode.style.width = '357px';
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'radar',

            // The data for our dataset
            data: {
                labels: ['damage', "toughness", 'control', "speed", 'utility'],
                datasets: [{
                    backgroundColor: 'rgba(0, 203, 224, 0.455)',
                    data: this.champStats(),
                    radius: 0,
                }

                ]
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: false,
                scale: {
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        max: 3 
                    }
                }
            }
        })
    }

    render() {        
        return (
            <>
                <canvas id="myChart"></canvas>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.data,
        selectedChamp: state.selectedChamp
    }
}
export default connect(mapStateToProps, null)(Fiche);