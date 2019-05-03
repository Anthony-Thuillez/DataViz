import React, { Component } from 'react';
import BarChart from '../../scripts/BarChart2'
import SortByRate from '../../scripts/SortByRate'

import data from '../../../data.json'

class Chart extends Component {

  state = {
    data: [12, 5, 6, 6, 9, 10, 33, 12, 5, 6, 6, 9, 10, 33, 12, 5, 6, 6, 9, 10, 33, 12, 5, 6, 6, 9, 10, 33],
    imgDisplay: "",
    width: 100,
    height: 'auto',
    id: ""
  }

  render() {
    let median = SortByRate.medianRate(data, "ban", "top")

    return (
      <div>
        <BarChart/>
      </div>
    );
  }
}

export default Chart;