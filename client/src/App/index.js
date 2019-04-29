import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Filter from './postChamp/postChamp';
import Graph from '../Components/Graph/Graph';

import './reset.scss';
import './style.scss';

import logo from './img/Logo.png';
import soundActive from './img/Activated.svg';


class Integration extends Component {
    state = {
        ranks: [
            { name: "S", isActive: true },
            { name: "A" },
            { name: "B" },
            { name: "C" },
            { name: "D" }
        ],
        rates: [
            { name: "Win rate", isActive: true },
            { name: "Pick rate" },
            { name: "Ban rate" },
        ]
    };

    handleIsActive = id => {
        this.setState(prev => {
            const { ranks } = prev;
            const nextRank = ranks.map(rank => {
                if (rank.name !== id) return { ...rank, isActive: false };
                return {
                    ...rank,
                    isActive: !rank.isActive
                };
            });
            return { ...prev, ranks: nextRank };
        });
    };
    handleIsActive2 = id => {
        this.setState(prev => {
            const { rates } = prev;
            const nextRate = rates.map(rate => {
                if (rate.name !== id) return { ...rate, isActive: false };
                return {
                    ...rate,
                    isActive: !rate.isActive
                };
            });
            return { ...prev, rates: nextRate };
        });
    };
    render() {
        const { ranks } = this.state;
        const { rates } = this.state;
        return (
            <Fragment>
                <div className="wrapper">
                    <h1>Liste des composants :</h1>

                    <nav className="navigation">
                        <div className="logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="rank-filter">
                            {
                                ranks.map((rank, index) => {
                                    return (
                                        <div 
                                            key={index}
                                            className={`btnRank ${rank.isActive ? 'active' : ''}`}
                                            onClick={() => this.handleIsActive(rank.name)}
                                        >
                                            <span>{rank.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="soundbox">
                            <img src={soundActive} alt="soundbox" />
                        </div>
                    </nav>

                    <h2 className="title">Couleurs :</h2>
                    <div className="container">
                        <div className="block darkblue"></div>
                        <div className="block blue"></div>
                        <div className="block gold"></div>
                        <div className="block blue-gradient"></div>
                        <div className="block gold-gradient"></div>
                        <div className="block red-gradient"></div>
                    </div>

                    <h2 className="title">Icons :</h2>
                    <div className="container icons">
                        <div className="icon icon-top"></div>
                        <div className="icon icon-jgl"></div>
                        <div className="icon icon-mid"></div>
                        <div className="icon icon-bot"></div>
                        <div className="icon icon-supp"></div>                          
                    </div>

                    <h2 className="title">Buttons :</h2>
                    <div className="container">
                            <div className="group-btn">
                                {
                                    rates.map((rate, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`btn ${rate.isActive ? 'active' : ''}`}
                                                onClick={() => this.handleIsActive2(rate.name)}
                                            >
                                                {rate.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    </div>

                    <h2 className="title">Bulles champions :</h2>
                    <div className="container">
                        <div className="thumb-champ"></div>
                        <div className="thumb-champ"></div>
                        <div className="thumb-champ"></div>
                        <div className="thumb-champ"></div>
                        <div className="thumb-champ"></div>
                    </div>

                    <h2 className="title">Bulles des postes :</h2>
                    <div className="container">
                        <div className="thumb-post icon icon-top">
                            <p>Top</p>
                        </div>
                        <div className="thumb-post icon icon-jgl">
                            <p>Jungle</p>
                        </div>
                        <div className="thumb-post icon icon-mid">
                            <p>Mid</p>
                        </div>
                        <div className="thumb-post icon icon-bot">
                            <p>Bot</p>
                        </div>
                        <div className="thumb-post icon icon-supp">
                            <p>Support</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

class App extends Component {
    render() {
        return(
            <Router>
                <Fragment>
                    <Route exact path="/" component={Integration}/> {/* root page */}
                    <Route path="/Filter" component={Filter}/> {/* root page */}
                    <Route path="/graph" component={Graph} />
                </Fragment>
            </Router>
        )
    }
}

export default App