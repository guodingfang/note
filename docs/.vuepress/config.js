module.exports = {
  base: '/note/',
  dest: 'public',
  title: '技术笔记汇总',
  description: '技术笔记汇总',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: require('./configs/index'),
  plugins: require('./plugins.config'),
  extraWatchFiles: [
    '.vuepress/configs/'
  ]
}
