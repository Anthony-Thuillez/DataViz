import React, { Component, Fragment } from 'react'
import SortByRate from '../Graph/SortByRate'
import data from '../../data.json'

class Median extends Component {

    componentDidMount() {
        SortByRate.medianRate(data, "pick", "top")
    }
    render() {
        return(
            <Fragment>
            {/* <div>PickRate median : {SortByRate.medianRate(data, "pick", "mid")}%</div>
            <div>WinRate median : {SortByRate.medianRate(data, "win", "mid")}%</div>
            <div>BanRate median : {SortByRate.medianRate(data, "ban", "mid")}%</div> */}
            </Fragment>
        )
    }
}

export default Median