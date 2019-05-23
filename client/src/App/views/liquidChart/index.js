import React from "react"
import LiquidChart from '../../scripts/liquidChart'

class Liquid extends React.Component {
    state = {
        value: 50,
    };

    render() {
        return (
            <div>
                <LiquidChart value="50" />
            </div>
        );
    }
};

export default Liquid