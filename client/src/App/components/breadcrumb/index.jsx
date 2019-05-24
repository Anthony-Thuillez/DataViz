import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import {Link} from 'react-router-dom';

import './breadcrumb.scss';

const Breadcrumbs = ({ breadcrumbs }) => (
  <div className="breadcrumb">
    {breadcrumbs.map(({
      match,
      breadcrumb
    }) => (
      <Link key={match.url} to={match.url}>{breadcrumb}</Link>
    ))}
  </div>
);

export default withBreadcrumbs()(Breadcrumbs);