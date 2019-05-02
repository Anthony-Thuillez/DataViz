import React, { Component } from 'react';

import Header from '../../components/header';
import Filter from '../../components/filter';
import Modal from '../../components/infoModal';

import './landing.scss';

class Landing extends Component {

    render() {
        return (
            <>
                <Header />
                <Filter />
                <Modal />
            </>
        )
    }
}

export default Landing