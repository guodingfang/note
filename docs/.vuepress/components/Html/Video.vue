<template>
  <div>
    <video
      src="https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4"
      id="myVideo"
      autoplay
      preload="none"
      loop
      muted
      @pause="pause"
      @playing="playing"
    >
      很抱歉，您的浏览器不支持视频功能
    </video>
  </div>
</template>

<script>
  export default {
    mounted() {
      const video = document.getElementById("myVideo");
      // console.log('video', video)
      // video.play().then((res) => {
      //   console.log('res', res);
      // }).catch((error) => {
      //   console.log('error', error);
      // });
    },
    methods: {
      pause(e) {
        // console.log(e);
      },
      playing(e) {
        // console.log(e);
      }
    }
  }
</script>

<style lang="scss">
  video {
    width: 250px;
  }
</style>
