
module.exports = [{
  title: '基础',
  collapsable: false,
  path: '',
}, {
  title: 'HTML',
  collapsable: false,
  children: [{
    title: 'HTML语义化',
    path: 'html/semantically'
  }, {
    title: 'canvas（2d、3d）',
    path: 'html/canvas',
  }, {
    title: 'svg',
    path: 'html/svg',
  }, {
    title: 'video',
    path: 'html/video',
  }, {
    title: 'audio',
    path: 'html/audio',
  }, {
    title: '其他H5特性',
    path: 'html/other',
  }]
}, {
  title: 'CSS',
  path: 'css'
}, {
  title: 'js',
  collapsable: false,
  children: [{
    title: 'this指向',
  }]
}];
