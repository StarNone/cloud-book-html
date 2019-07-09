<template>
  <div class="container">
    <Field v-model="desc" class="input"></Field>
    <Button @click="handleChange">确认修改</Button>
  </div>
</template>

<script>
import {Field, Button, Toast} from 'mint-ui'

export default {
  name: 'desc',
  components: {
    Field,
    Button,
    Toast
  },
  data () {
    return {
      desc: ''
    }
  },
  methods: {
    handleChange () {
      this.$axios.put(this.$api.changeUserMsg, {
        desc: this.desc
      }).then(res => {
        if (res.code === 200) {
          Toast({
            message: '个性签名修改成功',
            duration: 1000
          })
          this.$router.push('/revise')
        }
      })
    }
  },
  created () {
    this.desc = this.$store.state.userMsg.desc
  },
  computed: {
    userMsg () {
      return this.$store.state.userMsg
    }
  }
}
</script>

<style scoped lang="scss">
.input {
  border-bottom: 2px solid #0099ff;
}

Button {
  margin-top: 20px;
  width: 100%;
  background: #0099ff;
  color: #fff;
}

</style>
