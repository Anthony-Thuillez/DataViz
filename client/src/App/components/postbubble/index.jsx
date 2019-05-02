import React, { Component } from 'react';

import './postbubble.scss';

export default class Postbubble extends Component {
    render() {
        return (
            <>
                <div className="btn-post icon icon-top"><p>Top</p></div>
                <div className="btn-post icon icon-jgl"><p>Jungle</p></div>
                <div className="btn-post icon icon-mid"><p>Mid</p></div>
                <div className="btn-post icon icon-bot"><p>Bot</p></div>
                <div className="btn-post icon icon-supp"><p>Support</p></div>
            </>
        )
    }
}