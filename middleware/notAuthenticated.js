export default function ({ store, redirect }) { //登陆之后使用中间件 登录之后不允许访问登陆页了 跳转到首页
  // If the user is authenticated redirect to home page
  if (store.state.user) {
    return redirect('/')
  }
}
// 中间件部分可以查看官网说明https://www.nuxtjs.cn/guide/routing