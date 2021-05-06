import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const store: any = createStore(reducer, applyMiddleware(thunk));

export default store;
