module.exports = [
  {
    text: '首页',
    link: '/'
  }, {
    text: '前端基础',
    items: [{
      text: 'HTML超文本',
      items: [{
        text: 'HTML（基础）',
        link: '/basics/html/'
      }, {
        text: 'canvas',
        link: '/basics/canvas/'
      }]
    }, {
      text: 'CSS世界',
      items: [{
        text: 'CSS（基础）',
        link: '/basics/css/'
      }, {
        text: 'Sass',
        link: '/basics/sass/'
      }, {
        text: 'Less',
        link: '/basics/less/'
      }]
    }, {
      text: 'ECMAScript',
      items: [{
        text: 'JS（基础）',
        link: '/basics/js/'
      }, {
        text: '正则表达式',
        link: '/basics/regex/'
      }, {
        text: 'TypeScript',
        link: '/basics/typescript/'
      }]
    }]
  }, {
    text: '框架',
    items: [{
      text: 'React',
      items: [{
        text: 'react',
        link: '/react/'
      }, {
        text: '路由',
        link: '/react-router/'
      }, {
        text: 'redux',
        link: '/redux/'
      }, {
        text: '构建工具',
        link: '/react-cli/'
      }, {
        text: '插件',
        link: '/react-plugin/'
      }]
    }, {
      text: 'Vue',
      items: [{
        text: 'vue',
        link: '/vue/'
      }, {
        text: '路由',
        link: '/vue-router/'
      }, {
        text: 'vuex',
        link: '/vuex/'
      }, {
        text: '构建工具',
        link: '/vue-cli/'
      }, {
        text: '插件',
        link: '/vue-plugin/'
      }]
    }]
  }, {
    text: '前端工程',
    items: [{
      text: 'Gulp',
      link: '/gulp/'
    }, {
      text: 'Npm',
      link: '/npm/',
    }, {
      text: 'Webpack',
      link: '/webpack/'
    }, {
      text: 'Babel',
      link: '/babel/'
    }, {
      text: 'Git',
      link: '/git/'
    }]
  }, {
    text: 'nodejs开发',
    items: [{
      text: 'NodeJs',
      link: '/nodejs/'
    }, {
      text: 'Koa2',
      link: '/koa2/'
    }, {
      text: 'Express',
      link: '/express/'
    }, {
      text: 'MongoDB',
      link: '/mongodb/'
    }, {
      text: 'Redis',
      link: '/redis/'
    }]
  }, {
    text: '微信开发',
    items: [{
      text: '微信公众号',
      link: '/account/'
    }, {
      text: '微信小程序',
      link: '/miniprogram/'
    }]
  }, {
    text: '应用框架',
    items: [{
      text: 'egg',
      link: '/egg/'
    }]
  }
];
