<template>
  <div class="full">
    <div class="left">
      <img :src="imgBase64">
    </div>
    <div class="right">
      <div class="amount">
        ${{ amount | numberWithComma(2) }}
      </div>
      <div class="address">
        {{ address }}
      </div>
    </div>
  </div>
</template>

<script>
import Identicon from 'identicon.js'

export default {
  name: 'DonateItem',
  props: ['address', 'amount'],
  data () {
    return {
      imgBase64: ''
    }
  },
  mounted () {
    const data = new Identicon(this.address, 420).toString()
    this.imgBase64 = `data:image/png;base64,${data}`
  }
}
</script>

<style lang="scss" scoped>
.full {
  float: left;
  width: 100%;
  border-bottom: solid 1px #e5e5e5;
  padding: 25px 10px;

  .left {
    float: left;
    width: 70px;
    height: 70px;
    margin-right: 35px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .right {
    float: left;
    width: calc(100% - 70px - 35px);
    .amount {
      font-size: 18px;
      font-weight: 900;
      color: #000000;
    }
    .address {
      margin-top: 8px;
      font-size: 15px;
      color: #0559af;
    }
  }
}
</style>

