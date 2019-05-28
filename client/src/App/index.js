import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Api from '../api'
import Layout from './views/layout';

import Intro from './views/intro';
import Landing from './views/landing';
import Fiche from './views/fiche';
import Chart from './views/graph';
import Integration from './views/integration';
import Compare from './views/compare'
import LiquidChart from './views/liquidChart';
import Page404 from './views/404';

import './styles/main.scss';

class App extends Component {
    render() {
        return(
            <>
                <Api />
                <Router>
                    <Switch>
                        <Route path="/Intro" component={Intro} /> {/* root page */}
                        <Route path="/404" component={Page404} />
                        <Layout>
                            <Route exact path="/" component={Landing} />
                            <Route path="/Compare" component={Compare} />
                            <Route path="/Chart" component={Chart} />
                            <Route path="/Fiche" component={Fiche} />
                            <Route path="/LiquidChart" component={LiquidChart} />
                            <Route path="/Integration" component={Integration} />
                        </Layout>
                    </Switch>
                </Router>
            </>
        )
    }
}

export default App