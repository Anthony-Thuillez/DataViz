import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './header.scss';

import Logo from '../../assets/Logo.png';

class Header extends Component {
    render() {
        return (
            <header className="header wrapper">
                <div className="left">
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="breadcrumb">
                        <Link to='#'>Home</Link>
                    </div>
                </div>
                <div className="right icon icon-search"></div>
            </header>
        )
    }
}

export default Header