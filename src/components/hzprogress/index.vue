<template>
  <Progress :value="width"><div class="read" slot="end">已看{{parseInt(value)}}%</div></Progress>
</template>

<script>
import {Progress} from 'mint-ui'
export default {
  name: 'progress',
  components: {
    Progress
  },
  props: {
    value: Number
  },
  data () {
    return {
      width: 0
    }
  },
  methods: {
    sport () {
      let t = this.value / 12
      requestAnimationFrame(() => {
        if (this.width < this.value) {
          this.width += t
          this.sport()
        }
      })
    }
  },
  created () {
    this.sport()
  }
}
</script>

<style scoped>
.read {
  margin-left: 20px;
  widows: 100px;
}
</style>
