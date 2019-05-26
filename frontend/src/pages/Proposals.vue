<template>
  <div>
    <div class="banner">
      <img src="@/assets/banner.jpg">
      <div class="banner--button">
        Start a fundraising
      </div>
    </div>
    <div class="full">
      <PopProject/>
      <img
        src="@/assets/mockup-all-fund.png"
        class="mockup-all-fund"
      >
    </div>
  </div>
</template>

<script>
import PopProject from '@/components/PopProject'

export default {
  name: 'Proposals',
  components: {
    PopProject
  }
}
</script>

<style lang="scss" scoped>
.full {
  float: left;
  width: 100%;
}
.banner {
  float: left;
  width: 100%;
  position: relative;

  &--button {
    position: absolute;
    padding: 14px 25px;
    border-radius: 5px;
    border: solid 2px #ffffff;
    background: transparent;
    color: #fff;
    font-family: Avenir;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    left: 120px;
    bottom: 170px;
    cursor: pointer;
  }
}
.mockup-all-fund {
  cursor: pointer;
  width: 100%;
}
</style>

