import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import menus from 'src/config/menus';

import './index.less';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SideBar = ({ collapsed }) => {
  const location = useLocation();
  const a = location.pathname.split('/');

  const [current, setCurrent] = useState<string>(location.pathname);

  const defaultOpenKeys1 = a[1];
  const [openKeys, setOpenKeys] = useState([`/${defaultOpenKeys1}`]);

  useEffect(() => {
    if (a.length === 2) {
      setCurrent(`/${a[1]}`);
    } else if (a.length === 3) {
      setCurrent(`/${a[1]}/${a[2]}`);
    }
  }, [location.pathname]);

  // 菜单点击事件
  const handleClick = ({ key }): void => {
    setCurrent(key);
  };

  /**
   * 渲染菜单
   * @param menusList 菜单list
   * @returns
   */
  const renderMenuWrap = (menusList: any) =>
    menusList.map(item => (item.children && item.children.length > 0 ? renderMenuOne(item) : renderMenuTwo(item)));
  /**
   * 一级菜单
   * @param param0
   * @returns
   */
  const renderMenuOne = ({ key, title, children }) => (
    <SubMenu key={key} title={title}>
      {children &&
        children.map(item => (item.children && item.children.length > 0 ? renderMenuOne(item) : renderMenuTwo(item)))}
    </SubMenu>
  );

  /**
   * 二级菜单
   * @param item
   * @returns
   */
  const renderMenuTwo = (item: any) => (
    <Item key={item.key} title={item.title}>
      <Link to={item.path}>{item.title}</Link>
    </Item>
  );

  const onOpenChange = currentOpenKeys => {
    // 此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (currentOpenKeys.length === 0 || currentOpenKeys.length === 1) {
      setOpenKeys(currentOpenKeys);
      return;
    }

    // 最新展开的菜单
    const latestOpenKey = currentOpenKeys[currentOpenKeys.length - 1];
    setOpenKeys([latestOpenKey]);
  };

  return (
    <Sider
      className='inner__layout__sider'
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      theme='dark'
      width={200}
      trigger={undefined}
      collapsed={collapsed}
    >
      <div className='side__bar'>
        <div className='side__bar__logo'>
          <Link to='/dashboard'>
            <span className='title'>Admin</span>
          </Link>
        </div>
        <Menu
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          mode='inline'
          onClick={handleClick}
          selectedKeys={[current]}
          theme='dark'
        >
          {renderMenuWrap(menus)}
        </Menu>
      </div>
    </Sider>
  );
};
export default SideBar;
