import React, { FC, useEffect, useState, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { SideBar } from './componets';
// import service from './service';
import './index.less';

const { Content, Header, Footer } = Layout;

interface CurrentProperties {
  children?: ReactNode;
}

const InsideLayout: FC = (properties: CurrentProperties) => {
  const { children } = properties;
  const history = useHistory();

  useEffect(() => {
    // service
    //   .getAccountInfo()
    //   .then(res => {
    //     // const b = initRoutes(res.permission);
    //     // setRouteMap(b);
    //     // return 1;
    //     console.log('res:', res);
    //     return 1;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, [history]);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className='inner__layout'>
      <SideBar collapsed={collapsed} />
      <Layout className='inner__layout__main' style={{ marginLeft: collapsed ? '80px' : '200px' }}>
        <Header style={{ padding: 0, background: '#FFF' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          Header
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design</Footer>
      </Layout>
    </Layout>
  );
};

export default InsideLayout;
