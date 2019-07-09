<template>
  <span>{{currentText}}</span>
</template>

<script>
export default {
  name: 'beforeTime',
  props: {
    value: [String, Number]
  },
  data () {
    return {
      currentText: '',
      currentDate: new Date(),
      oldDate: null
    }
  },
  methods: {
    handelComputed () {
      this.oldDate = new Date(this.value)
      const oldTime = this.oldDate.getTime() // 获取服务器给我们的unix时间戳
      const currentTime = this.currentDate.getTime() // 获取本地的unix时间戳
      const reduceTime = currentTime - oldTime
      const date = new Date()
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      const zeroTime = date.getTime()

      if ((reduceTime / (1000 * 60 * 60)) < 1) {
        this.currentText = `${Math.round(reduceTime / (1000 * 60))}分钟前`
      } else if ((currentTime - zeroTime) / (1000 * 60 * 60) >= 1 && (zeroTime - oldTime) < 0) {
        this.currentText = `${Math.round(reduceTime / (1000 * 60 * 60))} 小时前`
      } else if ((zeroTime - oldTime) >= 0 && reduceTime / (1000 * 60 * 60 * 24 * 31) < 1) {
        this.currentText = `${Math.round(reduceTime / (1000 * 60 * 60 * 24))}天前`
      } else {
        this.currentText = `${Math.round(reduceTime / (1000 * 60 * 60 * 24 * 30))}月前`
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.handelComputed()
      }
    }
  }
}
</script>

<style scoped>

</style>
