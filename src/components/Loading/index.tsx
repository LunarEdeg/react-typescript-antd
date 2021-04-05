import React from 'react';
import { Spin } from 'antd';

const loadingWrap: React.CSSProperties = {
  paddingTop: 100,
  textAlign: 'center',
};

const PageLoading: React.FC = () => (
  <div style={loadingWrap}>
    <Spin tip='加载中...' size='large' />
  </div>
);

export default PageLoading;
