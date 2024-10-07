import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PoppinsText } from '../../../asset/font';
import Colors from '../../../component/atoms/Colors';

const DetailLogPresensi = ({route , navigation } : any) => {
    const {data} = route.params;

    // console.log("data : " + JSON.stringify(data))


  return (

    <SafeAreaView style = {styles.container}>

    <View style ={styles.styleview}>
      <FlatList
      data={data}
      renderItem={({item}) => (
        <View style = {styles.styleviewlist}>
            
            <Text style={styles.styleTextevents}> {item.event.event_name}</Text>
            <Text style={styles.styleTextTime}> {item.date} - {item.time}</Text>

            <View style={styles.styleViewDetail}>
            <TouchableOpacity 
               
                onPress={() =>  navigation.navigate('Detail', {
                    id_log:item.event.id
                  })}>

                <Text style={styles.styleTextButton}>Detail</Text>

            </TouchableOpacity>
            </View>

           
        </View>
  
  
        
      )}
      />
    </View>
    </SafeAreaView>
  )
}

export default DetailLogPresensi

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'#fff'
  }, 
  styleview:{
    margin:16
  }, 
  styleviewlist:{
    padding:10,
    marginTop:10,
    backgroundColor:'#fff',
    borderRadius:15,
    borderColor:'#000',
    elevation:2,
    width:'100%',
    borderWidth:1
  }, 
  styleTextevents:{
    fontWeight:'bold', 
    color:Colors.black
  },
  styleTextTime:{
    fontSize:12, 
    color:Colors.black, 
    fontWeight:'medium'
  }, 
  styleViewDetail:{
    flexDirection:'row', 
    justifyContent:'flex-end', 
    alignItems:'center', 
    alignContent:'center'
  }, 
  styleTextButton:{
    color:Colors.redapp, 
    flex:1, 
    fontWeight:'semibold'
  }
})