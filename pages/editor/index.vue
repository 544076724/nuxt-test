<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="newAndPutArticles()">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" v-model="article.body" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" v-model="article.tagList" placeholder="Enter tags">
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { newOrPutArticle, axiosGetPost } from '@/api/article'
export default {
  name: 'EditorIndex',
  // middleware:['authenticated'],
  middleware: 'authenticated',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: ''
      }
    }
  },
  async created () {
    if (this.$route.params.slug) {
      const { data: { article } } = await axiosGetPost(this.$route.params.slug)

      Object.keys(this.article).forEach(item => {
        if (item !== 'tagList') {
          this.article[item] = article[item];
        } else {
          this.article[item] = article[item].join(',');
        }
      })
    }
  },
  methods: {
    async newAndPutArticles () {
      
      const { data } = await newOrPutArticle(this.$route.params.slug, {
        article: { ...this.article, tagList: this.article.tagList.split(',') },
      })
      this.$router.push({
        name: 'article', params: {
          slug: data.article.slug,
        }
      })
    }
  }
}
</script>

<style>
</style>