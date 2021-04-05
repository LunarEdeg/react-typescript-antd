import React, { Suspense } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from 'components/Loading';

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

interface IProps {
  routeMap: IRoute[];
}

// 根据路由配置生成路由
const getRoutes = (routeMap: IRoute[]) => {
  const routes: RouteProps[] = [];
  const getRoute = (routeMapItem: IRoute[]) => {
    for (const config of routeMapItem) {
      const { path, exact, component, children } = config;
      if (children) {
        getRoute(children);
      } else {
        routes.push({ path, exact, component });
      }
    }
  };
  getRoute(routeMap);
  return routes;
};

const InnerRouter: React.FC<IProps> = ({ routeMap }) => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      {getRoutes(routeMap).map((route: RouteProps) => (
        <Route key={`${route.path}`} path={route.path} exact={route.exact} component={route.component} />
      ))}
    </Switch>
  </Suspense>
);

export default InnerRouter;
