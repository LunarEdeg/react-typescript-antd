import { lazy } from 'react';

const Dashboard = lazy(() => import(/* webpackChunkName:"dashboard" */ 'pages/Dashboard'));
const route = {
  name: 'dashboard',
  title: '首页',
  icon: 'menuHome',
  path: '/dashboard',
  exact: true,
  component: Dashboard,
};
export default route;
