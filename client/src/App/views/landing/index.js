import React, { Component } from 'react';
import BubbleChart from '../../scripts/CloudOfChamp';

import Header from '../../components/header';
import Filter from '../../components/filter';
import Modal from '../../components/infoModal';

class Landing extends Component {

    render() {

        return (
            <>
                <Header />
                <BubbleChart />
                <Filter />
                <Modal />
            </>
        )
    }
}

export default Landing