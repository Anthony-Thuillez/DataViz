import React, {Component} from 'react';
import { connect } from 'react-redux';
import SortByRate from '../../helpers/SortByRate';

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

    removeEl = (sideClicked) => {
        let name_slotLeft = document.querySelector('.slot-left .champ-name')
        let name_slotRight = document.querySelector('.slot-right .champ-name')
        
        let left_win_rate = document.querySelector('.slot-left .win span')
        let right_win_rate = document.querySelector('.slot-right .win span')

        let left_ban_rate = document.querySelector('.slot-left .ban span')
        let right_ban_rate = document.querySelector('.slot-right .ban span')

        let left_pick_rate = document.querySelector('.slot-left .pick span')
        let right_pick_rate = document.querySelector('.slot-right .pick span')

        if (sideClicked === "left") {
            name_slotLeft.innerHTML = 'Select a champion'
            this.setState({
                slot_left_name: '',
                slot_left_icon: ''
            })
            left_win_rate.innerHTML = ''
            left_ban_rate.innerHTML = ''
            left_pick_rate.innerHTML = ''
        } else if (sideClicked === "right") {
            name_slotRight.innerHTML = 'Select a champion'
            this.setState({
                slot_right_name: '',
                slot_right_icon: ''
            })
            right_win_rate.innerHTML = ''
            right_ban_rate.innerHTML = ''
            right_pick_rate.innerHTML = ''
        } 
    }

    retrieveChampCaracteristics(e) {
        let championName = e.target.getAttribute('id')
        let champCaracteristics = SortByRate.getChampByName(this.props.data, championName)

        let name_slotLeft = document.querySelector('.slot-left .champ-name')
        let name_slotRight = document.querySelector('.slot-right .champ-name')

        let left_win_rate = document.querySelector('.slot-left .win span')
        let right_win_rate = document.querySelector('.slot-right .win span')

        let left_ban_rate = document.querySelector('.slot-left .ban span')
        let right_ban_rate = document.querySelector('.slot-right .ban span')

        let left_pick_rate = document.querySelector('.slot-left .pick span')
        let right_pick_rate = document.querySelector('.slot-right .pick span')

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
        let btnChampList = document.querySelectorAll('.champSelection-container .bubble-champ')

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
            <div className="page-compare">

                <div className="champSelected-container">
                    <div className="slot-left">
                        <div className="champ">
                            <div className="champ-desc">
                                <div>
                                    { /* <img className="champ-role" src="#" alt="icon" /> */}
                                    <h3 className="champ-name">Select a champion</h3>
                                </div>
                                <p className="champ-quotation"></p>
                            </div>
                            <div className="bubble-champ big img" style={{ backgroundImage: `url(${this.state.slot_left_icon})` }}></div>
                            <div onClick={() => this.removeEl("left")} className="icon icon-cross"></div>
                        </div>
                        <div className="rate-container">
                            <div className="win rate"><span></span></div>
                            <div className="ban rate"><span></span></div>
                            <div className="pick rate"><span></span></div>
                        </div>
                    </div>

                    <div className="slot-right">
                        <div className="champ">
                            <div className="champ-desc">
                                <div>
                                    { /* <img className="champ-role" src="#" alt="icon" /> */ }
                                    <h3 className="champ-name">Select a champion</h3>
                                </div>
                                <p className="champ-quotation"></p>
                            </div>
                            <div className="bubble-champ big img" style={{ backgroundImage: `url(${this.state.slot_right_icon})` }}></div>
                            <div onClick={() => this.removeEl("right")} className="icon icon-cross"></div>
                        </div>
                        <div className="rate-container">
                            <div className="win rate"><span></span></div>
                            <div className="ban rate"><span></span></div>
                            <div className="pick rate"><span></span></div>
                        </div>
                    </div>
                </div>

                <div className="champSelection-container">
                    <div className="btnList">
                        <button onClick={(event)=>this.getDataRole(event)} className="btn-role icon icon-fighter" datarole="Fighter">combattant</button>
                        <button onClick={(event)=>this.getDataRole(event)} className="btn-role icon icon-mage" datarole="Mage">mage</button>
                        <button onClick={(event)=>this.getDataRole(event)} className="btn-role icon icon-slayer" datarole="Slayer">assassin</button>
                        <button onClick={(event)=>this.getDataRole(event)} className="btn-role icon icon-tank" datarole="Tank">tank</button>
                        <button onClick={(event)=>this.getDataRole(event)} className="btn-role icon icon-marksman" datarole="Marksman">tireur</button>
                        <button onClick={(event)=>this.getDataRole(event)} className="btn-role icon icon-support" datarole="Controller">support</button>
                        <button onClick={(event)=>this.getDataRole(event)} className="btn-role icon icon-specialist" datarole="Specialist">specialist</button>
                    </div>

                    <div className="champList">
                        {
                            this.state.champions.map((champ, index) => {
                                return <div key={index} onClick={(e) => this.retrieveChampCaracteristics(e)} id={champ.name} className="bubble-champ large" style={{ backgroundImage: `url(${champ.icon})` }}></div>
                            })
                        }
                    </div>
                </div>

            </div>
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