import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface TextInputLoginProps {
    state: string;
    set: (text: string) => void;
    keyboardType?: TextInputProps['keyboardType'];
    placeholder?: string;
    isPassword?: boolean;
}

const TextInputLogin: React.FC<TextInputLoginProps> = (props) => {
    return (
        <View>
            <TextInput
                value={props.state}
                style={styles.input}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                onChangeText={props.set}
                secureTextEntry={props.isPassword}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#c9c9c9',
        paddingLeft: 10,
        paddingVertical: 10,
    },
});

export default TextInputLogin;