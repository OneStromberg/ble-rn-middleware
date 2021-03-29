import {
  BLE_CONNECT_DEVICE,
  BLE_START_SCAN,
  BLE_CONNECTED_DEVICE,
  BLE_ERROR,
  BLE_DEVICE_FOUND,
  BLE_DEVICE_DISCONNECTED,
  BLE_STATE_CHANGED,
  BLE_STOP_SCAN,
  BLE_DEVICE_DISCONNECT,
  BLE_CLEAN_SCAN
} from "./constants"

const bleStateChanged = (state) => ({
  type: BLE_STATE_CHANGED,
  state
})

const bleError = (error) => ({
  type: BLE_ERROR,
  error
});

const deviceFound = (device) => ({
  type: BLE_DEVICE_FOUND,
  device
})

const deviceConnected = (id) => ({
  type: BLE_CONNECTED_DEVICE,
  id
});

const deviceDisconnected = (id) => ({
  type: BLE_DEVICE_DISCONNECTED,
  id
})

const startScan = () => ({
  type: BLE_START_SCAN
})

const stopScan = () => ({
  type: BLE_STOP_SCAN
})

const cleanScanResult = () => ({
  type: BLE_CLEAN_SCAN
})

const connectDevice = (id) => ({
  type: BLE_CONNECT_DEVICE,
  id
})

const disconnectDevice = (id) => ({
  type: BLE_DEVICE_DISCONNECT,
  id
})

export {
  connectDevice,
  bleStateChanged,
  bleError,
  deviceFound,
  deviceConnected,
  deviceDisconnected,
  startScan,
  stopScan,
  disconnectDevice,
  cleanScanResult
};
