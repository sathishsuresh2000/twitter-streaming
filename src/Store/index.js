import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer';

import {layout} from '../Sagas/Sagas'

import { composeWithDevTools } from 'redux-devtools-extension';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ),
 );

sagaMiddleware.run(layout)

export default store