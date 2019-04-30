import React, { Component } from 'react';

import champImg1 from '../../assets/img/Gnar.png';
import champImg2 from '../../assets/img/Nidalee.png';
import champImg3 from '../../assets/img/Fizz.png';
import champImg4 from '../../assets/img/Twitch.png';
import champImg5 from '../../assets/img/Lulu.png';

export default class Champbubble extends Component {
    render() {
        return (
            <>
                <div className="thumb-champ" style={{ backgroundImage: `url(${champImg1})` }}></div>
                <div className="thumb-champ" style={{ backgroundImage: `url(${champImg2})` }}></div>
                <div className="thumb-champ" style={{ backgroundImage: `url(${champImg3})` }}></div>
                <div className="thumb-champ" style={{ backgroundImage: `url(${champImg4})` }}></div>
                <div className="thumb-champ" style={{ backgroundImage: `url(${champImg5})` }}></div>
            </>
        )
    }
}