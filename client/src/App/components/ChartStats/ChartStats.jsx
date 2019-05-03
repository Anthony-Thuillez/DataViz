import React, { Component, Fragment } from 'react'
import SortByRate from '../../scripts/SortByRate'
import data from '../../../data.json'
import Chart from 'chart.js';

class ChartStats extends Component {
    /**
     * @param {String} name(props) [Champion name]
     * @return {String[]} the statistics of a champion
     */
    getAllStats(name) {
        let champions = SortByRate.getChampByPost(data, "top")
        let championStats = champions.map(function (champ) {
            return {
                name: champ.name,
                damage: champ.damage,
                tankiness: champ.tankiness,
                control: champ.control,
                mobility: champ.mobility,
                utility: champ.utility
            }
        });
        for (let i = 0, l= championStats.length; i <l; i++) {
            if (championStats[i].name === name) {
                let stats = {
                    damage: championStats[i].damage,
                    tankiness: championStats[i].tankiness,
                    control: championStats[i].control,
                    mobility: championStats[i].mobility,
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
            new Chart(ctx, {
                // The type of chart we want to create
                type: 'radar',

                // The data for our dataset
                data: {
                    labels: ['damage', "tankiness", 'control', "mobility", 'utility'],
                    datasets: [{
                            backgroundColor: 'rgba(0, 203, 224, 0.455)',
                            data: this.getAllStats("Akalie"),
                            radius: 0,
                        }

                    ]
                },

                // Configuration options go here
                options: {
                    scale: {
                        display: false,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            })
    }
    render() {
        return(
            <Fragment>
                <canvas id="myChart"></canvas>
            </Fragment>
        )
    }
}

export default ChartStats