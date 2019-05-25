import React, { Component } from 'react'
import SortByRate from '../../scripts/SortByRate'
import { connect } from 'react-redux';

// import data from '../../../data.json'
import Chart from 'chart.js';


class Fiche extends Component {
    /**
     * @param {String} name(props) [Champion name]
     * @return {String[]} the statistics of a champion
    */
    getAllStats(name) {
        let champions = SortByRate.getChampByPost(this.props.data, "top")        
        let championStats = champions.map(function (champ) {
            return {
                name: champ.name,
                damage: champ.damage,
                toughness: champ.toughness,
                control: champ.control,
                speed: champ.speed,
                utility: champ.utility
            }
        });
        for (let i = 0; i < championStats.length; i++) {
            if (championStats[i].name === name) {
                let stats = {
                    damage: championStats[i].damage,
                    toughness: championStats[i].toughness,
                    control: championStats[i].control,
                    speed: championStats[i].speed,
                    utility: championStats[i].utility
                }
                return Object.values(stats)
            }
        }
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
                    data: this.getAllStats("Akali"),
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
        data: state.data
    }
}
export default connect(mapStateToProps, null)(Fiche);