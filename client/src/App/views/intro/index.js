import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './intro.scss';

import Logo from '../../assets/LogoXL.png';
import ImgLeft from '../../assets/img/HP-left.png';
import ImgRight from '../../assets/img/HP-right.png';

const body_class = "intro";

class Intro extends Component {

    componentDidMount() {
        document.body.classList.add(body_class);
    }

    componentWillUnmount() {
        document.body.classList.remove(body_class);
    }

    render() {
        return (
            <>
                <div className="img-left">
                    <img src={ImgLeft} alt="Shaco" />
                </div>
                <div className="box-intro">
                    <p>The Hetic students are happy to introduce you</p>
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <p>With... you can discover data on all League of Legend champions.</p>
                    <Link className="btn" to='/'>Launch the visualization</Link>
                </div>
                <div className="img-right">
                    <img src={ImgRight} alt="Riven" />
                </div>
            </>
        )
    }
}

export default Intro