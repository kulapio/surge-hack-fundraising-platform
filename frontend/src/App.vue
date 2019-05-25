<template>
  <div class="full">
    <Header/>
    <div class="banner">
      <img src="@/assets/banner.jpg">
      <div class="banner--button">
        Start a fundraising
      </div>
    </div>
    <PopProject/>
    <img
      src="@/assets/mockup-all-fund.png"
      class="mockup-all-fund"
    >
  </div>
</template>

<script>
import Header from '@/components/Header'
import PopProject from '@/components/PopProject'

export default {
  name: 'app',
  components: {
    Header,
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
