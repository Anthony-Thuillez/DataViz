import React, { Component } from 'react';

export default class Button extends Component {
    state = {
        rates: [
            { name: "Win rate", isActive: true },
            { name: "Pick rate" },
            { name: "Ban rate" },
        ]
    };

    handleIsActive = id => {
        this.setState(prev => {
            const { rates } = prev;
            const nextRate = rates.map(rate => {
                if (rate.name !== id) return { ...rate, isActive: false };
                return {
                    ...rate,
                    isActive: !rate.isActive
                };
            });
            return { ...prev, rates: nextRate };
        });
    };
    render() {
        const { rates } = this.state;
        
        return (
            <div className="group-btn">
                {
                    rates.map((rate, index) => {
                        return (
                            <div
                                key={index}
                                className={`btn ${rate.isActive ? 'active' : ''}`}
                                onClick={() => this.handleIsActive(rate.name)}
                            >
                                {rate.name}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}