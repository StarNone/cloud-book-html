<template>
  <div>
    <router-view></router-view>
    <hzxTabbar />
  </div>
</template>

<script>
import hzxTabbar from '@/components/tab-bar'

export default {
  name: 'layout',
  components: {
    hzxTabbar
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
