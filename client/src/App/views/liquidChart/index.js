import React from "react"
import LiquidChart from '../../scripts/liquidChart'

class Liquid extends React.Component {
    state = {
        value: 50,
    };

    render() {
        return (
            <div>
                <LiquidChart value={this.state.value} />
            </div>
        );
    }
};

export default Liquid