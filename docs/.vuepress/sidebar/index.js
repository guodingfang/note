module.exports = {
  /**
   * web            技术笔记
   * --base         基础
   * --typescript   TS
   * --regex        RegExp
   * --react        react
   * --vue          vue
   * --wx_official_account       微信公众号
   * --wx_mini_program           微信小程序
   */
  '/base/': require('./web/base'),
  '/typescript/': require('./web/typescript'),
  '/regex/': require('./web/regex'),
  '/react/': require('./web/react'),
  '/vue/': require('./web/vue'),
  '/wx_official_account/': require('./web/wx_official_account'),
  '/wx_mini_program/': require('./web/wx_mini_program'),

  /**
   * project        前端工程
   * sass
   * less
   * gulp
   * npm
   * webpack
   * babel
   * git
   */
  '/sass/': require('./project/sass'),
  '/less/': require('./project/less'),
  '/gulp/': require('./project/gulp'),
  '/npm/': require('./project/npm'),
  '/webpack/': require('./project/webpack'),
  '/babel/': require('./project/babel'),
  '/git/': require('./project/git'),

  /**
   * nodejs         nodejs
   * --koa2         Koa2
   * --express      Express
   * --mongodb      MongoDB
   * --redis        Redis
   */
  '/nodejs/': require('./nodejs/nodejs'),
  '/koa2/': require('./nodejs/koa2'),
  '/express/': require('./nodejs/express'),
  '/mongodb/': require('./nodejs/mongodb'),
  '/redis/': require('./nodejs/redis'),

  /**
   * frame              应用框架
   * --ant_design_pro   AntDesignPro
   * --react_native     ReactNative
   */
  '/ant_design_pro/': require('./frame/ant_design_pro'),
  '/react_native/': require('./frame/react_native'),

};
