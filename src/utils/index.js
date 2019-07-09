import axios from 'axios'

const fetch = axios.create({
  // baseURL: 'http://192.168.1.162'
  baseURL: process.env.BASE_URL
})

fetch.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

fetch.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.token = token
    return config
  } else {
    return config
  }
}, err => Promise.reject(err))

export {fetch}
