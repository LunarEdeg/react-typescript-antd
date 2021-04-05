import React, { lazy, Suspense } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from 'components/Loading';

const Login = lazy(() => import(/* webpackChunkName:"login" */ 'pages/user/Login'));

const routes: RouteProps[] = [
  {
    path: '/user/login',
    exact: true,
    component: Login,
  },
];

const OutRouter: React.FC = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      {routes.map((route: RouteProps) => (
        <Route key={`${route.path}`} path={route.path} exact={route.exact} component={route.component} />
      ))}
    </Switch>
  </Suspense>
);

export default OutRouter;
