// 图表
import { lazy } from 'react';
// import IRoute from '../IRoute'
const Charts = lazy(() => import(/* webpackChunkName:"blank" */ 'pages/Charts'));

const route = {
  name: 'chart',
  title: '图表',
  path: '/chart',
  icon: 'menuChart',
  children: [
    {
      name: 'lineChart',
      title: '折线图',
      path: '/chart/lineChart',
      exact: true,
      component: Charts,
    },
  ],
};
export default route;
