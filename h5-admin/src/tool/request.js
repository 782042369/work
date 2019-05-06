// eslint-disable-line
import axios from 'axios';
import qs from 'qs'
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
axios.defaults.withCredentials = true

// 创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:7001', // api的base_url
  timeout: 100000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.url === 'dologin') {
      config.data = qs.stringify(config.data)
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    var config = error.config
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(error)
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0
    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(error)
    }
    // Increase the retry count
    config.__retryCount += 1
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config)
    })
  }
)
export default service
