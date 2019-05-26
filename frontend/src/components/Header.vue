<template>
  <div class="header-container">
    <div class="left">
      <img src="@/assets/ktr-logo.jpg" @click="$router.push({ name: 'Proposals' })">
    </div>
    <div class="right">
      <span>Home</span>
      <span>Explorer</span>
      <span>How it works</span>
      <span>
        <img src="@/assets/icon-search.svg">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.header-container {
  float: left;
  width: 100%;
  padding: 12px 7%;
  font-family: Avenir;
  font-size: 17px;
  font-weight: 900;
  color: #4e4e4e;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5);
}
.left {
  float: left;
  width: 50%;

  img {
    cursor: pointer;
  }
}
.right {
  float: right;
  width: 50%;
  text-align: right;
  font-weight: 900;
  line-height: 42px;

  span {
    margin-left: 10%;
    cursor: pointer;

    img {
      vertical-align: middle;
    }
  }

  span:hover {
    color: #43a047;
  }
}
</style>
