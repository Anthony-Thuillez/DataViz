import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

/**
 * Import @Components
 */
import Home from '../Home/Home';

class App extends Component {
    render() {
        return(
            <div className="App">
                <Router>
                    <Fragment>
                        <Route exact path="/" component={Home}/> {/* root page */}
                    </Fragment>
                </Router>
            </div>
        )
    }
}

export default App