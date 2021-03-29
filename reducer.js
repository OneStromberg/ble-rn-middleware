import {
  BLE_DEVICE_FOUND,
  BLE_CLEAN_SCAN,
  BLE_DEVICE_DISCONNECTED,
  BLE_CONNECTED_DEVICE,
  BLE_START_SCAN,
  BLE_STOP_SCAN
} from './constants';

const initState = {
  isScanning: false,
  connectedDevices: null,
  availableDevices: null,
};

function reducer(state = initState, action) {
  const { type } = action;
  switch (type) {
    case BLE_DEVICE_FOUND:
      state.availableDevices = {
        ...state.availableDevices,
        [action.device.id]: action.device,
      };
      return state;
    case BLE_START_SCAN:
      return { ...state, isScanning: true }
    case BLE_STOP_SCAN:
      return { ...state, isScanning: false }
    case BLE_CLEAN_SCAN:
      delete state.availableDevices
      return state;
    case BLE_CONNECTED_DEVICE: {
      const { connectedDevices, availableDevices } = state;
      const device = availableDevices[action.id];
      delete availableDevices[action.id];
      return {
        availableDevices,
        connectedDevices: {
          ...connectedDevices,
          [action.id]: device,
        }
      };
    }
    case BLE_DEVICE_DISCONNECTED: {
      const { connectedDevices } = state;
      delete connectedDevices[action.id];
      return {
        ...state,
        connectedDevices
      };
    }
  }
  return state;
}

export { reducer };
