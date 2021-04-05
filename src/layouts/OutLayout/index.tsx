import React from 'react';
import OuterRouter from 'router/OutRouter';

import './index.less';

const OutLayout: React.FC = () => (
  <div className='out-layout'>
    <OuterRouter />
  </div>
);

export default OutLayout;
