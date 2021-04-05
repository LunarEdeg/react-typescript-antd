import { RouteProps } from 'react-router-dom';
import dashboardRoute from './modules/dashboard';
import blank from './modules/blank';
import chart from './modules/chart';

const routeMap = [dashboardRoute, blank, chart];

// 权限
export interface IPermission {
  id: number;
  // 路由权限/按钮权限
  type: 'route' | 'button';
  // 权限名称
  name: string;
  // 描述
  description?: string;
  // 提示信息
  reminder?: string;
}

export interface IRoute extends RouteProps {
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

// 根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames: string[], routeMapList: IRoute[]) => {
  const acceptedRouteMap: IRoute[] = [];

  for (const route of routeMapList) {
    if (routeNames.includes(route.name)) {
      acceptedRouteMap.push(route);
    }
  }

  return acceptedRouteMap;
};

// 获取可访问的路由表
const initRoutes = (permission: IPermission[]) => {
  const routeNames = permission.map(item => item.name);
  return filterRouteMap(routeNames, routeMap);
};

export default initRoutes;
