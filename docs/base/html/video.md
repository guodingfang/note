# video

**HTML `<video>`元素** 用于在HTML或者XHTML文档中嵌入媒体播放器，用于支持文档内的视频播放。也可以将`<video> `标签用于音频内容，但是`<audio>`元素可能在用户体验上更合适。[详情](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)



<Video-Basis />

在 `<video></video>` 标签中间的内容，是针对浏览器不支持此元素时候的降级处理。


### video使用注意事项

- 如果没有指定controls属性，那么视频不会展示浏览器自带的控件，也可以用JavaScript和`HTMLMediaElement`API来创建自己的控件。
- `HTMLMediaElement`会激活不同的事件，以便于可以控制视频（和音频）内容。
- 可以用CSS属性`object-position`来调整视频在元素内部的位置，它可以控制视频尺寸适用于元素外框的方式。
- 如果想在视频里展示字幕或者标题，可以在`<track>`元素和WebVTT格式的基础上使用JavaScript来实现。

### video属性

| 属性名 | 类型 | 说明 |
| --- | --- | --- |
| autoplay | Boolean | 指定后，视频会马上自动开始播放 |
| preload | String | 示意浏览器使用何种加载方式以达到最好的用户体验。可以是以下属性之一：<br />1. none：提示浏览器该视频不需要缓存<br />2. metadata：认为用户不需要查看该视频，不过抓取元数据（比如：长度）还是很合理的 <br />3. auto： 用户需要这个视频优先加载 <br /> 4. 空字符串: 也就代指 auto 值。 |
| controls | Boolean | 表示是否出现控制条 |
| loop | Boolean | 表示是否循环播放 |
| src | String | 指定播放的视频源 |
| width | Number | 指定视频宽度（通常在css中指定） |
| height | Number | 指定视频高度（通常在css中指定） |
| muted | Boolean | 指明了视频里的音频的默认设置。设置后，音频会初始化为静音。默认值是false，意味着视频播放的时候音频也会播放 。`设置后，便可以进行自动播放` |


### video事件

| 事件名 | 介绍 |
| ----- | ---- |
| play | 视频开始播放触发的事件（触发此事件，但是视频不一定可以播放） |
| playing | 视频可以播放触发的事件 |
| timeupdate | 音频/视频（audio/video）的播放位置发生改变时触发 |
| pause | 视频停止播放触发的事件 |
| ended | 视频播放结束或中断触发的事件 |


### 安卓情况下的问题

待补充...
