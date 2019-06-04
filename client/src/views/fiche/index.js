import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import SortByRate from '../../helpers/SortByRate';
import LiquidChart from './ficheContainer';
import ReactTooltip from 'react-tooltip';

import BtnBack from '../../components/BtnBack';

import Damage from '../../assets/icons/Damage.svg';
import Control from '../../assets/icons/Control.svg';
import Taughness from '../../assets/icons/Taughness.svg';
import Mobility from '../../assets/icons/Mobility.svg';
import Utility from '../../assets/icons/Utility.svg';
import Stats from '../../assets/img/Stats.png';
import Map from '../../assets/img/Map.svg';

class Fiche extends Component {

    /*
    state = {
        value: 50,
    };
    */

    /**
     * @param {String} name(props) [Champion name]
     * @return {String[]} the statistics of a champion
    */
    champStats() {
        let champion = SortByRate.getChampByName(this.props.data, this.props.champ_name)
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
        ctx.canvas.parentNode.style.height = '167px';
        ctx.canvas.parentNode.style.width = '167px';
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
                    display: false,
                    ticks: {
                        beginAtZero: true,
                        max: 3 
                    }
                }
            }
        })
        this.champGlobal()
    }

    champGlobal() {
        let champion = SortByRate.getChampByName(this.props.data, this.props.champ_name)
        for (let i = 0; i < champion.poste.length; i++) {
            if (champion.poste.length === 1) {
                this.props.set_global(champion.quotation, champion.icon, champion.role, champion.win, champion.ban, champion.pick, champion.poste[0].name, champion.poste[0].value, "", null, "", null)
                return
            } else if (champion.poste.length === 2) {
                this.props.set_global(champion.quotation, champion.icon, champion.role, champion.win, champion.ban, champion.pick, champion.poste[0].name, champion.poste[0].value, champion.poste[1].name, champion.poste[1].value, "", null)
                return
            } else if (champion.poste.length === 3) {
                this.props.set_global(champion.quotation, champion.icon, champion.role, champion.win, champion.ban, champion.pick, champion.poste[0].name, champion.poste[0].value, champion.poste[1].name, champion.poste[1].value, champion.poste[2].name, champion.poste[2].value)
                return
            }
        }
        
    }
    
    render() {
        return (
            <>
                <BtnBack />
                <div className="page-fiche">

                    <div className="sidebar">
                        <div className="sidebar-champion">
                            <div className="bubble-champ big" style={{ backgroundImage: `url(${this.props.champ_icon})` }}></div>
                            <div className="block">
                                <div className="title">
                                    <div
                                        // eslint-disable-next-line
                                        data-tip={"<span>" + `${this.props.champ_role}` + "</span>"}
                                        data-html={true}
                                        // eslint-disable-next-line
                                        className={"icon icon-" + `${this.props.champ_role}`}
                                >
                                    </div>
                                    <h2>{this.props.champ_name}</h2>
                                </div>
                                <p className="quotation">{this.props.champ_quolation}</p>
                            </div>
                        </div>

                        <div className="sidebar-rates">
                            <div className="block">
                                <LiquidChart />
                                { /* <span>Win rate</span> */ }
                            </div>
                        </div>

                        <div className="sidebar-stats">
                            <div className="graph-container">
                                <img className="img-graph" src={Stats} alt="stats-graph" />
                                <img data-tip="<span>Damage</span>" data-html={true} className="icon-stat damage" src={Damage} alt="icon-damage" />
                                <img data-tip="<span>Control</span>" data-html={true} className="icon-stat control" src={Control} alt="icon-control" />
                                <img data-tip="<span>Taughness</span>" data-html={true} className="icon-stat taughness" src={Taughness} alt="icon-taughness" />
                                <img data-tip="<span>Mobility</span>" data-html={true} className="icon-stat mobility" src={Mobility} alt="icon-mobility" />
                                <img data-tip="<span>Utility</span>" data-html={true} className="icon-stat utility" src={Utility} alt="icon-utility" />
                                <canvas id="myChart"></canvas>
                            </div>
                        </div>

                        <div>
                            <Link className="btn" to='/compare'>Compare</Link>
                        </div>
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
                
                <ReactTooltip className="tooltip" offset={{ top: 10 }} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        champ_name: state.champ_name,
        champ_quolation: state.champ_quolation,
        champ_icon: state.champ_icon,
        champ_role: state.champ_role,
        champ_win: state.champ_win,
        champ_ban: state.champ_ban,
        champ_pick: state.champ_pick,
        champ_posteName: state.champ_posteName,
        champ_posteValue: state.champ_posteValue,
        champ_posteName2: state.champ_posteName2,
        champ_posteValue2: state.champ_posteValue2,
        champ_posteName3: state.champ_posteName3,
        champ_posteValue3: state.champ_posteValue3
    }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        set_global: (quotation, icon, role, win, ban, pick, posteName, posteValue, posteNam2, posteValue2, posteName3, posteValue3) => {
            dispatch({
                type: 'SET_GLOBAL',
                value: {
                    quotation,
                    icon,
                    role,
                    win,
                    ban,
                    pick,
                    posteName, 
                    posteValue, 
                    posteNam2, 
                    posteValue2, 
                    posteName3, 
                    posteValue3
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fiche);