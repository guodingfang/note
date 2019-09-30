module.exports = {
  /**
   * web            技术笔记
   * --base         基础
   * --frame        框架
   * --project      前端工程
   * --nodejs       nodejs
   * --weixin       微信开发
   * --unify        多端统一
   */
  '/base/': require('./web/base'),
  '/frame/': require('./web/frame'),
  '/project/': require('./web/project'),
  '/nodejs/': require('./web/nodejs'),
  '/weixin/': require('./web/weixin'),
  '/unify/': require('./web/unify'),

  /**
   * finances       理财知识
   * --fund         基金
   * --stock        股票
   * --cb           可转债
   */
  '/fund/': require('./finances/fund'),
  '/stock/': require('./finances/stock'),
  '/cb/': require('./finances/cb'),

  /**
   * book           书籍笔记
   * --thought      思想类
   * --biography    传记类
   * --investment   投资类
   * --letter       文学类
   * --tool         工具类
   */
  '/thought/': require('./book/thought'),
  '/biography/': require('./book/biography'),
  '/investment/': require('./book/investment'),
  '/letter/': require('./book/letter'),
  '/tool/': require('./book/tool'),
};
