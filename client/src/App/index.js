import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Filter from './postChamp/postChamp'

import './reset.scss';
import './style.scss';

class Integration extends Component {
    constructor(props) {
        super(props);

        this.toggleActiveClass = this.toggleActiveClass.bind(this);
        this.state = {
            isActive: false
        }
    }

    toggleActiveClass() {
        const currentState = this.state.isActive;
        this.setState({ isActive: !currentState });
    }

    render() {
        return (
            <Fragment>
                <h1>Liste des composants :</h1>

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

                <h2 className="title">Bouttons Ranking :</h2>
                <div className="container space-around">
                    <div 
                        className={this.state.isActive ? 'btn-rank active' : 'btn-rank'}
                        onClick={this.toggleActiveClass}
                    >
                        <span>S</span>
                    </div>
                    <div
                        className={this.state.isActive ? 'btn-rank active' : 'btn-rank'}
                        onClick={this.toggleActiveClass}
                    >
                        <span>A</span>
                    </div>
                    <div
                        className={this.state.isActive ? 'btn-rank active' : 'btn-rank'}
                        onClick={this.toggleActiveClass}
                    >
                        <span>B</span>
                    </div>
                    <div
                        className={this.state.isActive ? 'btn-rank active' : 'btn-rank'}
                        onClick={this.toggleActiveClass}
                    >
                        <span>C</span>
                    </div>
                    <div
                        className={this.state.isActive ? 'btn-rank active' : 'btn-rank'}
                        onClick={this.toggleActiveClass}
                    >
                        <span>D</span>
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
                </Fragment>
            </Router>
        )
    }
}

export default App