import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import initRoutes, { IRoute } from 'router/InnerRouter/init-router';
import InnerRouter from 'router/InnerRouter/inner-outer';
import MenuBar from './components/SideBar';
import service from './service';
import './index.less';

const InnerLayout: React.FC = () => {
  const history = useHistory();

  // 路由配置
  const [routeMap, setRouteMap] = useState<IRoute[]>([]);

  useEffect(() => {
    service
      .getAccountInfo()
      .then(res => {
        const b = initRoutes(res.permission);
        setRouteMap(b);
        return 1;
      })
      .catch(error => {
        console.log(error);
      });
  }, [history]);

  return (
    <Layout className='inner-layout'>
      <MenuBar routeMap={routeMap} />
      <Layout id='layoutMain' className='inner-layout__main'>
        <InnerRouter routeMap={routeMap} />
      </Layout>
    </Layout>
  );
};

export default InnerLayout;
