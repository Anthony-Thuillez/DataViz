import React from 'react';

import Header from '../../components/header';
import Modal from '../../components/infoModal';


const Layout = ({ children }) => (
    <>
        <Header />
        {children}
        <Modal />
    </>
)

export default Layout