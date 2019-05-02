import React, { Component } from 'react';

import './colors.scss';

class Colors extends Component {
    render() {
        return (
            <>
                <div className="block darkblue"></div>
                <div className="block blue"></div>
                <div className="block gold"></div>
                <div className="block blue-gradient"></div>
                <div className="block gold-gradient"></div>
                <div className="block red-gradient"></div>
            </>
        )
    }
}

export default Colors