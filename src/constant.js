import md from 'markdown-it'

export default {
  install: function (Vue) {
    // markdown parser
    Vue.prototype.$markdown = new md()

    // ajax function
    Vue.prototype.$get = function (url) {
      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
          if (this.status === 200 && this.readyState === 4) resolve(this.responseText)
          else if (this.readyState === 4) reject(`Fetching ${url} failed`)
        }
        xhr.send()
      })
    }
    // get md content
    Vue.prototype.$getArticles = function (names) {
      const ajax = function (article_name) {
        return new Promise(function (resolve, reject) {
          const xhr = new XMLHttpRequest()
          xhr.open('GET', `./doc/${article_name}.md`)
          xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) resolve({ name: article_name, content: this.responseText })
            else if (this.readyState === 4) reject()
          }
          xhr.send()
        })
      }

      const promises = []

      for (let name of names) {
        promises.push(ajax(name))
      }

      return Promise.all(promises)
    }
    // generate tags
    Vue.prototype.$getTags = function () {
      const tags_map = {}
      const tag_lists = []
      this.$store.state.lists.articles.forEach(a => {
        if (Array.isArray(a.tags)) {
          a.tags.forEach(t => {
            if (tags_map[t] === undefined) tags_map[t] = 0
            tags_map[t] += 1
          })
        }
      })

      for (let k in tags_map) {
        tag_lists.push(k)
      }

      this.$store.commit('setTags', tag_lists)
      this.$store.commit('setTagsCount', tags_map)
    }
    // get articles + get previews
    Vue.prototype.$getPreviews = function (num) {
      const table = {}
      const start = this.$store.state.previews.length
      const end = this.$store.state.previews.length + num
      const articles_names = this.$store.state.lists.articles
        .sort((a, b) => Boolean(b.pinned) - Boolean(a.pinned))
        .map(a => {
          if (table[a.name]) throw 'article list name conflict.'
          table[a.name] = a
          return a.name
        }).slice(start, end)
      this.$getArticles(articles_names).then(raws => {
        this.$store.commit('addPreviews', raws.map(r => {
          const content_ary = r.content.split('\n').filter(str => str.trim() != '')
          const paragraph = content_ary.slice(1, 1 + this.$store.state.settings.PREVIEW_LINE).join('\n')
          const metadata = table[r.name]
          const tags = metadata.tags || []
          return { // previews
            name: r.name,
            pinned: metadata.pinned,
            image: metadata.image,
            tags: tags.sort(),
            content: this.$markdown.render(paragraph) + '</br>',
            date: new Date(metadata.date),
            title: content_ary[0].slice(-(content_ary[0].length - 2))
          }
        }))
      }).catch(e => {
        window.console.error(e)
      })
    }
  }
}
