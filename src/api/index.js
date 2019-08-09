// 配置一个axios,导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  config.headers = [{
    Authorization: `Bearer ${store.getUser().token}`
  }]
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    return router.push('/login')
  }
})

export default axios
