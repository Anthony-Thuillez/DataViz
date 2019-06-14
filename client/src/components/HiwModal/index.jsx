import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ImgChamp from '../../assets/img/Hiw-champ.png';
import ImgRank from '../../assets/img/Hiw-rank.png';
import ImgGraph from '../../assets/img/Hiw-graph.png';
import ImgFilter from '../../assets/img/Hiw-filter.png';
import ImgLiquid from '../../assets/img/Hiw-liquid.png';
import ImgStat from '../../assets/img/Hiw-stat.png';
import ImgMap from '../../assets/img/Hiw-map.png';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    state = {
        active: false
    }

    escFunction(event) {
        if (this.state.active && event.keyCode === 27) {
            this.setState({ active: !this.state.active });
        }
    }

    componentDidMount() {
        
        document.addEventListener("keydown", this.escFunction, false);
    }

    toggleModal = () => {
        this.setState({
            active: !this.state.active
        });
    }

    render() {

        return (
            <>
                <div onClick={this.toggleModal} className="btn-hiw"></div>
                <div className={this.state.active ? 'modal active' : 'modal'}>
                    <div onClick={this.toggleModal} className="icon icon-cross"></div>
                    <div className="modal-content hiw">
                        <h2 className="title">How it works ?</h2>
                        {
                            this.props.location.pathname === "/" && (
                                <>
                                    <div className="block">
                                        <div className="img-champ">
                                            <img src={ImgChamp} alt="champions" />
                                        </div>
                                    </div>
                                    <div className="block">
                                        <p>The size of the rounds corresponds to the ranking of each champion</p>
                                        <div className="img-rank">
                                            <img src={ImgRank} alt="rang" />
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {
                            this.props.location.pathname.indexOf("/graph") === 0 && (
                                <>
                                    <div className="block">
                                        <div>
                                            <p>The three values on the y-axis correspond to :</p>
                                            <p><span>Line 1 - highest value</span></p>
                                            <p><span>Line 2 - median value</span></p>
                                            <p><span>Line 3 - lowest value</span></p>
                                        </div>
                                        <div className="img-graph">
                                            <img src={ImgGraph} alt="graph" />
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div className="img-filter">
                                            <img src={ImgFilter} alt="filter" />
                                        </div>
                                        <p>Filters allow you to change the data you are comparing.</p>
                                    </div>
                                </>
                            )
                        }

                        {
                            this.props.location.pathname.indexOf("/fiche") === 0 && (
                                <>
                                    <div className="block">
                                        <p>If the hexagon is filled in red, then its value is lower than the median of the values of all champions. If it is blue, it is superior.</p>
                                        <div className="img-liquid">
                                            <img src={ImgLiquid} alt="liquid" />
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div className="img-stat">
                                            <img src={ImgStat} alt="stat" />
                                        </div>
                                        <p>
                                            This graph shows the statistics of the selected champion.
                                            You can find out what an icon corresponds to by passing your cursor over it.
                                        </p>
                                    </div>
                                    <div className="block">
                                        <p>Find out which lane your champion is most played on.</p>
                                        <div className="img-map">
                                            <img src={ImgMap} alt="map" />
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        <button onClick={this.toggleModal} className="btn">Keep going</button>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Modal)