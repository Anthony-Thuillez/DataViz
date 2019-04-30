import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Chart from '../barChart/Chart'

import Integration from './views/integration'
import Median from './Median'

import './styles/main.scss';

class App extends Component {
    render() {
        return(
            <Router>
                <>
                    <Route exact path="/" /> {/* root page */}
                    <Route path="/Integration" component={Integration} />
                    <Route path="/Median" component={Median} />
                    <Route path="/Chart" component={Chart} />
                </>
            </Router>
        )
    }
}

export default App