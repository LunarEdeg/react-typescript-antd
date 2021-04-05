import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined, HomeOutlined } from '@ant-design/icons';
import { IRoute } from 'router/InnerRouter/init-router';
import './index.less';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

interface IProps {
  routeMap: IRoute[];
}

const MenuBar: React.FC<IProps> = ({ routeMap }) => {
  // 侧边菜单栏折叠
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleTrigger = () => {
    setCollapsed(!collapsed);
  };

  const getMenuItem = (route: IRoute) => {
    const { title, path, children, icon } = route;

    if (children) {
      return (
        <SubMenu key={`${path}`} icon={<MailOutlined />} title={title}>
          {children.map(item => getMenuItem(item))}
        </SubMenu>
      );
    }
    return (
      <Item>
        <Link to={path}>
          {icon && <HomeOutlined />}
          <span>{title}</span>
        </Link>
      </Item>
    );
  };

  return (
    <Sider
      className='inner-layout__sider'
      // style={{
      //   overflow: 'auto',
      //   height: '100vh',
      //   position: 'fixed',
      //   left: 0,
      // }}
      theme='dark'
      width={160}
      trigger={undefined}
      // collapsible
      collapsed={collapsed}
      onCollapse={() => handleTrigger()}
    >
      <div className='side-bar'>
        <div className='side-bar__logo'>
          <Link to='/dashboard'>
            <span className='title'>Admin</span>
          </Link>
        </div>
        <Menu mode='inline' theme='dark'>
          {routeMap.map(route => getMenuItem(route))}
        </Menu>
      </div>
    </Sider>
  );
};
export default MenuBar;
