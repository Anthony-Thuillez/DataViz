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
    render() {
        const { ranks } = this.state;
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
                        <div className="block blue-primery"></div>
                        <div className="block blue-secondary"></div>
                        <div className="block gold"></div>
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
                        <div className="thumb-post">
                            <p>Top</p>
                        </div>
                        <div className="thumb-post">
                            <p>Jungle</p>
                        </div>
                        <div className="thumb-post">
                            <p>Mid</p>
                        </div>
                        <div className="thumb-post">
                            <p>Bot</p>
                        </div>
                        <div className="thumb-post">
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