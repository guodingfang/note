<template>
  <div>
    <audio
      id="audioPlay"
      controls
    >
      Your browser does not support the audio element.
    </audio>

    <div class="btn-play" @click="play">播放</div>
  </div>
</template>

<script>
  export default {
    mounted() {
      const audioPlay = document.getElementById('audioPlay');
      audioPlay.src = 'https://www.w3school.com.cn/i/horse.ogg';
    },
    methods: {
      play() {
        const audioPlay = document.getElementById('audioPlay');
        audioPlay.play();
      }
    }
  }
</script>

<style lang="scss">
  .btn-play {
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    line-height: 2.4;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    touch-action: manipulation;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: rgba(56, 137, 255, 0.9);
    }
  }
</style>
