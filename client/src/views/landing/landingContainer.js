import React, { Component } from 'react';
import * as d3 from "d3";
import GlobalFiltering from '../../helpers/GlobalFiltering';
import { connect } from 'react-redux';

class BubbleChart extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            console.log(GlobalFiltering.getChampByPost(this.props.data, "Top"));
            console.log(GlobalFiltering.getChampByPost(this.props.data, "Jungle"));
            console.log(GlobalFiltering.getChampByPost(this.props.data, "Middle"));
            console.log(GlobalFiltering.getChampByPost(this.props.data, "Bottom"));
            console.log(GlobalFiltering.getChampByPost(this.props.data, "Support"));
        }
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