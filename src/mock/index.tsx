import Mock from 'mockjs';

import account from './modules/account';

// 延时数据返回,模拟loading效果
Mock.setup({
  timeout: '300-800',
});

Mock.mock('/accountInfo', 'get', account.getAccountInfo);
