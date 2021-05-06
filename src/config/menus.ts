const menu = [
  {
    path: '/dashboard',
    title: '首页',
    key: '/dashboard',
  },
  {
    path: '/user',
    title: '用户管理',
    key: '/user',
    children: [
      {
        path: '/user/list',
        title: '用户列表',
        key: '/user/list',
      },
    ],
  },
  {
    path: '/charts',
    title: '图例',
    key: '/charts',
    children: [
      {
        path: '/charts/list',
        title: '图例列表',
        key: '/charts/list',
      },
      {
        path: '/charts/line',
        title: '折线图',
        key: '/charts/line',
      },
    ],
  },
  {
    path: '/404',
    title: '404',
    key: '/404',
  },
];

export default menu;
