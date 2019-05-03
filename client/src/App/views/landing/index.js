import React, { Component } from 'react';
import CloudChart from '../../scripts/CloudOfChamp';

import Header from '../../components/header';
import Filter from '../../components/filter';
import Modal from '../../components/infoModal';

import './landing.scss';


class Landing extends Component {


    render() {

        return (
            <>
                <Header />

                <CloudChart />

                <Filter />
                <Modal />
            </>
        )
    }
}

export default Landing