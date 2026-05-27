import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import buildingReducer, {controlReducer} from '../Reducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const rootReducer = combineReducers({
  building: buildingReducer,
  controlReducer: controlReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
