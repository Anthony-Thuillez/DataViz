import React, {Fragment} from 'react'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import {Link} from 'react-router-dom';

import './breadcrumb.scss'
const Breadcrumbs = ({ breadcrumbs }) => (
  <div>
    {breadcrumbs.map(({
      match,
      breadcrumb
    }) => (
    <Fragment>
        <span key={match.url}>
            <Link className="breadcrumb" to={match.url}>{breadcrumb}</Link> 
        </span>
        <span className="breadcrumb chevron">></span>
    </Fragment>
    ))}
  </div>
);

export default withBreadcrumbs()(Breadcrumbs);