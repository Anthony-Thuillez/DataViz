import React, { Component } from 'react';
import { connect } from 'react-redux';
import BubbleChart from './landingContainer';

class Landing extends Component {

    render() {
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