import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './infoModal.scss';

import ImgChamp from '../../assets/img/Hiw-champ.png';
import ImgRank from '../../assets/img/Hiw-rank.png';
import ImgGraph from '../../assets/img/Hiw-graph.png';
import ImgFilter from '../../assets/img/Hiw-filter.png';
import ImgLiquid from '../../assets/img/Hiw-liquid.png';
import ImgStat from '../../assets/img/Hiw-stat.png';
import ImgMap from '../../assets/img/Hiw-map.png';


class Modal extends Component {

    state = {
        active: false
    }

    toggleModal = () => {
        this.setState({ 
            active: !this.state.active
        });
    }

    render() {

        return (
            <>
                <div onClick={this.toggleModal} className="btn-info"></div>
                <div className={this.state.active ? 'modal active' : 'modal'}>
                    <div onClick={this.toggleModal} className="icon icon-cross"></div>
                    <div className="modal-content">
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
                                        <p>The size of the rounds content the images corresponds to the tier rank.</p>
                                        <div className="img-rank">
                                            <img src={ImgRank} alt="rang" />
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {
                            this.props.location.pathname === "/chart" && (
                                <>
                                    <div className="block">
                                        <div>
                                            <p>Les trois valeurs sur l’axe des ordonnés  correspondent à :</p>
                                            <p><span>Ligne 1 valeur la plus élevée</span></p>
                                            <p><span>Ligne 2 valeur médiane</span></p>
                                            <p><span>Ligne 3 valeur la plus basse</span></p>
                                        </div>
                                        <div className="img-graph">
                                            <img src={ImgGraph} alt="graph" />
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div className="img-filter">
                                            <img src={ImgFilter} alt="filter" />
                                        </div>
                                        <p>Les filtres permettent de changer les données que vous comparez.</p>
                                    </div>
                                </>
                            )
                        }

                        {
                            this.props.location.pathname === "/fiche" && (
                                <>
                                    <div className="block">
                                        <p>La couleurs changes en fonction de la position relative à la mediane.</p>
                                        <div className="img-liquid">
                                            <img src={ImgLiquid} alt="liquid" />
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div className="img-stat">
                                            <img src={ImgStat} alt="stat" />
                                        </div>
                                        <p>Ce graph montre les statistiques du champion sélectionner. 
                                        Vous pouvez découvrir à quoi correspond un icon en passant votre curseur sur ce dernier.</p>
                                    </div>
                                    <div className="block">
                                        <p>Découvrez à quelle position votre champion est le plus joué.</p>
                                        <div className="img-map">
                                            <img src={ImgMap} alt="map" />
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        <div onClick={this.toggleModal} className="btn">Keep going</div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Modal)