import React, { Component } from 'react';
import BarChart from '../../scripts/BarChart'
import SortByRate from '../../scripts/SortByRate'

import data from '../../../data.json'

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