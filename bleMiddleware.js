import { BleMiddlewareManager } from './BleMiddlewareManager';

function createBleMiddleware() {
  const manager = new BleMiddlewareManager();
  function bleMiddleware(store) {
    try {
      manager.setStore(store);
    } catch (error) {
      // Good place to log error to Crashlytics or other state managment platform;
      console.warn('BleMiddleware Set Store:', error);
    }
    return next => action => {
      if (manager) {
        try {
          manager.handleAction(action);
        } catch (error) {
          // Good place to log error to Crashlytics or other state managment platform;
          console.warn('BleMiddleware Error:', error);
        }
      }
      return next(action);
    };
  }
  return bleMiddleware;
}

export { createBleMiddleware };
