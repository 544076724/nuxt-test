<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">test</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link class="nav-link" exact :class="{active:tab==='your_feed'}" :to="{name:'home',query:{tab:'your_feed'}}">
                  Your Feed
                </nuxt-link>

              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" exact :class="{active:tab==='global_feed'}" :to="{name:'home'}">
                  Global Feed
                </nuxt-link>

              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" :class="{active:tab==='tag'}" :to="{name:'home',query:{
                  tab:'tag',tag:tag}}">
                  #{{tag}}
                </nuxt-link>

              </li>
            </ul>
          </div>
          <div>
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
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{
                  active: item === page
                }" v-for="item in totalPage" :key="item">
                <nuxt-link class="page-link" :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- 分页 -->

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link :to="{name:'home',query:{
                tab:'tag',
                tag:item
              }}" v-for="item in tags" :key="item" class="tag-pill tag-default">{{item}}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {
  getArticles,
  addFavorite,
  deleteFavorite,
  getYourFeedArticles
} from "@/api/article"
import { getTags } from "@/api/tag"
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  async asyncData ({ query, store }) { //参数默认取地址栏
    // console.log(store.state.user)
    const page = Number.parseInt(query.page || 1)  //页码
    const limit = 20 //分页数
    const tab = query.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 'your_feed' ? getYourFeedArticles : getArticles
    const tag = query.tag   //标签名

    const [articleRes, tagRes] = await Promise.all([loadArticles({ //请求这俩
      limit,
      offset: (page - 1) * limit,
      tag
    }), getTags()])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    // console.log(tab)
    articles.forEach(article => article.favoriteDisabled = false) //默认都可以点击
    return {
      articles, //文章列表
      articlesCount, //文章总书
      page,//页码
      limit,//每页条数
      tab,//选项卡
      tags,//标签列表
      tag // 标签列表选中数据标签
    }
  },
  watchQuery: ['page', 'tab', 'tag'], //监听 query 参数改变，默认asyncData不会触发，用来构建分页组件
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
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