import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './register';
import LoadData from './loadData';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Xin chào' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Đăng ký' }} />
        {/* Thêm các màn hình khác vào đây nếu cần */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button style={styles.button} title="Đăng ký" onPress={() => navigation.navigate('Register')} />
      <LoadData></LoadData>
    </View>
  );
}

function RegisterScreen() {
  const navigation = useNavigation();

  return <Register navigation={navigation} />;
}

function LoadDataScreen() {
  return <LoadData />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    paddingTop:20,
    marginHorizontal:10,
    marginVertical:100,

  }
});
