import { BleManager } from 'react-native-ble-plx';
import debounce from 'lodash/debounce';
import { batch } from 'react-redux';
import { bleError, bleStateChanged, deviceConnected, deviceDisconnected, deviceFound } from './actions';
import {
  BLE_ERROR,
  BLE_CONNECT_DEVICE,
  BLE_START_SCAN,
  BLE_STOP_SCAN,
  BLE_DEVICE_DISCONNECT
} from './constants';

function createDispatchDebounced(dispatch) {
  let accumulator = [];
  function debounceHandler(incomeAccumulator) {
    accumulator = []
    batch(() => {
      incomeAccumulator.forEach(function (action) {
        dispatch(action);
      })
    })
  }
  const debounced = debounce(debounceHandler, 200);
  return function dispatchDebounced(action) {
    debounced.cancel();
    accumulator.push(action);
    debounced(accumulator);
  }
}

class BleMiddlewareManager {
  constructor() {
    this.manager = new BleManager();
    this.setStore = this.setStore.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }
  // May throw new Error or log to state management tool
  // when dispatch is empty to catch such situation
  dispatchDebounced() {
    return null;
  }

  dispatch() {
    return null;
  }

  setStore(store) {
    this.dispatch = store.dispatch;

    // This is something experimental - to avoid situation with too
    // many logs happened simultaneously, so we are debouncing it with
    // accumulator using redux batch function to populate at once

    this.dispatchDebounced = createDispatchDebounced(this.dispatch);
    this.manager.onStateChange(state => {
      this.dispatch(bleStateChanged(state));
    }, true);
  }

  deviceScan() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        this.dispatch(bleError(error));
        return;
      }

      // In this app I want to show only devices with field "localName"
      if (device.localName) {
        const { id, localName } = device;
        this.dispatchDebounced(deviceFound({
          id,
          localName
        }));
      }
    });
  }

  connectToDevice(id) {
    const dispatch = this.dispatch;
    this.manager
      .connectToDevice(id)
      .then(function () {
        dispatch(deviceConnected(id));
      })
      .catch(function (error) {
        dispatch(bleError(error));
      });
    const disconnectSubscription = this.manager.onDeviceDisconnected(id, function (error) {
      if (error) {
        dispatch(bleError(error));
        return;
      }
      disconnectSubscription.remove();
      dispatch(deviceDisconnected(id));
    })
  }

  disconnectDevice(id) {
    const dispatch = this.dispatch;
    this.manager.cancelDeviceConnection(id).then(function () {
      dispatch(deviceDisconnected(id));
    }).catch(function (error) {
      dispatch(bleError(error));
    });;
  }

  stopDeviceScan() {
    this.manager.stopDeviceScan();
  }

  handleBleError() {
    this.stopDeviceScan();
  }

  handleAction(action) {
    const { type } = action;
    switch (type) {
      case BLE_START_SCAN:
        this.deviceScan();
        break;
      case BLE_STOP_SCAN:
        this.stopDeviceScan();
        break;
      case BLE_CONNECT_DEVICE:
        this.connectToDevice(action.id);
        break;
      case BLE_ERROR:
        this.handleBleError();
      case BLE_DEVICE_DISCONNECT:
        this.disconnectDevice(action.id);
        break;
    }
  }
}

export { BleMiddlewareManager };
