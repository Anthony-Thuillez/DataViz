import React, { Component } from 'react';
import * as d3 from "d3";
import GlobalFiltering from '../../helpers/GlobalFiltering';
import { connect } from 'react-redux';

class BubbleChart extends Component {

    state = {
        championsTop: [],
        championsJgl: [],
        championsMid: [],
        championsBot: [],
        championsSupp: [],
    }

    componentDidMount() {
        this.displayChamp()
    }

    displayChamp() {
        let championsTop = GlobalFiltering.getChampByPost(this.props.data, "Top");
        let championsJgl = GlobalFiltering.getChampByPost(this.props.data, "Jungle");
        let championsMid = GlobalFiltering.getChampByPost(this.props.data, "Middle");
        let championsBot = GlobalFiltering.getChampByPost(this.props.data, "Bottom");
        let championsSupp = GlobalFiltering.getChampByPost(this.props.data, "Support");
        this.setState({
            championsTop: championsTop,
            championsJgl: championsJgl,
            championsMid: championsMid,
            championsBot: championsBot,
            championsSupp: championsSupp,
        })
        console.log( 1, this.state.championsTop);
        console.log( 2, this.state.championsJgl);
        console.log( 3, this.state.championsMid);
        console.log( 4, this.state.championsBot);
        console.log( 5, this.state.championsSupp);
        
        if (!window.location.href.includes("/graph")) {
            // DO NOT DELETE ❗️// DO NOT DELETE ❗️
            // DO NOT DELETE ❗️ // DO NOT DELETE ❗️
            // Reset to default rate on redux
            this.props.set_rate("win")
        }
        /*
        var champion = champions.map((champion) => {
            return {
                rank: champion.rank,
                name: champion.name,
                icon: champion.icon,
                quotation: champion.quotation,
                role: champion.role
            }
        })
        return champion
        */

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