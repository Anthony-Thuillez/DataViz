import React, {Component, Fragment} from 'react'
import SortByRate from '../../scripts/SortByRate'
import data from '../../../data.json'

/* Used for testing */
import '../../components/champbubble/champbubble.scss';

class Compare extends Component {
    state =  {
        champions: [],
        slot_left_name: '',
        slot_right_name: '',

        slot_left_img: '',
        slot_right_img: ''
    }
    getDataRole = (event) => {
        let role = event.target.getAttribute('datarole')
        let champions = SortByRate.getChampByRole(data, role)
        this.setState({
            champions: champions
        })        
    }
    
    retrieveChampCaracteristics(e) {
        let championName = e.target.getAttribute('id')
        let champCaracteristics = SortByRate.getChampByName(data, championName)

        let name_slotLeft = document.querySelector('.champion-slot-left-name')
        let name_slotRight = document.querySelector('.champion-slot-right-name')

        let left_win_rate = document.querySelector('.stats-winrate-left')
        let right_win_rate = document.querySelector('.stats-winrate-right')

        let left_ban_rate = document.querySelector('.stats-banrate-left')
        let right_ban_rate = document.querySelector('.stats-banrate-right')

        let left_pick_rate = document.querySelector('.stats-pickrate-left')
        let right_pick_rate = document.querySelector('.stats-pickrate-right')

        if (this.state.slot_left_name === champCaracteristics.name) {
            name_slotLeft.innerHTML = 'Select a champion'
            this.setState({
                slot_left_name: '',
                slot_left_img: ''
            })
            left_win_rate.innerHTML = ''
            left_ban_rate.innerHTML = ''
            left_pick_rate.innerHTML = ''
        }
        if (this.state.slot_right_name === champCaracteristics.name) {
            name_slotRight.innerHTML = 'Select a champion'
            this.setState({
                slot_right_name: '',
                slot_right_img: ''
            })
            right_win_rate.innerHTML = ''
            right_ban_rate.innerHTML = ''
            right_pick_rate.innerHTML = ''
        }
        
        if (this.state.slot_left_name === '' && this.state.slot_right_name !== champCaracteristics.name) {
            this.setState({
                slot_left_name: champCaracteristics.name,
                slot_left_img: champCaracteristics.img
            })
            name_slotLeft.innerHTML = champCaracteristics.name
            left_win_rate.innerHTML = `${champCaracteristics.win}%`
            left_ban_rate.innerHTML = `${champCaracteristics.ban}%`
            left_pick_rate.innerHTML = `${champCaracteristics.pick}%`
        }  
        if (this.state.slot_right_name === '' && this.state.slot_left_name !== champCaracteristics.name) {
            if (this.state.slot_left_name !== '' || this.state.slot_right_name !== '') {
                this.setState({
                    slot_right_name: champCaracteristics.name,
                    slot_right_img: champCaracteristics.img
                })
                name_slotRight.innerHTML = champCaracteristics.name
                right_win_rate.innerHTML = `${champCaracteristics.win}%`
                right_ban_rate.innerHTML = `${champCaracteristics.ban}%`
                right_pick_rate.innerHTML = `${champCaracteristics.pick}%`
            }
        }

    }
    componentDidUpdate() {
        let btnChampList = document.querySelectorAll('.btn-champ-list')

        for (let i = 0; i < btnChampList.length; i++) {
            
            if (this.state.slot_left_name !== '' && this.state.slot_right_name !== '') {
                btnChampList[i].style.opacity = '0.4'
            }
            if (this.state.slot_left_name !== '' && this.state.slot_left_name === btnChampList[i].id) {
                let leftName = btnChampList[i]
                leftName.style.opacity = '1'
            }
            if (this.state.slot_right_name !== '' && this.state.slot_right_name === btnChampList[i].id) {
                let rightName = btnChampList[i]
                rightName.style.opacity = '1'
            }
            if (this.state.slot_left_name === '' || this.state.slot_right_name === '') {
                btnChampList[i].style.opacity = '1'
            }
        }
    }

    //DONE => Au click, récupérer les infos d'un champion en fonction de son nom (name, img, win, pick, ban) 
    //DONE => Au click, positionner le (nom, img) du champion cliqué dans champion-slot-right si champion-slot-right [is empty]
    //DONE => Au click sur un deuxème element, si champion-slot-right [is not empty] ajouter le deuxième élément cliqué dans champion-slot-left
    //SETP 4 => Si les 2 champion-slot [is not empty], grisé toutes les autres champions

    render() {  
          
        return(
            <Fragment>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className="champion-slot-left" style={{background: 'indianred', display: 'flex'}}>
                        <span className="champion-slot-left-name" style={{margin: 'auto 10px'}}>Select a champion</span>
                        <div className="btn-champ champion-slot-left-pic" style={{ backgroundImage: `url(${this.state.slot_left_img})` }}></div>
                    </div>
                    
                    <div className="champion-slot-right" style={{background: 'indianred', display: 'flex', flexDirection: 'row-reverse'}}>
                        <span className="champion-slot-right-name" style={{margin: 'auto 10px'}}>Select a champion</span>
                        <div className="btn-champ champion-slot-right-pic" style={{ backgroundImage: `url(${this.state.slot_right_img})` }}></div>

                    </div>
                </div>
                <div className="rate-container">
                    <div className="winrate-container" style={{display: 'flex'}}>
                        <div className="stats-winrate-left"></div>
                        <span>Win rate</span>
                        <div className="stats-winrate-right"></div>
                    </div>
                    <div className="banrate-container" style={{display: 'flex'}}>
                        <div className="stats-banrate-left"></div>
                        <span>Ban rate</span>
                        <div className="stats-banrate-right"></div>
                    </div>
                    <div className="pickrate-container" style={{display: 'flex'}}>
                        <div className="stats-pickrate-left"></div>
                        <span>Pick rate</span>
                        <div className="stats-pickrate-right"></div>
                    </div>
                </div>

                <div className="role-selection" style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="combattant" type="button">combattant</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="mage" type="button">mage</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="assassin" type="button">assassin</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="tank" type="button">tank</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="tireur" type="button">tireur</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="support" type="button">support</button>
                </div>
                <div className="champList-container" style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.state.champions.map((champ, index) => {
                            return (
                                <div key={index}>
                                    <img onClick={(e)=>this.retrieveChampCaracteristics(e)} style={{cursor: 'pointer'}} className="btn-champ btn-champ-list" id={champ.name} alt="champ" src={champ.img}></img>
                                {champ.name}
                                </div>
                                
                            )
                        })
                    }
                </div>
            </Fragment>
        )
    }
}

export default Compare