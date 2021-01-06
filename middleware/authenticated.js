export default function (context) { //校验登陆的中间件
  const { store, redirect } = context  //拿出store对象和 redirect用来重定向
  // If the user is not authenticated
  if (!store.state.user) {
    return redirect('/login')
  }
}
// 中间件部分可以查看官网说明https://www.nuxtjs.cn/guide/routing
