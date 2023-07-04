import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';

export default function LoadData() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.2.6:3000/load');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
//Reload Data
  useEffect(() => {
    const interval = setInterval(fetchData, 500); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Data:</Text>
      {data.map((row) => (
        <View key={row.id} style={styles.rowContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Name: </Text>
            <Text>{row.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number: </Text>
            <Text>{row.phoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Province: </Text>
            <Text>{row.province}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>District: </Text>
            <Text>{row.district}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ward: </Text>
            <Text>{row.ward}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address: </Text>
            <Text>{row.address}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:400,
    marginTop:20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});