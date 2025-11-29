import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { urineService, adService } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [todayCount, setTodayCount] = useState(0);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    loadTodayData();
    loadAds();
  }, []);

  const loadTodayData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await urineService.getRecords({
        startDate: today,
        endDate: today
      });
      setTodayCount(response.data.data.length);
    } catch (error) {
      console.log('加载数据失败');
    }
  };

  const loadAds = async () => {
    try {
      const response = await adService.getAds({ position: 'banner' });
      setAds(response.data.data);
    } catch (error) {
      console.log('加载广告失败');
    }
  };

  const handleAdClick = async (ad) => {
    try {
      await adService.clickAd(ad.id);
      Alert.alert('提示', `跳转到 ${ad.title}`);
    } catch (error) {
      console.log('广告点击失败');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>尿液健康管理</Text>
      
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>今日统计</Text>
        <Text style={styles.statsNumber}>{todayCount}</Text>
        <Text style={styles.statsLabel}>次排尿</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('记录')}
        >
          <Text style={styles.actionText}>快速记录</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('地图')}
        >
          <Text style={styles.actionText}>找厕所</Text>
        </TouchableOpacity>
      </View>

      {ads.map(ad => (
        <TouchableOpacity 
          key={ad.id}
          style={styles.adCard}
          onPress={() => handleAdClick(ad)}
        >
          <Text style={styles.adTitle}>{ad.title}</Text>
          <Text style={styles.adDesc}>{ad.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333'
  },
  statsCard: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20
  },
  statsTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10
  },
  statsNumber: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold'
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  actionButton: {
    backgroundColor: '#34C759',
    flex: 0.48,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  adCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500'
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  adDesc: {
    fontSize: 14,
    color: '#666'
  }
});

export default HomeScreen;