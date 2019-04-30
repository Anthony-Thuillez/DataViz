import React, { Component } from 'react';
import BarChart from '../../scripts/BarChart'

class Chart extends Component {
  
    state = {
      data: [12, 5, 6, 6, 9, 10],
      width: 100,
      height: 752,
      id: ""
    }
  
    render() {
      return (
        <div>
          <BarChart data={this.state.data} />
        </div>
      );
    }
  }

export default Chart;