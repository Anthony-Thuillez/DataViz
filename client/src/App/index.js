import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Intro from './views/intro';
import Landing from './views/landing';
import Fiche from './views/fiche';
import Chart from './views/graph';
import SearchBar from './views/SearchBar';
import Integration from './views/integration';
import Compare from './views/compare'

import './styles/main.scss';

class App extends Component {
    render() {
        return(
            <Router>
                <>
                    <Route path="/Intro" component={Intro} /> {/* root page */}
                    <Route exact path="/" component={Landing} />
                    <Route path="/Fiche" component={Fiche} />
                    <Route path="/Chart" component={Chart} />
                    <Route path="/SearchBar" component={SearchBar} />
                    <Route path="/Integration" component={Integration} />
                    <Route path="/Compare" component={Compare} />

                </>
            </Router>
        )
    }
}

export default App