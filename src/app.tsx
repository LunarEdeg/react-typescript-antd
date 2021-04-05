// import React from 'react';

// interface IProperties {
//   name: string;
//   age: number;
// }

// function App(properties: IProperties) {
//   const { name, age } = properties;
//   return (
//     <div className='app'>
//       <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
//     </div>
//   );
// }

// export default App;

import React, { lazy, Suspense } from 'react';
import PageLoading from 'components/Loading';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const OutLayout = lazy(() => import('layouts/OutLayout'));
const InnerLayout = lazy(() => import('layouts/InnerLayout'));

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route path='/user' component={OutLayout} />
          <Route path='/' component={InnerLayout} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
