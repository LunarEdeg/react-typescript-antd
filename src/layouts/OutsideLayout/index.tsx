import React, { FC } from 'react';

const OutsideLayout: FC = ({ children }) => (
  <div>
    外部
    {children}
  </div>
);

export default OutsideLayout;
