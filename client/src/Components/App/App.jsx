import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return(
            <div className="App">
                <Router>
                    <Fragment>
                        <Route exact path="/" component={bar}/> {/* root page */}
                        <Route path="/foo" component={bar}/>
                    </Fragment>
                </Router>
            </div>
        )
    }
}

export default App