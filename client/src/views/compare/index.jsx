import React, { Component } from 'react';
import { connect } from 'react-redux';
import GlobalFiltering from '../../helpers/GlobalFiltering';

/** 
  * @desc this class will hold functions for comparator view
  * include handleActive(), getDataRole(), resetBlockLeft(), resetBlockRight(), removeEl(), retrieveChampCaracteristics()
  * @author Medhi Verfaillie
  * @required GlobalFiltering.js
*/

class Compare extends Component {
    state = {
        champions: [],
        slot_left_name: '',
        slot_right_name: '',

        slot_left_icon: '',
        slot_right_icon: '',

        filter: [
            { name: "fighter" },
            { name: "mage" },
            { name: "slayer" },
            { name: "tank" },
            { name: "marksman" },
            { name: "controller" },
            { name: "specialist" }
        ]
    }

    /**
        * @desc change state of each filter to active
        * @param string el - the role associated to each buttun
        * @return array filter - with state updated
    */
    handleActive = el => {
        this.setState(prev => {
            const { filter } = prev;
            const nextEl = filter.map(post => {
                if ((post.name.charAt(0).toUpperCase() + post.name.slice(1)) === el && post.isActive) return { ...post, isActive: true }
                if ((post.name.charAt(0).toUpperCase() + post.name.slice(1)) !== el) return { ...post, isActive: false }
                return {
                    ...post,
                    isActive: !post.isActive
                };
            });
            return { ...prev, filter: nextEl };
        });
    };

    /**
        * @desc filter champions by role
        * @param class event - event on click
    */
    getDataRole = (event) => {
        let role = event.target.getAttribute('datarole')
        let champions = GlobalFiltering.getChampByRole(this.props.data, role)
        this.setState({
            champions: champions
        })
        this.handleActive(role)
    }

    resetBlockLeft = () => {
        let left_win_rate = document.querySelector('.slot-left .win span')
        let left_ban_rate = document.querySelector('.slot-left .ban span')
        let left_pick_rate = document.querySelector('.slot-left .pick span')

        left_win_rate.innerHTML = ''
        left_win_rate.parentNode.style.width = "80%"
        left_win_rate.parentNode.style.background = "linear-gradient(270deg, #0F0F2E 0%, rgba(15, 15, 46, 0) 67.01%)"

        left_ban_rate.innerHTML = ''
        left_ban_rate.parentNode.style.width = "40%"
        left_ban_rate.parentNode.style.background = "linear-gradient(270deg, #0F0F2E 0%, rgba(15, 15, 46, 0) 67.01%)"

        left_pick_rate.innerHTML = ''
        left_pick_rate.parentNode.style.width = "60%"
        left_pick_rate.parentNode.style.background = "linear-gradient(270deg, #0F0F2E 0%, rgba(15, 15, 46, 0) 67.01%)"
    }

    resetBlockRight = () => {
        let right_win_rate = document.querySelector('.slot-right .win span')
        let right_ban_rate = document.querySelector('.slot-right .ban span')
        let right_pick_rate = document.querySelector('.slot-right .pick span')

        right_win_rate.innerHTML = ''
        right_win_rate.parentNode.style.width = "80%"
        right_win_rate.parentNode.style.background = "linear-gradient(90deg, #0F0F2E 0%, rgba(15, 15, 46, 0) 67.01%)"

        right_ban_rate.innerHTML = ''
        right_ban_rate.parentNode.style.width = "40%"
        right_ban_rate.parentNode.style.background = "linear-gradient(90deg, #0F0F2E 0%, rgba(15, 15, 46, 0) 67.01%)"

        right_pick_rate.innerHTML = ''
        right_pick_rate.parentNode.style.width = "60%"
        right_pick_rate.parentNode.style.background = "linear-gradient(90deg, #0F0F2E 0%, rgba(15, 15, 46, 0) 67.01%)"
    }

    removeEl = (sideClicked) => {
        let name_slotLeft = document.querySelector('.slot-left .champ-name')
        let name_slotRight = document.querySelector('.slot-right .champ-name')

        if (sideClicked === "left") {
            name_slotLeft.innerHTML = 'Select a champion'
            this.setState({
                slot_left_name: '',
                slot_left_icon: ''
            })
            this.resetBlockLeft()
        } else if (sideClicked === "right") {
            name_slotRight.innerHTML = 'Select a champion'
            this.setState({
                slot_right_name: '',
                slot_right_icon: ''
            })
            this.resetBlockRight()
        }
    }

