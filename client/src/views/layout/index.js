import React from 'react';

import Header from '../../components/Header';
import Modal from '../../components/HiwModal';


const Layout = ({ children }) => (
    <div className="wrapper">
        <Header />
        {children}
        <Modal />
    </div>
)

export default Layout