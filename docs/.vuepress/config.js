module.exports = {
  base: '/note/',
  dest: 'public',
  title: '技术笔记汇总',
  description: '技术笔记汇总',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    nav: require('./nav/index'),
    sidebar: require('./sidebar/index'),
    sidebarDepth: 2,
    smoothScroll: true,
    editLinks: true,
  },

  extraWatchFiles: [
    '.vuepress/nav/index.js'
  ]
};
