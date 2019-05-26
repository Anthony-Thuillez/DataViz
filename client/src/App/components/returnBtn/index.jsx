import React from 'react';
import { Link } from 'react-router-dom';

import './returnBtn.scss';

const BackBtn = () =>  (
    <div className="btn-back">
        <Link to="./"><span>back</span></Link>
    </div>
);

export default BackBtn