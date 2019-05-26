<template>
  <div class="full">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.full {
  float: left;
  width: 100%;
}
</style>
