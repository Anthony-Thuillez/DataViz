import React, { Component } from 'react'
import SortByRate from './SortByRate'
import data from '../../data.json'
class Graph extends Component { 
    componentDidMount() {
        SortByRate.getAllChampions(data)
        SortByRate.getPickRateAllChampions(data)
        SortByRate.orderByPickRate(data)
        SortByRate.medianPickRate(data)

        SortByRate.getWinRateAllChampions(data)
        SortByRate.orderByWinRate(data)
        SortByRate.medianWinRate(data)

        SortByRate.getBanRateAllChampions(data)
        SortByRate.orderByBanRate(data)
        SortByRate.medianBanRate(data)
    }
    render() {
        return(
            <div></div>
        )
    }
}

export default Graph