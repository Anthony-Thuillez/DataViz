import React, { Component } from 'react';
import BarChart from '../../scripts/BarChart';
import { connect } from 'react-redux';

import BackBtn from '../../components/returnBtn';

import './graph.scss';

const body_class = "graph";

class Chart extends Component {
  componentDidMount() {
    document.body.classList.add(body_class);
  }
  
  componentWillUnmount() {
    document.body.classList.remove(body_class);
  }

  state = {
    imgDisplay: "",
    width: 100,
    height: 'auto',
    id: "",
    rates: [
      { name: "win", text:"Win Rate", isActive: true },
      { name: "pick", text: "Pick Rate" },
      { name: "ban", text: "Win Rate" }
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
        <BackBtn />
        <div id="barChart">
          <BarChart />
        </div>
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