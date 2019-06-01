
import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { connect } from 'react-redux';
import AppRouteConfigs from './AppRouteConfigs';
import reducer from '../redux/reducers';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const App = reduxifyNavigator(AppRouteConfigs, 'root');

const mapStateToProps = state => {
  return ({
    state: {...state.nav, ...state.userRole, ...state.appData, ...state.userToken },
  });
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      middleware,
      thunkMiddleware,
      loggerMiddleware, // commented logger temporarily
    ),
  );
  return createStore(reducer, initialState, enhancer);
};

const Root = () => <AppWithNavigationState />;

export {
  configureStore,
  Root,
};
