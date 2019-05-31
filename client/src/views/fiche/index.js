import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import SortByRate from '../../helpers/SortByRate';
import LiquidChart from './ficheContainer';

import BtnBack from '../../components/BtnBack';

import Map from '../../assets/img/Map.svg';

class Fiche extends Component {

    state = {
        value: 50,
    };

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
        ctx.canvas.parentNode.style.height = '200px';
        ctx.canvas.parentNode.style.width = '200px';
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
                }]
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
                <BtnBack />
                <div className="page-fiche">

                    <div className="sidebar">
                        <div className="sidebar-champion">
                            <div className="bubble-champ big" style={{ backgroundImage: `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3IuwhHQix88XL6mc5mRaVUtkWoGfh5YeVdA-1E4iIrZBQjjYw'})` }}></div>
                            <div className="block">
                                <div className="title">
                                    <img src="https://universe.leagueoflegends.com/images/role_icon_fighter.png" alt="icon" />
                                    <h2>Gnar</h2>
                                </div>
                                <p className="quotation">the Missing Link</p>
                            </div>
                        </div>

                        <div className="sidebar-rates">
                            <div className="block">
                                <LiquidChart value={this.state.value} />
                                { /* <span>Win rate</span> */ }
                            </div>
                        </div>

                        <div className="sidebar-stats">
                            <canvas id="myChart"></canvas>
                        </div>

                        <Link className="btn" to='/compare'>Compare</Link>
                    </div>

                    <div className="map">
                        <div className="map-container">
                            <img src={Map} alt="map" />
                            <div className="top"></div>
                            <div className="jgl"></div>
                            <div className="mid"></div>
                            <div className="bot"></div>
                            <div className="supp"></div>
                        </div>
                    </div>

                </div>
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