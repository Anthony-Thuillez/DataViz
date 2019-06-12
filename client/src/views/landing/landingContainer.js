import React, { Component } from 'react';
import * as d3 from "d3";
import GlobalFiltering from '../../helpers/GlobalFiltering';
import { connect } from 'react-redux';

class BubbleChart extends Component {

    RenderChampion = (props) => {
        const championPoste = props.championPoste;
        return (
            <div style={{ "display": "flex", "flexWrap": "wrap" }}>
                {props.champion_poste.map((champion, index) => {
                    return (
                        <Link to={`./fiche-${champion.name}`}
                            key={index}
                            onMouseEnter={() => this.getName(`${champion.name}`)}
                        >
                            <div
                                className="bubble-champ big"
                                style={{ backgroundImage: `url(${champion.icon})` }}
                            >
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_rate: (selectedRate) => {
            dispatch({
                type: 'SET_RATE',
                value: selectedRate
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BubbleChart);