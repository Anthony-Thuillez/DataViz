import React, { Component } from 'react';
import { connect } from 'react-redux';
import BubbleChart from './landingContainer';
import ImgLeft from '../../assets/img/HP-left.png';
import ImgRight from '../../assets/img/HP-right.png';
import LogoAnime from '../logo/index'

class Landing extends Component {
    state = {
        showBuble: JSON.parse(localStorage.getItem('showBuble'))
    }
    
    handleClick = () => {
        window.localStorage.setItem("showBuble", "true")
        this.setState({
            showBuble: true
        })
    }

    render() {

        if (!this.state.showBuble) {
            return (
                <div style={{ zIndex: 55, position: "fixed", width: "100%", left: "0" }} className="page-intro">
                    <div className="img-intro-left">
                        <img src={ImgLeft} alt="Shaco" />
                    </div>
                    <div className="block-intro">
                        <p>Hetic students are proud to present</p>
                        <div className="logo">
                            <LogoAnime backgroundSize={"1000px 200px"} fontSize={70} subTitle={true} />
                        </div>
                        <p>A tool with which you can discover data on all League of Legend champions.</p>
                        <div onClick={this.handleClick} className="btn" to='/'>Launch data visualization</div>
                    </div>
                    <div className="img-intro-right">
                        <img src={ImgRight} alt="Riven" />
                    </div>
                </div>
            )
        }
        return (
            <div className="page-landing">
                <BubbleChart />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_champ: (champ_name) => {
            dispatch({
                type: 'SET_CHAMP',
                value: champ_name
            })
        },
        set_poste: (selectedPoste) => {
            dispatch({
                type: 'SET_POSTE',
                value: selectedPoste
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing)

