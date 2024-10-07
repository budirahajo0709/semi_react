import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native'

const TextInputLogin = props => {

    return(
    <View>

        <TextInput
            value={props.state}
            style={{
                backgroundColor:'#ffffff', 
                marginHorizontal: 10, 
                marginVertical: 10,
                borderRadius: 10, 
                elevation: 2, 
                borderWidth: 1,
                borderColor:'#c9c9c9',               
                paddingLeft:10,
                paddingVertical:10
            }}
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
 
            onChangeText={text => props.set(text)}
            secureTextEntry={props.isPassword}

            />
    </View>
    )
}
export default TextInputLogin;
