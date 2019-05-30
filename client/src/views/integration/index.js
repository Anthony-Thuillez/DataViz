import React from 'react';
import { Link } from 'react-router-dom';

const Integration = () => (
    <div className="page-integration">
        <h2>Liste des composants :</h2>
        <br></br>
        <h2>Couleurs :</h2>
        <div className="container">
            <div className="color darkblue"></div>
            <div className="color blue"></div>
            <div className="color gold"></div>
            <div className="color blue-gradient"></div>
            <div className="color gold-gradient"></div>
            <div className="color red-gradient"></div>
        </div>

        <h2>Icons :</h2>
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

        <h2>Bulles champions :</h2>
        <div className="container">
            <div className="bubble-champ big"></div>
            <div className="bubble-champ large"></div>
            <div className="bubble-champ medium"></div>
            <div className="bubble-champ small"></div>
            <div className="bubble-champ tiny"></div>
        </div>
        <div className="container">
            <Link to="#"><div className="bubble-champ big"></div></Link>
            <Link to="#"><div className="bubble-champ large"></div></Link>
            <Link to="#"><div className="bubble-champ medium"></div></Link>
            <Link to="#"><div className="bubble-champ small"></div></Link>
            <Link to="#"><div className="bubble-champ tiny"></div></Link>
        </div>

        <h2>Bulles des postes :</h2>
        <div className="container">
            <Link to="#" className="btn-post icon icon-top"><span>Top</span></Link>
            <Link to="#" className="bubble-post icon icon-jgl"><span>Jungle</span></Link>
            <Link to="#" className="bubble-post icon icon-mid"><span>Mid</span></Link>
            <Link to="#" className="bubble-post icon icon-bot"><span>Bot</span></Link>
            <Link to="#" className="bubble-post icon icon-supp"><span>Support</span></Link>
        </div>

        <h2>Button :</h2>
        <div className="btn">Button</div>
        <div className="btn-back">back</div>
    </div>
)

export default Integration