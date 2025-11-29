import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('权限错误', '需要位置权限');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    } catch (error) {
      Alert.alert('错误', '获取位置失败');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>地图功能</Text>
      {location ? (
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>经度: {location.longitude.toFixed(6)}</Text>
          <Text style={styles.infoText}>纬度: {location.latitude.toFixed(6)}</Text>
          <Text style={styles.note}>地图功能待完善</Text>
        </View>
      ) : (
        <Text style={styles.loading}>正在获取位置...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333'
  },
  note: {
    fontSize: 14,
    color: '#999',
    marginTop: 20
  },
  loading: {
    fontSize: 16,
    color: '#666'
  }
});

export default MapScreen;