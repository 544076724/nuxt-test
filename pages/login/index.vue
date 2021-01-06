<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center"> {{isLogin ? 'Sign In' :'Sign up'}}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(item,index) in messages" :key="index">{{field}}:{{item}}</li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" minlength="8" type="password" required placeholder="Password" v-model="user.password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isDisabled">
              {{isLogin ? 'Sign In' :'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, registration } from '@/api/user.js'
//客户端加载js-cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'LoginIndex',
  // middleware:['authenticated'],
  middleware: 'notAuthenticated',
  data () {
    return {
      user: {
        username: '',
        email: '15350857767@163.com',
        password: '15350857767',
      },
      isDisabled: false,
      errors: {
        // '错误':['1','2','3']
      } //接口错误信息
    }
  },
  computed: {
    isLogin () {//区分 是登陆还是注册
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit () {//提交表单登陆
      this.isDisabled = true
      let interfaceData = { user: this.user }
      try {
        const { data } = this.isLogin ? await login(interfaceData) : await registration(interfaceData)
        this.$store.commit('setUser', data.user) //储存状态到vuex中
        Cookie.set('user', data.user) //防止界面刷新丢失,储存cookie 持久化
        this.$router.push('/') //登陆成功跳转首页
      } catch (error) {
        this.errors = error.response.data.errors
        this.isDisabled = false
      }
    }
  }
}
</script>

<style>
</style>