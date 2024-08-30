import axio from "axios";
// 创建axios实例
const instance = axios.create({
  // 设置默认的基础URL
  baseURL: import.meta.env.VITE_APP_SERVE,
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，例如添加token
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 例如，如果响应状态码为401，跳转到登录页面
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 导出封装后的axios实例
module.exports = instance;