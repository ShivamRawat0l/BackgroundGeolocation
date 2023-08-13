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
import { BACKEND_URL, start, stopBackgroundGeolocation } from '.';

function App() {

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
    else {
      BackgroundGeolocation.start()
    }
  });
}

  return (
    <SafeAreaView>
      <Button
        title="Start Geolocation"
        onPress={() => {
          //startGeolocation();
          start()
        }}
      />
      <Button
        title="Stop Geolocation"
        onPress={() => {
      stopBackgroundGeolocation()
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
