<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="putAxiosUser" v-if="user">
            <fieldset :disabled="isDisabled">
              <fieldset class="form-group">
                <input :value="user.image" @change="updateVuexUser({
                  type:'image',
                  value:$event.target.value
                })" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input :value="user.username" @change="updateVuexUser({
                  type:'username',
                  value:$event.target.value
                })" required class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea :value="user.bio" @change="updateVuexUser({
                  type:'bio',
                  value:$event.target.value
                })" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input :value="user.email" @change="updateVuexUser({
                  type:'email',
                  value:$event.target.value
                })" required class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout()">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import { putUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'SettingsIndex',
  // middleware:['authenticated'],
  middleware: 'authenticated',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      password: '',
      isDisabled: false,
    }
  },
  methods: {
    ...mapMutations(['updateVuexUser']),
    async putAxiosUser () {
      this.isDisabled = true
      const { bio, email, image, username } = this.user;
      const user = { bio, email, image, username };
      this.password && (user.password = this.password)
      const { data } = await putUser({ user })
      Cookie.set('user', data.user) //防止界面刷新丢失,储存cookie 持久化
      this.$router.push({
        name: 'profile', params: {
          username: username
        }
      }) //登陆个人页
    },
    logout () {//退出

      this.$store.commit('setUser', null)
      Cookie.set('user', null) //防止界面刷新丢失,储存cookie 持久化
      this.$router.push('/') //登陆成功跳转首页
    }
  }
}
</script>

<style>
</style>