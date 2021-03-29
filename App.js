import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  SectionList,
  View,
  Button,
  Text,
  StyleSheet
} from 'react-native';
import { useDispatch, Provider, useSelector } from 'react-redux';
import { initStore } from './store';
import { cleanScanResult, connectDevice, disconnectDevice, startScan, stopScan } from './actions';

// App.js
const store = initStore();

const ControlButtons = () => {
  const dispatch = useDispatch();
  const isScanning = useSelector(state => state.isScanning);
  return (
    <View style={styles.controlButtons}>
      {!isScanning && <Button title="Scan" onPress={() => dispatch(startScan())} />}
      {isScanning && <Button title="Stop Scan" onPress={() => dispatch(stopScan())} />}
      <Button title="Clean Results" onPress={() => dispatch(cleanScanResult())} />
    </View>
  )
};

const DeviceItem = ({ localName, onPress, id, buttonTitle }) => {
  return (
    <View style={styles.item}>
      <View style={styles.buttonLabelWrapper}>
        <Text style={styles.deviceName}>{localName}</Text>
      </View>
      <Button color="#ffffff" style={styles.btnConnect} title={buttonTitle} onPress={() => onPress(id)} />
    </View>
  );
};

function renderDeviceItem({ item, section }) {
  const { onPress, buttonTitle } = section;
  return (
    <DeviceItem buttonTitle={buttonTitle} onPress={onPress} {...item} />
  );
}

const BleDevicesList = () => {
  const availableDevices = useSelector(state => state.availableDevices && Object.values(state.availableDevices));
  const connectedDevices = useSelector(state => state.connectedDevices && Object.values(state.connectedDevices));
  const deviceList = [];
  const dispatch = useDispatch();
  function onPressConnectDevice(id) {
    dispatch(connectDevice(id));
  }
  function onPressDisconnectDevice(id) {
    dispatch(disconnectDevice(id));
  }
  if (availableDevices && availableDevices.length) {
    deviceList.push({
      buttonTitle: "Connect",
      onPress: onPressConnectDevice,
      title: 'Available Devices',
      data: availableDevices,
    });
  }
  if (connectedDevices && connectedDevices.length) {
    deviceList.push({
      buttonTitle: "Disconnect",
      onPress: onPressDisconnectDevice,
      title: 'Connected Devices',
      data: connectedDevices,
    });
  }
  return (
    <SectionList
      style={styles.list}
      sections={deviceList}
      keyExtractor={(item, index) => item + index}
      renderItem={renderDeviceItem}
      renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionTitle}>{title}</Text>}
    />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ControlButtons />
        <BleDevicesList />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  deviceName: {
    fontSize: 14,
    color: 'white',
    alignItems: "flex-end",
  },
  sectionTitle: {
    color: 'white'
  },
  list: {
    height: "100%",
    marginHorizontal: 8,
  },
  item: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  btnConnect: {
    backgroundColor: "white"
  },
  buttonLabelWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default App;
