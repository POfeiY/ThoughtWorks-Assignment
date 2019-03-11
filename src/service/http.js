import axios from 'axios'
const instance = axios.create({timeout: 5000})
// 拦截请求
instance.interceptors.request.use((config) => {
  console.log('request config:', config)
  return config
}, error => Promise.reject(error))
// 拦截响应
instance.interceptors.response.use((response) => {
  // console.log(response)
  return response
}, (error) => {
  // 对401进行处理
  let response = error.response

  if (response.status === 401) {
    // TODO 登出
  }
  return Promise.reject(error)
})

export default function (url, method, config = {}) {
  return instance({
    url,
    method,
    ...config
  })
}
