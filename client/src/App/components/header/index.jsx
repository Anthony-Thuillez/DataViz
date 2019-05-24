import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from '../breadcrumb';
import SearchBar from '../searchBar';

import './header.scss';

import Logo from '../../assets/Logo.png';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="left">
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <Breadcrumbs />
                </div>
                <div className="navigation">
                    <Link to="/" className="navigation-link active"><span>Home</span></Link>
                    <Link to="./compare" className="navigation-link"><span>Compare</span></Link>
                </div>
                <div className="right">
                    <SearchBar /> 
                </div>
            </header>
        )
    }
}

export default Header