<template>
  <div class="container">
    <svg class="iconfont iconlogo" aria-hidden="true">
      <use xlink:href="#iconxuexi"></use>
    </svg>
    <div class="register-msg">
      <div class="iphone">
        <svg class="iconfont icon" aria-hidden="true">
          <use xlink:href="#iconshouji"></use>
        </svg>
        <Field class="userphone" v-model="phone"></Field>
      </div>
      <div class="psw">
        <svg class="iconfont icon" aria-hidden="true" @click="handleTranslate">
          <use class="hide-show" xlink:href="#iconyanjing"></use>
        </svg>
        <Field class="password hide" type="password" v-model="password"></Field>
        <Field class="password show" type="text" v-model="password"></Field>
      </div>
      <div class="cpa">
        <svg class="iconfont icon" aria-hidden="true">
          <use xlink:href="#iconweibiaoti-"></use>
        </svg>
        <Field class="captcha" v-model="code">
          <Button class="gain" @click="handleGain">获取验证码</Button>
        </Field>
      </div>
    </div>
    <Button class="register" @click="handleRegister">立即注册</Button>
  </div>
</template>

<script>
import {Field, Button, Toast} from 'mint-ui'

export default {
  name: 'register',
  components: {
    Field,
    Button,
    Toast
  },
  data () {
    return {
      second: 60,
      phone: '',
      password: '',
      code: ''
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
    handleGain () {
      let btn = document.querySelector('.gain')
      let second = this.second
      console.log(btn.innerText)
      this.$axios.post(this.$api.getCode, {phone: this.phone}).then(res => {
        if (res.code === 200) {
          Countdown()
          Toast({
            message: res.msg,
            duration: 2000
          })
        } else {
          Toast({
            message: res.msg,
            duration: 2000
          })
        }
      })
      function Countdown () {
        if (second >= 0) {
          btn.disabled = true
          setTimeout(() => {
            console.log(second)
            btn.innerText = `重新发送${second--}`
            Countdown()
          }, 1000)
        } else {
          btn.innerText = '获取验证码'
          btn.disabled = false
        }
      }
    },
    handleRegister () {
      this.$axios.post(this.$api.Register, {
        phone: this.phone,
        password: this.password,
        code: this.code
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          Toast({
            message: res.msg,
            duration: 2000
          })
          location.hash = 'login'
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
@import '../../globalcss/px2';
.container {

  .iconlogo {
    display: block;
    font-size: px2-to-rem(172);
    margin: 0 auto;
    margin-top: px2-to-rem(172);
  }

  .register-msg {
    margin-top: px2-to-rem(88);

    .iphone {
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
        color: #555;
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

  .cpa {
    display: flex;
    border-bottom: 2px solid #0099ff;

    .icon {
      align-self: center;
      font-size: px2-to-rem(50);
      margin-left: px2-to-rem(24);
    }

    .gain {
      font-size: px2-ton-rem(26);
    }
    .captcha {
      flex: 1;
    }
  }

  .register {
    width: 100%;
    margin-top: px2-to-rem(50);
    background: #26a2ff;
    color: #fff;
    font-size: px2-to-rem(36);
  }
}
</style>
