import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumb';
import SearchBar from '../Searchbar';

import Logo from '../../assets/Logo.png';

class Header extends Component {

    state = {
        header: [
            { name: "Home", path: "/", isActive: true },
            { name: "Compare", path: "/compare" }
        ]
    };

    handleActive = el => {
        this.setState(prev => {
            const { header } = prev;
            const nextLink = header.map(link => {
                if (link.name == el && link.isActive) return { ...link, isActive: true }
                if (link.name !== el) return { ...link, isActive: false }
                return {
                    ...link,
                    isActive: !link.isActive
                };
            });
            return { ...prev, header: nextLink };
        });

    };

    render() {
        const { header } = this.state;
        return (
            <header className="header">
                <div className="header-left">
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <Breadcrumbs />
                </div>
                <div className="navigation">
                    {
                        header.map((el, index) => {
                            return (
                                <Link
                                    to={el.path}
                                    key={index}
                                    className={`navigation-link ${el.isActive ? 'active' : ''}`}
                                    onClick={() => this.handleActive(el.name)}
                                >
                                    <span>{el.name}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="header-right">
                    <SearchBar />
                </div>
            </header>
        )
    }
}

export default Header