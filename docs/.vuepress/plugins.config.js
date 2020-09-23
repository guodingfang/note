module.exports = [
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        // 不要忘了安装 moment
        const moment = require('moment')
        moment.locale(lang)
        return moment(timestamp).format('YYYY-MM-DD hh:mm:ss')
      }
    }
  ]
];
