import React, { Component } from 'react';
import BarChart from '../../scripts/BarChart';
import { connect } from 'react-redux';

class Chart extends Component {

  state = {
    imgDisplay: "",
    width: 100,
    height: 'auto',
    id: ""
  }
  getBtnsValue = (event) => {
    let selectedRate = event.target.getAttribute('rate')
    this.props.set_rate(selectedRate)
  }
  
  render() {
    return (
      <div>
        <div className="rate-selection">
          <button onClick={(event)=>this.getBtnsValue(event)} rate="win" type="button">Win rate</button>
          <button onClick={(event)=>this.getBtnsValue(event)} rate="pick" type="button">Pick rate</button>
          <button onClick={(event)=>this.getBtnsValue(event)} rate="ban" type="button">Ban rate</button>
        </div>
        <BarChart/>
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

export default connect(null, mapDispatchToProps)(Chart);