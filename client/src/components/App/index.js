import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Api from '../../helpers/api'

import Layout from '../../views/layout';
import Landing from '../../views/landing';
import Compare from '../../views/compare';
import Graph from '../../views/graph';
import Fiche from '../../views/fiche';
import Page404 from '../../views/404';
import Integration from '../../views/integration';

import '../../styles/main.scss';

const App = () => (
    <>
        <Api />
        <Router>
            <Switch>
                <Route path="/404" component={Page404} />
                <Layout>
                    <Route exact path="/" component={Landing} />
                    <Route path="/Compare" component={Compare} />
                    <Route path="/Graph:poste" component={Graph} />
                    <Route path="/Fiche:champ" component={Fiche} />
                    <Route path="/Integration" component={Integration} />
                </Layout>
            </Switch>
        </Router>
    </>
)

export default App