//  空白页
import { lazy } from 'react';

import { RouteProps } from 'react-router-dom';
// 主要是继承RouteProps的path，exact和component来使用
interface IRoute extends RouteProps {
  // name供权限管理使用
  name: string;
  // title供菜单使用
  title: string;
  path: string;
  // icon供菜单使用
  icon?: any;
  // 是否在侧边菜单显示
  hiddenInMenu?: boolean;
  children?: IRoute[];
}

const Blank = lazy(() => import(/* webpackChunkName:"blank" */ 'pages/Blank'));

const route: IRoute = {
  name: 'blank',
  title: '空白页',
  icon: 'menuBlank',
  path: '/blank',
  exact: true,
  component: Blank,
};

export default route;
