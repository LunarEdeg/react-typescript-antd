import Mock from 'mockjs';

export interface IConfig {
  url: string;
  type: 'POST' | 'GET';
  body: string;
}

const accountInfo = Mock.mock({
  name: '@cname',
  gender: '@pick([1, 2])',
  avatar: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
  email: '@email',
  mobilePhone: /^1[3-57-9]\d{9}$/,
  roles: [1],
  // 路由权限表
  // 如果配置了一级路由，则它之下的所有子路由都可访问。
  permission: [
    {
      id: 1,
      name: 'dashboard',
      discriptiong: '首页',
      reminder: '您没有权限访问首页',
    },
    {
      id: 2,
      name: 'chart',
    },
    {
      id: 3,
      name: 'article',
    },
    {
      id: 4,
      name: 'blank',
    },
    {
      id: 5,
      name: 'form',
    },
    {
      id: 6,
      name: 'user',
    },
  ],
});

export default {
  getAccountInfo() {
    return {
      code: 200,
      data: accountInfo,
    };
  },
};
