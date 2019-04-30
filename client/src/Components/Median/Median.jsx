import React, { Component, Fragment } from 'react'
import SortByRate from '../Graph/SortByRate'
import data from '../../data.json'

class Median extends Component {

    findFirstValOfArray = () => {
        let arr = SortByRate.orderByRate(data, "ban", "top")
        for (let i = 0; i < arr.length; i++) {
            let firstEl = arr[0]
            return firstEl
        }
    }

    findLastValOfArray = () => {
        let arr = SortByRate.orderByRate(data, "ban", "top")
        for (let i = 0; i < arr.length; i++) {
            const lastEl = arr[arr.length - 1]
            return lastEl
        }
    }
    render() { 
        let median = SortByRate.medianRate(data, "ban", "top")
        let champion = SortByRate.getChampByPost(data, "top")
               
        return(
            <Fragment>
            <div className="graph-container" style={{ width: '92%', height: '752px', margin: 'auto'}}>
            <div className="graph-content" style={{ width: '100%', height: '678px', borderLeft: '3px solid #C79A3C', borderBottom: '3px solid #C79A3C'}}>
                <div className="graph-max-rate" style={{marginBottom: '50px', height: '3px', width: '100%', background: '#C79A3C'}}>
                    <span className="graph-max-rate-value">{this.findFirstValOfArray()}</span>
                </div>

                <div className="graph-median-rate" style={{marginBottom: '50px', height: '3px', width: '100%', background: '#C79A3C'}}>
                    <span className="graph-median-rate-value">{median}</span>
                </div>

                <div className="graph-lower-rate" style={{marginBottom: '50px', height: '3px', width: '100%', background: '#C79A3C'}}>
                    <span className="graph-lower-rate-value">{this.findLastValOfArray()}</span>
                </div>
            </div>
            <div className="champList" style={{display: 'flex', justifyContent: 'space-around'}}>
                {
                    champion.map((champ) => {
                        return(
                            <div className="champion" style={{margin: '5px'}}>{champ.name}</div>
                        )
                    })
                }
            </div>
            </div>
            {/* <div>PickRate median : {SortByRate.medianRate(data, "pick", "mid")}%</div>
            <div>WinRate median : {SortByRate.medianRate(data, "win", "mid")}%</div>
            <div>BanRate median : {SortByRate.medianRate(data, "ban", "mid")}%</div> */}
            </Fragment>
        )
    }
}

export default Median