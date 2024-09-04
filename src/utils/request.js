import axios from 'axios'
// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVE,
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，例如添加token
    try {
      config.headers.Authorization = JSON.parse(localStorage.getItem('token'))
    } catch (error) {
      config.headers.Authorization = null
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 导出封装后的axios实例
export default instance
