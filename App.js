/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

function App() {
  const BACKEND_URL = '192.168.1.76:9000/';

  const startGeolocation = () => {
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 50,
      stopTimeout: 10,
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      url: BACKEND_URL,
      batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
    }).then(state => {
      BackgroundGeolocation.start();
    });
  };
  return (
    <SafeAreaView>
      <Button
        title="Start Geolocation"
        onPress={() => {
          startGeolocation();
        }}
      />
      <Button
        title="Stop Geolocation"
        onPress={() => {
          BackgroundGeolocation.stop();
        }}
      />
      <Button
        title="Test Fetch"
        onPress={() => {
          fetch(BACKEND_URL)
            .then(a => {
              console.log(a);
            })
            .catch(e => {
              console.log(e);
            });
        }}
      />
    </SafeAreaView>
  );
}

export default App;
