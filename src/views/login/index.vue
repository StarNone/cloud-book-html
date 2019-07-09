<template>
  <div class="container">
    <svg class="iconfont iconshuji" aria-hidden="true">
      <use xlink:href="#iconxuexi"></use>
    </svg>
    <div class="user-message">
      <div class="user">
        <div class="icon">
          <svg class="iconfont" aria-hidden="true">
            <use xlink:href="#icongerenzhongxin"></use>
          </svg>
        </div>
        <Field class="username" v-model="phone">
        </Field>
      </div>
      <div class="psw">
        <div class="icon">
          <svg class="iconfont" aria-hidden="true" @click="handleTranslate">
            <use class="hide-show" xlink:href="#iconyanjing"></use>
          </svg>
        </div>
        <Field class="password hide" type="password" v-model="password"></Field>
        <Field class="password show" type="text" v-model="password"></Field>
      </div>
    </div>
    <router-link class="register" :to="{name: 'register'}">没有账号？立即注册</router-link>
    <Button class="login" @click="handleLogin">立即登录</Button>
  </div>
</template>

<script>
import { Field, Button, Toast } from 'mint-ui'

export default {
  name: 'login',
  components: {
    Field,
    Button,
    Toast
  },
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    handleTranslate () {
      let icon = document.querySelector('.hide-show')
      let hide = document.querySelector('.hide')
      let show = document.querySelector('.show')
      icon.href.baseVal === '#iconyanjing' ? icon.href.baseVal = '#iconyanjing1' : icon.href.baseVal = '#iconyanjing'
      if (icon.href.baseVal === '#iconyanjing') {
        hide.style.visibility = 'visible'
        show.style.visibility = 'hidden'
      } else {
        hide.style.visibility = 'hidden'
        show.style.visibility = 'visible'
      }
    },
    handleLogin () {
      this.$axios.post(this.$api.Login, {
        phone: this.phone,
        password: this.password
      }).then(res => {
        if (res.code === 200) {
          console.log(res)
          let token = res.data.token
          Toast({
            message: '登陆成功',
            duration: 2000
          })
          sessionStorage.setItem('token', token)
          location.hash = 'person'
          history.go(0)
        } else {
          Toast({
            message: res.msg,
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../globalcss/px2.scss';

.container {

  .iconshuji {
    display: block;
    font-size: px2-to-rem(172);
    margin: 0 auto;
    margin-top: px2-to-rem(172);
  }

  .user-message {
    margin-top: px2-to-rem(88);

    .user {
      display: flex;
      border-bottom: 2px solid #0099ff;

      .icon {
        align-self: center;
        font-size: px2-to-rem(50);
        margin-left: px2-to-rem(24);
      }

      .username {
        flex: 1;
      }
    }

    .psw {
      display: flex;
      position: relative;
      border-bottom: 2px solid #0099ff;

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
        left: 37px;
        width: 320px;
        visibility: hidden;
      }
    }
  }
  .register {
    float: right;
    text-align: right;
    margin: px2-to-rem(42);
    font-size: px2-to-rem(26);
    color: #0099ff;
  }

  .login {
    width: 100%;
    margin-top: px2-to-rem(40);
    background: #26a2ff;
    color: #fff;
    font-size: px2-to-rem(36);
  }
}
</style>
