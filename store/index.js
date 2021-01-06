//nuxt 规定 文件夹名称必须是store ,该文件不需要初始化vuex，nuxt会自动加载注入到容器中

const cookieparser = process.server ? require('cookieparser') : undefined
//在服务端渲染期间，运行的是同一个实例， 为了防止数据冲突,必须把state创建成一个函数 动态生成返回对象,生成一个新的
export const state = () => {
  return {
    user: null, //登陆用户信息
  }
}

export const mutations = { //更改数据
  setUser (state, user) {
    state.user = user //存储用户信息
  },
  updateVuexUser (state, { type, value }) {
    state.user[type] = value
  }
}

export const actions = { //vuex异步操作
  nuxtServerInit ({ commit }, { req }) { //这个方法是一个特殊的action方法,会在服务端渲染期间自动调用,仅在服务端运行
    let user = null
    if (req.headers.cookie) { //初始化登陆信息，拿到请求头 cookie,解析cookie,拿出登录信息
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user) //转换对象
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user) //储存登录信息
  }
}
