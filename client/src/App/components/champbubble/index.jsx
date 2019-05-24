import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './champbubble.scss';

import champImg1 from '../../assets/img/Gnar.png';
import champImg2 from '../../assets/img/Nidalee.png';
import champImg3 from '../../assets/img/Fizz.png';
import champImg4 from '../../assets/img/Twitch.png';
import champImg5 from '../../assets/img/Lulu.png';

export default class Champbubble extends Component {
    render() {
        return (
            <>
                <Link to="./fiche" className="btn-champ" style={{ backgroundImage: `url(${champImg1})` }} />
                <Link to="./fiche" className="btn-champ" style={{ backgroundImage: `url(${champImg2})` }} />
                <Link to="./fiche" className="btn-champ" style={{ backgroundImage: `url(${champImg3})` }} />
                <Link to="./fiche" className="btn-champ" style={{ backgroundImage: `url(${champImg4})` }} />
                <Link to="./fiche" className="btn-champ" style={{ backgroundImage: `url(${champImg5})` }} />
            </>
        )
    }
}