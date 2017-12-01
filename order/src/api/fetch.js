import axios from 'axios'
// import router from '@router'
// import store from '@store'

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: '',
      headers: {},
      transformResponse: []
    })
    instance.interceptors.request.use(
      config => {
        return config
      },
      error => {
        console.error(`来自请求的错误:${error}`)
        return Promise.reject(error)
      })

    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        console.error(`来自响应的的错误:${error}`)
        return Promise.reject(error)
      })

    // 请求处理
    instance(options)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          resolve(res.data)
        }
        return false
      })
      .catch((error) => {
        console.error(`来自响应结果的错误:${error}`)
        reject(error)
      })
  })
}
