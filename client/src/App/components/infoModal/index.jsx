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
                                        <img className="img-rank" src={ImgRank} alt="rang" />
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
                                            <p>Ligne 1 valeur la plus élevée</p>
                                            <p>Ligne 2 valeur médiane</p>
                                            <p>Ligne 3 valeur la plus basse</p>
                                        </div>
                                        <img className="img-graph" src={ImgGraph} alt="rangraphg" />
                                    </div>
                                    <div className="block">
                                        <img className="img-filter" src={ImgFilter} alt="filter" />
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
                                        <img className="img-liquid" src={ImgLiquid} alt="liquid" />
                                    </div>
                                    <div className="block">
                                        <img className="img-stat" src={ImgStat} alt="stat" />
                                        <p>Ce graph montre les statistiques du champion sélectionner. 
                                        Vous pouvez découvrir à quoi correspond un icon en passant votre curseur sur ce dernier.</p>
                                    </div>
                                    <div className="block">
                                        <p>Découvrez à quelle position votre champion est le plus joué.</p>
                                        <img className="img-map" src={ImgMap} alt="map" />
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