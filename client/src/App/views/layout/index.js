import React from 'react';

import Header from '../../components/header';
import Modal from '../../components/infoModal';


const Layout = ({ children }) => (
    <div className="wrapper">
        <Header />
        {children}
        <Modal />
    </div>
)

export default Layout