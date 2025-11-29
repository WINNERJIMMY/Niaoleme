import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { urineService } from '../services/api';

const RecordScreen = ({ navigation }) => {
  const [volume, setVolume] = useState('');
  const [color, setColor] = useState('淡黄');
  const [notes, setNotes] = useState('');

  const colors = ['淡黄', '黄色', '深黄', '橙色', '红色', '褐色', '无色'];

  const handleSubmit = async () => {
    if (!volume) {
      Alert.alert('错误', '请输入尿量');
      return;
    }

    try {
      await urineService.addRecord({
        volume: parseInt(volume),
        color,
        notes
      });
      
      Alert.alert('成功', '记录已保存', [
        { text: '确定', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>记录尿液信息</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>尿量 (毫升)</Text>
        <TextInput
          style={styles.input}
          value={volume}
          onChangeText={setVolume}
          keyboardType="numeric"
          placeholder="请输入尿量"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>尿液颜色</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorScroll}>
          {colors.map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.colorButton, color === c && styles.colorButtonActive]}
              onPress={() => setColor(c)}
            >
              <Text style={[styles.colorText, color === c && styles.colorTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>备注</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder="可选备注信息"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>保存记录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333'
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  colorScroll: {
    marginVertical: 10
  },
  colorButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd'
  },
  colorButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  colorText: {
    fontSize: 14,
    color: '#333'
  },
  colorTextActive: {
    color: '#fff',
    fontWeight: 'bold'
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});

export default RecordScreen;