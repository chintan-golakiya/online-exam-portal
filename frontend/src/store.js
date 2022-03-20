import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './redux/reducers/index';

const initialState={};
const middleware=[thunk,logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, 
  initialState, 
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;