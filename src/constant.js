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
            if (this.status === 200 && this.readyState === 4) resolve({name:article_name, content:this.responseText})
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
  }
}