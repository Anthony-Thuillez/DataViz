import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Breadcrumbs from '../Breadcrumb';
import SearchBar from '../Searchbar';

import Logo from '../../assets/Logo.png';

class Header extends Component {
    componentWillMount() {
        if (window.location.href.includes("/graph")) {
            let champPosteParameter = window.location.href.split('/graph-')
            champPosteParameter = champPosteParameter[champPosteParameter.length - 1]
            this.props.set_poste_from_url(champPosteParameter)

        } else if (window.location.href.includes("/fiche-")) {
            let champNameParameter = window.location.href.split('/fiche-')
            champNameParameter = champNameParameter[champNameParameter.length - 1]
            this.props.set_champname_from_url(champNameParameter)
        }
    }

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
                if (link.name === el && link.isActive) return { ...link, isActive: true }
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

const mapDispatchToProps = (dispatch) => {
    return {
        set_poste_from_url: (champPosteParameter) => {
            dispatch({
                type: 'SET_POSTE_FROM_URL',
                value: champPosteParameter
            })
        },
        set_champname_from_url: (champNameParameter) => {
            dispatch({
                type: 'SET_CHAMPNAME_FROM_URL',
                value: champNameParameter
            })
        }
    }
}
export default connect(null, mapDispatchToProps)(Header)