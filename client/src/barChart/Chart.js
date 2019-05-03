import React, { Component } from 'react';
import BarChart from './BarChart'

class Chart extends Component {
  
    state = {
      data: [2, 5, 6, 6, 9, 10, 40, 33, 22, 11, 44],
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