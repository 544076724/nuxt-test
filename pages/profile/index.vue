<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="$router.push({name:'settings'})">
              <i class="ion-plus-round"></i>
              &nbsp;
              Edit Profile Settings
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">

                <nuxt-link class="nav-link" exact :class="{active:tab==='my_Articles'}" :to="{name:'profile',query:{tab:'my_Articles'}}">
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">

                <nuxt-link class="nav-link" exact :class="{active:tab==='Favorited_Articles'}" :to="{name:'profile',query:{tab:'Favorited_Articles'}}">
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }" class="author">
                  {{article.author.username}}
                </nuxt-link>
                <span class="date">{{ article.createdAt  | date('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
                  active: article.favorited
                }" :disabled="article.favoriteDisabled" @click="onFavorite(article)">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList">{{tag}}</li>

              </ul>
            </nuxt-link>
          </div>

          <div v-if="!articles.length" class="article-preview">
            暂无数据
          </div>
          <!-- 分页列表 -->
          <nav>

            <ul class="pagination">
              <li class="page-item" :class="{
                  active: item === page
                }" v-for="item in totalPage" :key="item">
                <nuxt-link class="page-link" :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab
                    }
                  }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- 分页 -->
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article"
export default {
  name: 'UserProfile',
  // middleware:['authenticated'],
  middleware: 'authenticated',
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  async asyncData ({ query, store }) {
    const tab = query.tab || 'my_Articles'
    const page = Number.parseInt(query.page || 1)  //页码
    const limit = 5 //分页数
    const reqQuery = {
      limit,
      offset: (page - 1) * limit,
    }
    const { username } = store.state.user
    if (tab === 'my_Articles') {
      reqQuery.author = username
    } else {
      reqQuery.favorited = username
    }
    const { data: { articles, articlesCount } } = await getArticles(reqQuery)
    console.log(articlesCount)
    return {
      tab,
      articles,
      articlesCount,
      page,
      limit
    }
  },
  watchQuery: ['page', 'tab'], //监听 query 参数改变，默认asyncData不会触发，用来构建分页组件
  methods: { //点赞功能
    async onFavorite (article) {
      article.favoriteDisabled = true  //点击禁用 防止重复点击
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1

      } else {
        //添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }

}
</script>

<style>
</style>