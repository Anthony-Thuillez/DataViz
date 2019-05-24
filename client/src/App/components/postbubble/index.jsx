import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './postbubble.scss';

export default class Postbubble extends Component {
    render() {
        return (
            <>
                <Link to="./chart" className="btn-post icon icon-top"><p>Top</p></Link>
                <Link to="./chart" className="btn-post icon icon-jgl"><p>Jungle</p></Link>
                <Link to="./chart" className="btn-post icon icon-mid"><p>Mid</p></Link>
                <Link to="./chart" className="btn-post icon icon-bot"><p>Bot</p></Link>
                <Link to="./chart" className="btn-post icon icon-supp"><p>Support</p></Link>
            </>
        )
    }
}