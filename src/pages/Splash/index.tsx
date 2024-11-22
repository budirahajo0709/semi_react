import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {icsemi, icseminew} from '../../asset/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import {BASE_URL_STAG} from '@env';
import Toast from 'react-native-simple-toast';

const Splash = ({navigation}: {navigation: any}) => {
  const originalString = DeviceInfo.getVersion();
  const trimmedString = originalString.replace(/\.0+$/, '');

  useEffect(() => {
    const params = {
      txtKode: 2,
      app: 'SeMi',
    };

    console.log('params', params);

    axios
      .post(
        `${BASE_URL_STAG}/kidsgbigama_api.api.app_version.api.check_version`,
        params,
      )
      .then(response => {
        console.log('A', response.data);

        if (response.data.meta.status_code == 200) {
          // navigation.replace('Home')
          setTimeout(() => {
            // navigation.replace('Login');
            handleGetToken();
          }, 3000);
        } else {
          // setLoading(false)
          Toast.show(
            '' + response.data.meta.message,
            Toast.SHORT,
          );
        }
      })
      .catch(error => {
        // Handle error
        // setLoading(false)
        console.log(error);
        Toast.show('' + error, Toast.SHORT);
        // Alert.alert("Login Failed", "Please check your credentials");
      });
  }, []);

  // useEffect(() => {
  //     setTimeout( () => {
  //         // navigation.replace('Login');
  //         handleGetToken()

  //     }, 3000)
  // }, []);

  const handleGetToken = async () => {
    try {
      let AccesToken = await AsyncStorage.getItem('AccesToken');
      console.log('AccesToken :' + AccesToken);

      if (!AccesToken) {
        navigation.replace('Login');
      } else {
        navigation.replace('Home');
      }
    } catch (e) {
      console.log('errororrr');
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <Image source={icseminew} style={{width: 150, height: 150}} />
        {/* <Text>
          {' '}
          `${BASE_URL_STAG}/kidsgbigama_api.api.app_version.api.check_version`
        </Text> */}
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
