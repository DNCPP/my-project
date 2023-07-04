import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  const navigation = useNavigation(); // Use the useNavigation hook inside the component

  const handleRegister = () => {
    const data = {
      name: name,
      phoneNumber: phoneNumber,
      province: province,
      district: district,
      ward: ward,
      address: address,
    };
    axios.post('http://192.168.2.6:3000/let', data)
      .then(response => {
        navigation.navigate('Home', { userData: response.data });
        // Xử lý kết quả đăng ký tại đây
      })
      .catch(error => {
        console.error('Error registering:', error);
      });
  };
  
  return (
    <View style={styles.container}>
      <TextInput placeholder='Họ và tên' style={styles.input} value={name} onChangeText={text => setName(text)} />
      <TextInput
        placeholder='Số điện thoại'
        style={[styles.input, isInvalidInput && styles.invalidInput]}
        value={phoneNumber}
        onChangeText={(text) => {
          if (text === '' || /^\d+$/.test(text)) {
            setPhoneNumber(text);
            setIsInvalidInput(false);
          } else {
            setIsInvalidInput(true);
          }
        }}
        // onChangeText={(text) => setPhoneNumber(text)}
        //   maxLength={10}
        //   keyboardType='numeric'
      />
      {isInvalidInput && <Text style={styles.errorText}>Vui lòng chỉ nhập số.</Text>}
      <TextInput placeholder='Tỉnh' style={styles.input} value={province} onChangeText={text => setProvince(text)} />
      <TextInput placeholder='Quận/Huyện' style={styles.input} value={district} onChangeText={text => setDistrict(text)} />
      <TextInput placeholder='Phường/Xã' style={styles.input} value={ward} onChangeText={text => setWard(text)} />
      <TextInput placeholder='Số Nhà' style={styles.input} value={address} onChangeText={text => setAddress(text)} />
  
      <Button title="Lưu" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    paddingHorizontal: 8,
  },
});
