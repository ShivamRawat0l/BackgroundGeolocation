/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { request } from 'react-native-permissions';
import { MOTION_PERMISSION, PermissionStatus } from './Permission';

function App() {
  const BACKEND_URL = 'http://192.168.1.76:9000';

  const handleMotionError = () => {
    // show alert
    console.log('Motion PERMISSION ERROR');
  };

  const onAllPermissionsAvailable = () => {
    BackgroundGeolocation.startSchedule();
  };

  const startGeolocation = () => {
    BackgroundGeolocation.requestPermission().then(permission => {
      if (permission !== BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS) {
        console.log('Location PERMISSION ERROR');
    }
  });

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
      <Text>asd</Text>
    </SafeAreaView>
  );
}

export default App;
