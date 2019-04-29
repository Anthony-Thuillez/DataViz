import React, { Component, Fragment } from 'react'
import SortByRate from '../Graph/SortByRate'
import data from '../../data.json'

class Median extends Component {

    componentDidMount() {
        SortByRate.getSelectedRate(data, "pick")
    }
    render() {
        return(
            <Fragment>
            <div>PickRate median : {SortByRate.medianPickRate(data)}%</div>
            <div>WinRate median : {SortByRate.medianWinRate(data)}%</div>
            <div>BanRate median : {SortByRate.medianBanRate(data)}%</div>
            </Fragment>
        )
    }
}

export default Median