import React, { Component } from 'react';
import BarChart from '../../scripts/BarChart';
import { connect } from 'react-redux';

import './graph.scss';

class Chart extends Component {

  state = {
    imgDisplay: "",
    width: 100,
    height: 'auto',
    id: "",
    rates: [
      { name: "win", text:"Win Rate", isActive: true },
      { name: "pick", text: "Pick Rate" },
      { name: "ban", text: "Ban Rate" }
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

  onClick = (rate) => (event) => {
    let selectedRate = rate.name;
    this.props.set_rate(selectedRate);
    this.handleIsActive(rate.name);
  }
  
  render() {
    const { rates } = this.state;
    return (
      <>
        <div className="group-btn">
          {
            rates.map((rate, index) => {
              return (
                <div
                  key={index}
                  className={`btn ${rate.isActive ? 'active' : ''}`}
                  onClick={this.onClick(rate)}
                  rate={rate.name}
                >
                  <span>{rate.text}</span>
                </div>
              )
            })
          }
        </div>
        <BarChart/>
      </>
    );
  }
}

/**
 * Used to update the initstate values on redux
 */
const mapDispatchToProps = (dispatch) => {
    return {
        set_rate: (selectedRate) => { dispatch({type: 'SET_RATE', value: selectedRate}) },
    }
}

export default connect(null, mapDispatchToProps)(Chart);