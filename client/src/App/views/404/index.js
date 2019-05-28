import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './404.scss';

import Img404 from '../../assets/img/404.png';

const body_class = "page404";

class Page404 extends Component {

    componentDidMount() {
        document.body.classList.add(body_class);
    }
    componentWillUnmount() {
        document.body.classList.remove(body_class);
    }

    render() {
        return (
            <div className="block-404">
                <div className="img-container">
                    <img src={Img404} alt="404" />
                </div>
                <div className="text-container">
                    <p className="text-giant">404</p>
                    <h2 className="title">Something’s missing</h2>
                    <p className="text">This page is missing or you assembled the link incorrecly.</p>
                    <Link className="link" to="/"><span>Go to website</span></Link>
                </div>
            </div>
        )
    }
}

export default Page404