import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { iclocation } from '../../../asset/images';

const Lokasi = ({route , navigation } : any) => {
    const {data_latitude} = route.params;
    const {data_longitude} = route.params;

    // console.log("data_latitude : " + data_latitude)
    // console.log("data_longitude : " + data_longitude)
    

  return (
    <SafeAreaView style ={{flex:1, backgroundColor:'#fff'}}>
    <View style={{margin:16}}>

      <MapView            
      showsUserLocation={true}
            showsTraffic={false}
            showsCompass={false}
            showsMyLocationButton={true}
         
            style={styles.map}
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={true}
            >

             <Marker 
            coordinate={{latitude:parseFloat(data_latitude), longitude:parseFloat(data_longitude)}}
            image={iclocation} style={{width:20, height:20}}
            />

      </MapView>

    </View>
    </SafeAreaView>
  )
}

export default Lokasi

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    map: {
        width: '100%',
        height: '100%',
      },
})