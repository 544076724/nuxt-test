// 封装axios
import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})
//请求拦截器


//响应拦截器
// 插件机制，注册到nuxtconfig中,运行 Vue.js 应用程序之前执行 js 插件
// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default (({ store }) => {
   // 请求拦截器
  // Add a request interceptor
  // 任何请求都要经过请求拦截器
  // 我们可以在请求拦截器中做一些公共的业务处理,例如统一设置 token
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 每个请求之前就会经过这里
    const { user } = store.state
    if (user && user.token) { //获取token
      config.headers.Authorization = `Token ${user.token}`
    }
     // 返回 config 请求配置对象
     return config
  },function(err) {
        // 如果请求失败(此时请求还没有发出去)就会进入这里
    // Do something with request error
    return Promise.reject(error)
  })
})
