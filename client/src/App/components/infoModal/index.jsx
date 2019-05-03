import React, { Component } from 'react';

import './infoModal.scss';

import ImgGraph from '../../assets/img/Hiw.png';
import ImgRank from '../../assets/img/Hiw-rank.png';

class Modal extends Component {
    state = {
        active: false,

    }

    isActive = () => {
        this.setState({ active: true });
    }

    isNotActive = () => {
        this.setState({ active: false });
    }

    render() {

        return (
            <>
                <div onClick={this.isActive} className="btn-info"></div>
                <div className={this.state.active ? 'modal-info active' : 'modal-info'}>
                    <div onClick={this.isNotActive} className="icon icon-cross"></div>
                    <div className="modal-content">
                        <h2 className="title">How it works ?</h2>
                        <div className="img-graph">
                            <img src={ImgGraph} alt="graphique" />
                        </div>
                        <div className="block">
                            <p>The size of the rounds content the images corresponds to the tier rank.</p>
                            <img className="img-rank" src={ImgRank} alt="rang" />
                        </div>
                        <div onClick={this.isNotActive} className="btn-close">Keep going</div>
                    </div>
                </div>
            </>
        )
    }
}
export default Modal