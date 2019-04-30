import React, { Component } from 'react';

export default class Postbubble extends Component {
    render() {
        return (
            <>
                <div className="thumb-post icon icon-top"><p>Top</p></div>
                <div className="thumb-post icon icon-jgl"><p>Jungle</p></div>
                <div className="thumb-post icon icon-mid"><p>Mid</p></div>
                <div className="thumb-post icon icon-bot"><p>Bot</p></div>
                <div className="thumb-post icon icon-supp"><p>Support</p></div>
            </>
        )
    }
}