import { MessageApi } from 'antd/lib/message';
import { Request } from 'utils/request';

declare global {
  export const $message: MessageApi;
  export const $request: Request;
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
