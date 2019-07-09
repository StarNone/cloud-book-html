<template>
  <div>
    <router-view></router-view>
    <hzHeader></hzHeader>
  </div>
</template>

<script>
import hzHeader from '../../components/hzheader'

export default {
  name: 'header',
  components: {
    hzHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 40px;
}
</style>
