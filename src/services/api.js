import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 尿液记录服务
export const urineService = {
  addRecord: (data) => api.post('/urine/records', data),
  getRecords: (params) => api.get('/urine/records', { params }),
  getAnalysis: () => api.get('/urine/analysis'),
};

// 厕所服务
export const toiletService = {
  getNearby: (params) => api.get('/toilets/nearby', { params }),
  addToilet: (data) => api.post('/toilets', data),
  rateToilet: (id, data) => api.post(`/toilets/${id}/rate`, data),
};

// 广告服务
export const adService = {
  getAds: (params) => api.get('/ads', { params }),
  clickAd: (id) => api.post(`/ads/${id}/click`),
};

export default api;