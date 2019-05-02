import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Integration from './views/integration'
import ChartStats from './components/ChartStats/ChartStats'
import Chart from './views/graph/Chart'
import SearchBar from './views/SearchBar/SearchBar'

import './styles/main.scss';

class App extends Component {
    render() {
        return(
            <Router>
                <>
                    <Route exact path="/" /> {/* root page */}
                    <Route path="/Integration" component={Integration} />
                    <Route path="/ChartStats" component={ChartStats} />
                    <Route path="/Chart" component={Chart} />
                    <Route path="/SearchBar" component={SearchBar} />
                </>
            </Router>
        )
    }
}

export default App