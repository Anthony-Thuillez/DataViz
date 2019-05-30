import React from 'react';
import { Link } from 'react-router-dom';

import Img404 from '../../assets/img/404.png';

const Page404 = () =>  (
    <div className="page-404">
        <div className="block-404">
            <div className="img-container">
                <img src={Img404} alt="404" />
            </div>
            <div className="text-container">
                <p className="text-giant">404</p>
                <h2 className="title">Something’s missing</h2>
                <p className="text">This page is missing or you assembled the link incorrecly.</p>
                <Link className="link" to="/"><span>Go to website</span></Link>
            </div>
        </div>
    </div>
)

export default Page404