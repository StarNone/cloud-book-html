<template>
  <div class="container">
    <Field v-model="name" class="input"></Field>
    <p>更好的昵称能让你的朋友更容易记住你</p>
    <Button @click="handleChange">确认修改</Button>
  </div>
</template>

<script>
import {Field, Button, Toast} from 'mint-ui'

export default {
  name: 'nikename',
  components: {
    Field,
    Button,
    Toast
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    handleChange () {
      this.$axios.put(this.$api.changeUserMsg, {
        nikname: this.name
      }).then(res => {
        if (res.code === 200) {
          Toast({
            message: '昵称修改成功',
            duration: 1000
          })
          this.$router.push('/revise')
        }
      })
    }
  },
  created () {
    this.name = this.$store.state.userMsg.nikname || this.$store.state.userMsg.phone
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

p {
  margin-top: 10px;
  color: #0099ff;
}

Button {
  margin-top: 10px;
  width: 100%;
  background: #0099ff;
  color: #fff;
}
</style>
