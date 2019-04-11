import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import './style.scss';

const Home = () =>
    <div>
        <h1>Home</h1>
    </div>

class App extends Component {
    render() {
        return(
            <Router>
                <Fragment>
                    <Route exact path="/" component={Home}/> {/* root page */}
                </Fragment>
            </Router>
        )
    }
}

export default App