import axios from 'axios';

// 创建axios实例
export const http = axios.create({
  // 实际生产配置如下
  // baseURL: process.env.NODE_ENV === "production"?'http://yourproductserver:8080/':"http://localhost:8081/api",
  // mock配置
  baseURL: process.env.NODE_ENV === "/",
  timeout: 5000, // 请求超时时间
  withCredentials: true,
  jar:true,
  headers: {
    "Content-Type": "Application/json",
  }
  // 其他配置...
});
 
// 请求拦截器
http.interceptors.request.use(config => {
  // 可以在这里添加例如token等请求头
  return config;
}, error => {
  // 请求错误处理
  return Promise.reject(error);
});
 
// 响应拦截器
http.interceptors.response.use(response => {
  // 对响应数据做处理，例如只返回data部分
  return response.data;
}, error => {
  // 响应错误处理
  return Promise.reject(error);
});
