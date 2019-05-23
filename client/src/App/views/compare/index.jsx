import React, {Component, Fragment} from 'react'
import SortByRate from '../../scripts/SortByRate'
import data from '../../../data.json'

class Compare extends Component {
    state =  {
        champions: []
    }
    getDataRole = (event) => {
        let role = event.target.getAttribute('datarole')
        let champions = SortByRate.getChampByRole(data, role)
        this.setState({
            champions: champions
        })

    }
    
    retrieveChampCaracteristics(e) {
        let championName = e.target.textContent
        let champCaracteristics = SortByRate.getChampByName(data, championName)

        let name_slotLeft = document.querySelector('.champion-slot-left-name')
        let name_slotRight = document.querySelector('.champion-slot-right-name')

        if (name_slotLeft.innerHTML === '' && name_slotRight.innerHTML === '') {
            name_slotLeft.innerHTML = champCaracteristics.name

        }
    }
        //STEP 1 => Au click, récupérer les infos d'un champion en fonction de son nom (name, img, win, pick, ban) DONE
    //STEP 2 => Au click, positionner le (nom, img) du champion cliqué dans champion-slot-right si champion-slot-right [is empty]
    //STEP 3 => Au click sur un deuxème element, si champion-slot-right [is not empty] ajouter le deuxième élément cliqué dans champion-slot-left
    //SETP 4 => Si les 2 champion-slot [is not empty], grisé toutes les autres champions

    render() {                
        return(
            <Fragment>
                <div className="champion-slot-left">
                    <span className="champion-slot-left-name"></span>
                    <img alt="" src="" className="champion-slot-left-pic" /> 
                </div>
                
                <div className="champion-slot-right">
                    <span className="champion-slot-right-name"></span>
                    <img alt="" src="" className="champion-slot-right-pic" /> 
                </div>
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
                            <div onClick={(e)=>this.retrieveChampCaracteristics(e)} key={index} style={{cursor: 'pointer'}}>{champ.name}</div>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default Compare