    retrieveChampCaracteristics(e) {
        let championName = e.target.getAttribute('id')
        let champCaracteristics = GlobalFiltering.getChampByName(this.props.data, championName)

        let name_slotLeft = document.querySelector('.slot-left .champ-name')
        let name_slotRight = document.querySelector('.slot-right .champ-name')

        let left_win_rate = document.querySelector('.slot-left .win span')
        let left_ban_rate = document.querySelector('.slot-left .ban span')
        let left_pick_rate = document.querySelector('.slot-left .pick span')

        let right_win_rate = document.querySelector('.slot-right .win span')
        let right_ban_rate = document.querySelector('.slot-right .ban span')
        let right_pick_rate = document.querySelector('.slot-right .pick span')

        if (this.state.slot_left_name === champCaracteristics.name) {
            name_slotLeft.innerHTML = 'Select a champion'
            this.setState({
                slot_left_name: '',
                slot_left_icon: ''
            })
            this.resetBlockLeft()
        }

        if (this.state.slot_right_name === champCaracteristics.name) {
            name_slotRight.innerHTML = 'Select a champion'
            this.setState({
                slot_right_name: '',
                slot_right_icon: ''
            })
            this.resetBlockRight()
        }

        if (this.state.slot_left_name === '' && this.state.slot_right_name !== champCaracteristics.name) {
            this.setState({
                slot_left_name: champCaracteristics.name,
                slot_left_icon: champCaracteristics.icon
            })
            name_slotLeft.innerHTML = champCaracteristics.name

            left_win_rate.innerHTML = `${champCaracteristics.win}%`
            left_win_rate.parentNode.style.width = `${champCaracteristics.win}%`
            left_win_rate.parentNode.style.background = "linear-gradient(180deg, #00CBE0 0%, rgba(0, 203, 224, 0.2) 98.08%)"

            left_ban_rate.innerHTML = `${champCaracteristics.ban}%`
            left_ban_rate.parentNode.style.width = `${champCaracteristics.ban}%`
            left_ban_rate.parentNode.style.background = "linear-gradient(180deg, #FC0044 0%, rgba(252, 0, 68, 0.2) 98.08%)"

            left_pick_rate.innerHTML = `${champCaracteristics.pick}%`
            left_pick_rate.parentNode.style.width = `${champCaracteristics.pick}%`
            left_pick_rate.parentNode.style.background = "linear-gradient(180deg, #C79A3C 0%, #A6843C 39.06%, #614B1D 100%)"

        }

        if (this.state.slot_right_name === '' && this.state.slot_left_name !== champCaracteristics.name) {
            if (this.state.slot_left_name !== '' || this.state.slot_right_name !== '') {
                this.setState({
                    slot_right_name: champCaracteristics.name,
                    slot_right_icon: champCaracteristics.icon
                })
                name_slotRight.innerHTML = champCaracteristics.name

                right_win_rate.innerHTML = `${champCaracteristics.win}%`
                right_win_rate.parentNode.style.width = `${champCaracteristics.win}%`
                right_win_rate.parentNode.style.background = "linear-gradient(180deg, #00CBE0 0%, rgba(0, 203, 224, 0.2) 98.08%)"

                right_ban_rate.innerHTML = `${champCaracteristics.ban}%`
                right_ban_rate.parentNode.style.width = `${champCaracteristics.ban}%`
                right_ban_rate.parentNode.style.background = "linear-gradient(180deg, #FC0044 0%, rgba(252, 0, 68, 0.2) 98.08%)"

                right_pick_rate.innerHTML = `${champCaracteristics.pick}%`
                right_pick_rate.parentNode.style.width = `${champCaracteristics.pick}%`
                right_pick_rate.parentNode.style.background = "linear-gradient(180deg, #C79A3C 0%, #A6843C 39.06%, #614B1D 100%)"
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
        const { filter } = this.state;
        return (
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
                                    { /* <img className="champ-role" src="#" alt="icon" /> */}
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
                        {
                            // generate buttons to filter champions by role
                            filter.map((el, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={(event) => this.getDataRole(event)}
                                        className={`btn-role icon icon-${el.name} ${el.isActive ? 'active' : ''}`}
                                        datarole={el.name.charAt(0).toUpperCase() + el.name.slice(1)}>{el.name}
                                    </button>
                                )
                            })
                        }
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