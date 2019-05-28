import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './postbubble.scss';

class Postbubble extends Component {
    getPoste(selectedPoste) {
        this.props.set_poste(selectedPoste);
    }
    render() {
        return (
            <>
                <Link to="./chart" onMouseEnter={()=>this.getPoste("Top")} className="btn-post icon icon-top"><p>Top</p></Link>
                <Link to="./chart" onMouseEnter={()=>this.getPoste("Jungle")} className="btn-post icon icon-jgl"><p>Jungle</p></Link>
                <Link to="./chart" onMouseEnter={()=>this.getPoste("Middle")} className="btn-post icon icon-mid"><p>Mid</p></Link>
                <Link to="./chart" onMouseEnter={()=>this.getPoste("Bottom")} className="btn-post icon icon-bot"><p>Bot</p></Link>
                <Link to="./chart" onMouseEnter={()=>this.getPoste("Support")} className="btn-post icon icon-supp"><p>Support</p></Link>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_poste: (selectedPoste) => {
            dispatch({
                type: 'SET_POSTE',
                value: selectedPoste
            })
        },
    }
}

export default connect(null, mapDispatchToProps)(Postbubble);