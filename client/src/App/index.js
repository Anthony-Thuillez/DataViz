import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Intro from './views/intro';
import Landing from './views/landing';
import Fiche from './views/fiche';
import ChartStats from './components/ChartStats/ChartStats';
import Chart from './views/graph/Chart';
import SearchBar from './views/SearchBar/SearchBar';
import Integration from './views/integration';

import './styles/main.scss';

class App extends Component {
    render() {
        return(
            <Router>
                <>
                    <Route exact path="/" component={Intro} /> {/* root page */}
                    <Route path="/Landing" component={Landing} />
                    <Route path="/Fiche" component={Fiche} />
                    <Route path="/ChartStats" component={ChartStats} />
                    <Route path="/Chart" component={Chart} />
                    <Route path="/SearchBar" component={SearchBar} />
                    <Route path="/Integration" component={Integration} />
                </>
            </Router>
        )
    }
}

export default App