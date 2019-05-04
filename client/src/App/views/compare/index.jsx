import React, {Component, Fragment} from 'react'
import SortByRate from '../../scripts/SortByRate'
import data from '../../../data.json'

class Compare extends Component {
    state =  {
        champions: []
    }
    getDataRole = (event) => {
        let role = event.target.getAttribute('datarole')
        this.setState({
            champions: SortByRate.getChampByRole(data, role)
        })

    }
    
    render() {        
        return(
            <Fragment>
                <div className="role-selection">
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="combattant" type="button">combattant</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="mage" type="button">mage</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="assassin" type="button">assassin</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="tank" type="button">tank</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="tireur" type="button">tireur</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="support" type="button">support</button>
                </div>
                {
                    this.state.champions.map((champ, index) => {
                        return (
                            <div key={index} >{champ.name}</div>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default Compare