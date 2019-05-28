import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './champbubble.scss';

import champImg1 from '../../assets/img/Gnar.png';
import champImg2 from '../../assets/img/Nidalee.png';
import champImg3 from '../../assets/img/Fizz.png';
import champImg4 from '../../assets/img/Twitch.png';
import champImg5 from '../../assets/img/Lulu.png';

class Champbubble extends Component {
    getName(selectedChamp) {
        this.props.set_name(selectedChamp);
    }
    render() {
        return (
            <>
                <Link to="./fiche" onMouseEnter={()=>this.getName("Gnar")} className="btn-champ" style={{ backgroundImage: `url(${champImg1})` }} />
                <Link to="./fiche" onMouseEnter={()=>this.getName("Nidalee")} className="btn-champ" style={{ backgroundImage: `url(${champImg2})` }} />
                <Link to="./fiche" onMouseEnter={()=>this.getName("Fizz")} className="btn-champ" style={{ backgroundImage: `url(${champImg3})` }} />
                <Link to="./fiche" onMouseEnter={()=>this.getName("Twitch")} className="btn-champ" style={{ backgroundImage: `url(${champImg4})` }} />
                <Link to="./fiche" onMouseEnter={()=>this.getName("Lulu")} className="btn-champ" style={{ backgroundImage: `url(${champImg5})` }} />
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        set_name: (selectedChamp) => {
            dispatch({
                type: 'SET_NAME',
                value: selectedChamp
            })
        },
    }
}

export default connect(null, mapDispatchToProps)(Champbubble);