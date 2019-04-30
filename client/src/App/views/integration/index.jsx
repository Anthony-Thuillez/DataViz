import React, { Component } from 'react';

import Button from '../../components/button';
import Champbubble from '../../components/champbubble';
import Postbubble from '../../components/postbubble';

class Integration extends Component {
    render() {
        return (
            <>
                <div className="wrapper">
                    <h1>Liste des composants :</h1>

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
                        <Button />
                    </div>

                    <h2 className="title">Bulles champions :</h2>
                    <div className="container">
                        <Champbubble />
                    </div>

                    <h2 className="title">Bulles des postes :</h2>
                    <div className="container">
                        <Postbubble />
                    </div>
                </div>
            </>
        )
    }
}

export default Integration