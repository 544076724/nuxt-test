import {request} from '@/plugins/request.js'

//用户登陆
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}


//用户注册
export const registration = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

export const putUser = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}

//关注或取消用户
export const axiosFollowOrCancelUser = (type,username) => { 
  return request({
    method: type === 'follow' ? 'POST' :'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}