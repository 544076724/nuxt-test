<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: currentArticle.author.username
      }
    }">
      <img :src="currentArticle.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: currentArticle.author.username
        }
      }">
        {{ currentArticle.author.username }}
      </nuxt-link>
      <span class="date">{{ currentArticle.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="user&&user.username === currentArticle.author.username">
      <nuxt-link class="btn btn-sm btn-outline-secondary" :to="{name:'editor',params:{
        slug:currentArticle.slug
      }}">
        <i class="ion-edit"></i>
        &nbsp;
        Edit Post
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm" :disabled="isDelete" @click.prevent="deletePost()">
        <i class="ion-trash-a"></i> Delete Post
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" :class="{
        active: currentArticle.author.following
      }" @click.prevent="followOrCancelUser()">
        <i class="ion-plus-round"></i>
        &nbsp;
        <template v-if="!currentArticle.author.following">
          Follow
        </template>
        <template v-else>
          unfollow
        </template>
        <span class="counter">{{currentArticle.author.username}}</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{
        active: currentArticle.favorited
      }" @click.prevent="favoritedOrCancelPost()">
        <i class="ion-heart"></i>
        &nbsp;
        <template v-if="!currentArticle.favorited">
          Favorite Post
        </template>
        <template v-else>
          unFavorite Post
        </template>
        <span class="counter">({{currentArticle.favoritesCount}})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { axiosFollowOrCancelUser } from '@/api/user'
import { axiosFavoriteOrCanelPost, axiosDeletePost } from '@/api/article'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    },
    user: {
      type: Object
    }
  },
  data () {
    return {
      currentArticle: this.article, isDelete: false
    }
  },
  methods: {
    async followOrCancelUser () {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      let type = this.currentArticle.author.following ? 'cancel' : 'follow'
      const { data } = await axiosFollowOrCancelUser(type, this.currentArticle.author.username)
      this.currentArticle.author.following = data.profile.following
    },
    async favoritedOrCancelPost () {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      let type = this.currentArticle.favorited ? 'cancel' : 'favorited'
      const { data } = await axiosFavoriteOrCanelPost(type, this.currentArticle.slug)
      this.currentArticle.favorited = data.article.favorited
      this.currentArticle.favoritesCount = data.article.favoritesCount
    },
    async deletePost () {
      this.isDelete = true
      const { data } = await axiosDeletePost(this.currentArticle.slug)
      this.$router.push('/')
    },
  }
}
</script>

<style>
</style>
