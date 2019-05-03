import React, { Component } from 'react';
import BarChart from '../../scripts/BarChart';

class Chart extends Component {

  state = {
    imgDisplay: "",
    width: 100,
    height: 'auto',
    id: ""
  }

  render() {

    return (
      <div>
        <BarChart/>
      </div>
    );
  }
}

export default Chart;