<template>
  <div>
    <video
      id="videoPlay"
      autoplay
      preload="none"
      loop
      muted
      width="250"
      src="https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4"
      @pause="pause"
      @playing="playing"
    >
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</template>

<script>
export default {
  mounted() {
    // const video = document.getElementById("videoPlay");
    // video.play().then((res) => {
    //   console.log('res', res);
    // }).catch((error) => {
    //   console.log('error', error);
    // });
  },
  methods: {
    pause(e) {
      // console.log('x',e);
    },
    playing(e) {
      // console.log('e', e);
    }
  }
}
</script>

<style lang="scss">

</style>
