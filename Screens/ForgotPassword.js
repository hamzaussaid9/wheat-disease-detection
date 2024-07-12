import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/agent';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSendResetLink = async () => {
    try {

      const response = await auth.forgetPassword(email);
      console.log(response);

      if (response?.success) {
        Alert.alert('Success', response?.message);
        navigation.navigate('LoginIn');
      } else {
        Alert.alert('Error', response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'User does not exist or there was an error in the request',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.navigate('LoginIn')} />
      <Text style={{ fontSize: 34, bottom: 300 }}>Forget Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send Reset Link" onPress={handleSendResetLink} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ForgotPassword;
