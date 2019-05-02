import React, { Component } from 'react';

import Header from '../../components/header';
import Colors from '../../components/colors';
import Filter from '../../components/filter';
import Champbubble from '../../components/champbubble';
import Postbubble from '../../components/postbubble';

const body_integration_class = "integration";

class Integration extends Component {
    componentDidMount() {
        document.body.classList.add(body_integration_class);
    }

    componentWillUnmount() {
        document.body.classList.remove(body_integration_class);
    }

    render() {
        return (
            <>
                <Header />
                <main className="main wrapper">
                    <h1>Liste des composants :</h1>

                    <h2 className="title">Couleurs :</h2>
                    <div className="container">
                        <Colors />
                    </div>

                    <h2 className="title">Icons :</h2>
                    <div className="container">
                        <div className="icon icon-top"></div>
                        <div className="icon icon-jgl"></div>
                        <div className="icon icon-mid"></div>
                        <div className="icon icon-bot"></div>
                        <div className="icon icon-supp"></div>
                        <div className="icon icon-map"></div>
                        <div className="icon icon-stats"></div>
                        <div className="icon icon-cross"></div>
                        <div className="icon icon-barrow"></div>
                        <div className="icon icon-search"></div>
                        <div className="icon icon-damage"></div>
                        <div className="icon icon-tankiness"></div>
                        <div className="icon icon-control"></div>
                        <div className="icon icon-mobility"></div>
                        <div className="icon icon-utility"></div>
                    </div>

                    <h2 className="title">Buttons :</h2>
                    <div className="container">
                        <Filter />
                    </div>

                    <h2 className="title">Bulles champions :</h2>
                    <div className="container">
                        <Champbubble />
                    </div>

                    <h2 className="title">Bulles des postes :</h2>
                    <div className="container">
                        <Postbubble />
                    </div>

                </main>
            </>
        )
    }
}

export default Integration