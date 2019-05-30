import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarChart from './graphContainer';

import BtnBack from '../../components/BtnBack';

class Graph extends Component {

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
  }

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
  }

  onClick = (rate) => (event) => {
    let selectedRate = rate.name;
    this.props.set_rate(selectedRate);
    this.handleIsActive(rate.name);
  }
  
  render() {
    const { rates } = this.state;
    return (
      <div className="page-graph">
        <BtnBack />
        <div id="barChart">
          <BarChart />
        </div>
        <div className="filter">
          {
            rates.map((rate, index) => {
              return (
                <div
                  key={index}
                  className={`btn-filter ${rate.isActive ? 'active' : ''}`}
                  onClick={this.onClick(rate)}
                  rate={rate.name}
                >
                  <span>{rate.text}</span>
                </div>
              )
            })
          }
        </div>
      </div>
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

export default connect(null, mapDispatchToProps)(Graph);