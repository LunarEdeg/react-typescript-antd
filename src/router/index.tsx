import React, { FC } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import { InsideLayout, OutsideLayout } from 'layouts/index';

const LoadableComponent = (name: string) =>
  loadable(() => import(`pages/${name}`), {
    fallback: <div>加载中</div>,
  });

const list = [
  {
    path: '/',
    exact: true,
    component: 'Login',
  },
];

const list2 = [
  {
    path: '/dashboard',
    exact: false,
    component: 'Dashboard',
  },
  {
    path: '/user/list',
    exact: false,
    component: 'User',
  },
  {
    path: '/charts/list',
    exact: false,
    component: 'Charts',
  },
  {
    path: '/charts/line',
    exact: false,
    component: 'Line',
  },
  {
    path: '/404',
    exact: false,
    component: '404',
  },
];

const Routers: FC = () => (
  <Router>
    <Switch>
      {list.map(v => (
        <Route
          key={v.path}
          exact={v.exact}
          path={v.path}
          render={() => (
            <OutsideLayout>
              <Route path={v.path} component={LoadableComponent(v.component)} />
            </OutsideLayout>
          )}
        />
      ))}

      {list2.map(v => (
        <Route
          key={v.path}
          exact={v.exact}
          path={v.path}
          render={() => (
            <InsideLayout>
              <Route path={v.path} component={LoadableComponent(v.component)} />
            </InsideLayout>
          )}
        />
      ))}

      <Route component={LoadableComponent('404')} />
    </Switch>
  </Router>
);

export default Routers;
