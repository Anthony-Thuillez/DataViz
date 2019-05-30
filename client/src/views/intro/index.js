import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/LogoXL.png';
import ImgLeft from '../../assets/img/HP-left.png';
import ImgRight from '../../assets/img/HP-right.png';

class Intro extends Component {

    render() {
        return (
            <div className="page-intro">
                <div className="img-intro-left">
                    <img src={ImgLeft} alt="Shaco" />
                </div>
                <div className="block-intro">
                    <p>The Hetic students are happy to introduce you</p>
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <p>With... you can discover data on all League of Legend champions.</p>
                    <Link className="btn" to='/'>Launch the visualization</Link>
                </div>
                <div className="img-intro-right">
                    <img src={ImgRight} alt="Riven" />
                </div>
            </div>
        )
    }
}

export default Intro