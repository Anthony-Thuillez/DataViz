import React, { Component, Fragment } from 'react'
import SortByRate from '../Graph/SortByRate'
import data from '../../data.json'

class Median extends Component {

    componentDidMount() {
        SortByRate.getChampByPost(data, "pick")
        SortByRate.medianRate(data, "pick")
    }
    render() {
        return(
            <Fragment>
            <div>PickRate median : {SortByRate.medianRate(data, "pick")}%</div>
            <div>WinRate median : {SortByRate.medianRate(data, "win")}%</div>
            <div>BanRate median : {SortByRate.medianRate(data, "ban")}%</div>
            </Fragment>
        )
    }
}

export default Median