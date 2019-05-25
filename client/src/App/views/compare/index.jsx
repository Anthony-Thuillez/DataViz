import React, {Component, Fragment} from 'react'
import SortByRate from '../../scripts/SortByRate'
import { connect } from 'react-redux';

class Compare extends Component {
    state =  {
        champions: [],
        slot_left_name: '',
        slot_right_name: '',

        slot_left_icon: '',
        slot_right_icon: ''
    }
    getDataRole = (event) => {
        let role = event.target.getAttribute('datarole')        
        let champions = SortByRate.getChampByRole(this.props.data, role)
        console.log("func", SortByRate.getChampByRole(this.props.data, role));
        
        this.setState({
            champions: champions
        })        
    }
    
    retrieveChampCaracteristics(e) {
        let championName = e.target.getAttribute('id')
        let champCaracteristics = SortByRate.getChampByName(this.props.data, championName)

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
                slot_left_icon: ''
            })
            left_win_rate.innerHTML = ''
            left_ban_rate.innerHTML = ''
            left_pick_rate.innerHTML = ''
        }
        if (this.state.slot_right_name === champCaracteristics.name) {
            name_slotRight.innerHTML = 'Select a champion'
            this.setState({
                slot_right_name: '',
                slot_right_icon: ''
            })
            right_win_rate.innerHTML = ''
            right_ban_rate.innerHTML = ''
            right_pick_rate.innerHTML = ''
        }
        
        if (this.state.slot_left_name === '' && this.state.slot_right_name !== champCaracteristics.name) {
            this.setState({
                slot_left_name: champCaracteristics.name,
                slot_left_icon: champCaracteristics.icon
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
                    slot_right_icon: champCaracteristics.icon
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

    render() {
        return(
            <Fragment>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className="champion-slot-left" style={{background: 'indianred', display: 'flex'}}>
                        <span className="champion-slot-left-name" style={{margin: 'auto 10px'}}>Select a champion</span>
                        <div className="btn-champ champion-slot-left-pic" style={{ backgroundImage: `url(${this.state.slot_left_icon})` }}></div>
                    </div>
                    
                    <div className="champion-slot-right" style={{background: 'indianred', display: 'flex', flexDirection: 'row-reverse'}}>
                        <span className="champion-slot-right-name" style={{margin: 'auto 10px'}}>Select a champion</span>
                        <div className="btn-champ champion-slot-right-pic" style={{ backgroundImage: `url(${this.state.slot_right_icon})` }}></div>

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
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="Fighter" type="button">combattant</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="Mage" type="button">mage</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="Slayer" type="button">assassin</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="Tank" type="button">tank</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="Marksman" type="button">tireur</button>
                    <button onClick={(event)=>this.getDataRole(event)} className="btn" datarole="Controller" type="button">support</button>
                </div>
                <div className="champList-container" style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.state.champions.map((champ, index) => {
                            return (
                                <div key={index}>
                                    <img onClick={(e)=>this.retrieveChampCaracteristics(e)} style={{cursor: 'pointer'}} className="btn-champ btn-champ-list" id={champ.name} alt="champ" src={champ.icon}></img>
                                </div>
                                
                            )
                        })
                    }
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.data,
        selectedRate: state.selectedRate
    }
}
export default connect(mapStateToProps, null)(Compare);