module.exports = {
  base: '/note/',
  dest: 'public',
  title: '笔记汇总',
  description: '笔记汇总——技术、书籍类',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    nav: require('./nav/index'),
    sidebar: require('./sidebar/index'),
    sidebarDepth: 2,
    smoothScroll: true,
  },

  // extraWatchFiles: [
  //   '.vuepress/nav/index.js'
  // ]
};
