import React, { Component, Fragment } from 'react';
import Json from '../../data.json'
import Filter from './Filter'

class postChamp extends Component {
   
    componentDidMount() {
        console.log(Filter.PostChamp(Json))
    }
    render() {

        return (
            <div>
                
            </div>
        )
    }
}

export default postChamp
