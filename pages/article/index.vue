<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <article-meta :article="article" :user="user" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <ul class="tag-list">
            <li class="tag-default tag-pill tag-outline" v-for="item in article.tagList">
              {{item}}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" :user="user" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <article-comments :article="article" />

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it' //解析markdown
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
import { mapState } from 'vuex'
export default {
  name: 'ArticleIndex',
  // middleware:['authenticated'],
  // middleware: 'authenticated',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  components: {
    ArticleMeta,
    ArticleComments
  },
  computed: {
    ...mapState(['user'])
  },
  head () { //meta标签优化  用来做seo  引擎爬虫搜索  hid 用来覆盖原来初始界面设置的 相同的 description
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  }
}
</script>

<style>
</style>