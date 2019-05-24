import React, { Component } from 'react';
import BubbleChart from '../../scripts/CloudOfChamp';

import Champbubble from '../../components/champbubble';
import Postbubble from '../../components/postbubble';
import Filter from '../../components/filter';

class Landing extends Component {

    render() {

        return (
            <>
                <BubbleChart />
                {/* en attendant l'inté */}
                <div style={{ "position":"absolute", "top":"50%", "left":"50%", "transform":"translate(-50%, -50%)", "display":"flex", "alignItems":"center" }} >
                    <Champbubble />
                    <Postbubble />
                </div>
                <Filter />
            </>
        )
    }
}

export default Landing