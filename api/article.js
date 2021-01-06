import { request } from '@/plugins/request.js'

//获取公共文章列表
export const getArticles = params => { //GET Query地址栏形式传递参数  不需要data 放body中
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取自己文章列表，需要token验证，通过axios拦截器 做成插件机制，注册到nuxtconfig中,运行 Vue.js 应用程序之前执行 js 插件
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNTk3NzQxNTA4fQ.2yO8Fss4hYnvsIN2UYHsutQ1hmYqSSAA-UrIRnP4DOY`
    // }
  })
}

// 添加点赞需要token验证，通过axios拦截器 做成插件机制，注册到nuxtconfig中,运行 Vue.js 应用程序之前执行 js 插件
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞需要token验证，通过axios拦截器 做成插件机制，注册到nuxtconfig中 运行 Vue.js 应用程序之前执行 js 插件
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
export const addAxiosComment = (slug, data) => { //添加注释
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

export const newOrPutArticle = (slug, data,) => { //创建或更新文章
  return request({
    method: !slug ? 'POST' : 'PUT',
    url: `/api/articles/${slug || ''}`,
    data
  })
}

export const axiosFavoriteOrCanelPost = (type, slug) => { //喜欢或取消喜欢文章
  return request({
    method: type === 'favorited' ? 'POST' : 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const axiosDeletePost = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}

export const axiosGetPost = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
