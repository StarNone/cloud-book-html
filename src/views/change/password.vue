<template>
  <div class="container">
    <div class="psw">
      <p>原密码：</p>
      <Field class="password hide h1" type="password" v-model="formData.password" placeholder="请输入原密码"></Field>
      <Field class="password show s1" type="text" v-model="formData.password" placeholder="请输入原密码"></Field>
      <div class="icon">
        <svg class="iconfont" aria-hidden="true" @click="handleTranslate('.h1' ,'.s1' , '.i1')">
          <use class="hide-show i1" xlink:href="#iconyanjing"></use>
        </svg>
      </div>
    </div>
    <div class="psw">
      <p>新密码：</p>
      <Field class="password hide h2" type="password" v-model="formData.changePassword" placeholder="请输入新密码"></Field>
      <Field class="password show s2" type="text" v-model="formData.changePassword" placeholder="请输入新密码"></Field>
      <div class="icon">
        <svg class="iconfont" aria-hidden="true" @click="handleTranslate('.h2', '.s2', '.i2')">
          <use class="hide-show i2" xlink:href="#iconyanjing"></use>
        </svg>
      </div>
    </div>
    <Button @click="handleChange">确认修改</Button>
  </div>
</template>

<script>
import {Field, Button, Toast} from 'mint-ui'

export default {
  name: 'password',
  components: {
    Field,
    Button,
    Toast
  },
  data () {
    return {
      formData: {
        password: '',
        changePassword: ''
      }
    }
  },
  methods: {
    handleTranslate (h, s, i) {
      let icon = document.querySelector(i)
      let hide = document.querySelector(h)
      let show = document.querySelector(s)
      icon.href.baseVal === '#iconyanjing' ? icon.href.baseVal = '#iconyanjing1' : icon.href.baseVal = '#iconyanjing'
      if (icon.href.baseVal === '#iconyanjing') {
        hide.style.visibility = 'visible'
        show.style.visibility = 'hidden'
      } else {
        hide.style.visibility = 'hidden'
        show.style.visibility = 'visible'
      }
    },
    handleChange () {
      this.$axios.post(this.$api.changePassword, this.formData).then(res => {
        if (res.code === 200) {
          Toast({
            message: '密码修改成功,请重新登录',
            duration: 1000
          })
          sessionStorage.removeItem('token')
          this.$store.commit('CHANGE_USER_MSG', {})
          this.$router.push('/login')
        } else {
          Toast({
            message: res.msg,
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.psw {
  display: flex;
  position: relative;
  border-bottom: 2px solid #0099ff;

  p {
    align-self: center;
  }

  .icon {
    align-self: center;
    font-size: px2-to-rem(50);
    margin-left: px2-to-rem(24);
  }

  .password {
    flex: 1;
  }

  .show {
    position: absolute;
    top: 0px;
    left: 56px;
    width: 280px;
    visibility: hidden;
  }
}

Button {
  width: 100%;
  background: #0099ff;
  color: #fff;
  margin-top: 20px;
}
</style>
