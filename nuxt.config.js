// 配置文件nuxtjs

module.exports = {
  router: {//自定义路由配置
    linkActiveClass: 'active', //配置默认选中class 首页home /配置了精确匹配 exact 不然下级和home都会被匹配到
    extendRoutes (routes, resolve) { //自定义路由配置，扩展路由配置
      routes.splice(0) //清空nuxt.js默认生成的路由表
      // routes.push({
      //   name: 'custom',
      //   path: '*',
      //   component: resolve(__dirname, 'pages/404.vue')
      // })
      routes.push(...[ //重新定义路由
        {
          path: '/', //默认布局组件
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', //默认子路由，首页
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login', //login登陆
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register', //Register注册
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username', //用户信息
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings', //用户设置
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor/:slug?', //创建编辑文章
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug', //文章详情
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            },
          ]
        }
      ])
    }
  },


  server: { //部署端口  和ip  0.0.0.0 对外暴露访问
    host: '0.0.0.0',
    port: 3000
  },

  
  // 注册插件
  plugins: [ //插件机制，注册到nuxtconfig中,运行 Vue.js 应用程序之前执行 js 插件
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}