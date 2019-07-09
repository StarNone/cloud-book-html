<template>
  <div class="header">
    <Header fixed :title="$route.meta.title">
      <Button icon='back' @click="$router.back()" slot="left">返回</Button>
    </Header>
  </div>
</template>

<script>
import {Header, Button} from 'mint-ui'

export default {
  name: 'hzheader',
  components: {
    Header,
    Button
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
