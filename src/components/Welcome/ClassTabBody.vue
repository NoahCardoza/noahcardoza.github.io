<template lang="html">
  <div class="markdown-render">
    <span v-if="!fetchMarkdown.resolvedWithSomething">Loading...</span>
    <vue-markdown v-else v-if="" :source="fetchMarkdown.resolvedWith"
    :anchorAttributes="{
      target: '_blank',
      onclick:  `handleMarkdownLinks(this, '${cls.git}wk${paddWeek(cls.week)}/')`
    }"></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

const paddWeek = wk => (wk + '').padStart(2, '0')

const isUrlAbsolute = (url) =>
  (url.indexOf('://') > 0 || url.indexOf('//') === 0)

window.handleMarkdownLinks = function handleMarkdownLinks(el, base){
  const url = el.attributes.href.nodeValue
  if (!isUrlAbsolute(url)) {
    el.attributes.href.nodeValue = base + url
  }
}

const random = {
  choice: (list) =>
    list[Math.floor(Math.random() * list.length)]
}

const cacher = fn => {
  const cache = {}

  return (...args) => {
    if (!cache[args]) {
      cache[args] = fn(...args)
    }
    return cache[args]
  }
}

const fetchWithCache = cacher((url) => fetch(url).then(r => r.text()))

export default {
  name: 'class-tab-body',
  props: {
    cls: Object
  },
  components: {
    VueMarkdown
  },
  data(){
    return {
      markdown: null
    }
  },
  created(){
    if (process.env.NODE_ENV == "development") {
      window.v = this
    }

    this.fetchMarkdown()
  },
  asyncMethods: {
     fetchMarkdown(){
      const { cls } = this
      return fetchWithCache(cls.raw_git + 'wk' + paddWeek(cls.week) + '/README.md')
      .then(md => {
        this.$nextTick(() => {
          window.Prism.highlightAllUnder(this.$el)
        })
        return md
      })
    }
  },
  methods: {
    paddWeek
  }
}
</script>

<style lang="css">
</style>
