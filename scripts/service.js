/**
 * 应用配置
 */

const CONFIG_BASE = {
  // html的tite
  htmlTitle: 'Admin - {title}',
};

// 开发配置
const CONFIG_DEV = {
  // domain: 'http://api',
  domain: '',
};

// 测试配置
const CONFIG_TEST = {
  domain: 'http://api',
};

// 生产配置
const CONFIG_PRO = {
  domain: 'https://api',
};

const ENV_CONFIG_MAP = {
  development: CONFIG_DEV,
  test: CONFIG_TEST,
  production: CONFIG_PRO,
};

export default { ...CONFIG_BASE, ...ENV_CONFIG_MAP[process.env.NODE_ENV] };
