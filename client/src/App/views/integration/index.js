import React, { Component } from 'react';

import Champbubble from '../../components/champbubble';
import Postbubble from '../../components/postbubble';

import './integration.scss';

class Integration extends Component {

    render() {
        return (
            <>
                <h1>Liste des composants :</h1>

                <h2 className="title">Couleurs :</h2>
                <div className="container">
                    <div className="color darkblue"></div>
                    <div className="color blue"></div>
                    <div className="color gold"></div>
                    <div className="color blue-gradient"></div>
                    <div className="color gold-gradient"></div>
                    <div className="color red-gradient"></div>
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

                <h2 className="title">Bulles champions :</h2>
                <div className="container">
                    <Champbubble />
                </div>

                <h2 className="title">Bulles des postes :</h2>
                <div className="container">
                    <Postbubble />
                </div>

                <h2 className="title">Button :</h2>
                <div className="container">
                    <div className="btn">Button</div>
                </div>
            </>
        )
    }
}

export default Integration