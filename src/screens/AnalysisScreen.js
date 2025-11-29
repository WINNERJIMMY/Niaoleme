import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { urineService } from '../services/api';

const AnalysisScreen = () => {
  const [analysis, setAnalysis] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadAnalysis();
    loadRecentRecords();
  }, []);

  const loadAnalysis = async () => {
    try {
      const response = await urineService.getAnalysis();
      setAnalysis(response.data.data);
    } catch (error) {
      console.log('加载分析数据失败');
    }
  };

  const loadRecentRecords = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      
      const response = await urineService.getRecords({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
      setRecords(response.data.data);
    } catch (error) {
      console.log('加载记录失败');
    }
  };



  if (!analysis) {
    return (
      <View style={styles.loading}>
        <Text>正在分析数据...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>健康分析报告</Text>

      <View style={styles.analysisCard}>
        <Text style={styles.cardTitle}>排尿频率分析</Text>
        <Text style={styles.cardValue}>今日: {analysis.dailyFrequency.today} 次</Text>
        <Text style={styles.cardStatus}>状态: {analysis.dailyFrequency.status}</Text>
        <Text style={styles.cardNote}>{analysis.dailyFrequency.normal}</Text>
      </View>

      <View style={styles.analysisCard}>
        <Text style={styles.cardTitle}>尿液颜色分析</Text>
        <Text style={styles.cardValue}>主要颜色: {analysis.colorAnalysis.mostCommon}</Text>
        <Text style={styles.cardStatus}>状态: {analysis.colorAnalysis.status}</Text>
      </View>

      <View style={styles.analysisCard}>
        <Text style={styles.cardTitle}>尿量分析</Text>
        <Text style={styles.cardValue}>平均尿量: {analysis.volumeAnalysis.average} ml</Text>
        <Text style={styles.cardStatus}>状态: {analysis.volumeAnalysis.status}</Text>
      </View>

      <View style={styles.recommendationsCard}>
        <Text style={styles.cardTitle}>健康建议</Text>
        {analysis.recommendations.map((rec, index) => (
          <Text key={index} style={styles.recommendation}>• {rec}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={loadAnalysis}>
        <Text style={styles.refreshText}>刷新分析</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },

  analysisCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  cardValue: {
    fontSize: 16,
    marginBottom: 5,
    color: '#007AFF'
  },
  cardStatus: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600'
  },
  cardNote: {
    fontSize: 12,
    color: '#666'
  },
  recommendationsCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },
  recommendation: {
    fontSize: 14,
    marginBottom: 8,
    color: '#2D5016',
    lineHeight: 20
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default AnalysisScreen;