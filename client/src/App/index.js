import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Intro from './views/intro';
import Landing from './views/landing';
import Chart from './views/graph/Chart';
import Fiche from './views/fiche';
import Median from './Median';
import Integration from './views/integration';

import './styles/main.scss';

class App extends Component {
    render() {
        return(
            <Router>
                <>
                    <Route exact path="/" component={Intro} /> {/* root page */}
                    <Route path="/Landing" component={Landing} />
                    <Route path="/Chart" component={Chart} />
                    <Route path="/Fiche" component={Fiche} />
                    <Route path="/Median" component={Median} />
                    <Route path="/Integration" component={Integration} />
                </>
            </Router>
        )
    }
}

export default App