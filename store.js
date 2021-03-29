import { applyMiddleware, createStore } from 'redux';
import { createBleMiddleware } from './bleMiddleware';
import { reducer } from './reducer';

function initStore() {
  try {
    const bleMiddleware = createBleMiddleware();
    const store = createStore(reducer, applyMiddleware(bleMiddleware));
    return store;
  } catch (error) {
    console.warn(error);
    return createStore(reducer);
  }
}

export { initStore };
