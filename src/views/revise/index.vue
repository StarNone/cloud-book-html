<template>
  <div class="container">
    <hz-upload class="avanta upload" @success="changeAvanta">
      <p>头像</p>
      <div class="avanta-item">
        <img class="avanta-img" :src="userMsg.avatar || avatar" alt="">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icongengduojiantou"></use>
        </svg>
      </div>
    </hz-upload>
    <router-link :to="{name: 'nikename'}" class="name upload">
      <p>昵称</p>
      <div class="name-item">
        <p>{{userMsg.nikname || userMsg.phone}}</p>
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icongengduojiantou"></use>
        </svg>
      </div>
    </router-link>
    <router-link :to="{name: 'changedesc'}" class="signature upload">
      <p style="width: 80px">个性签名:</p>
      <div class="signature-item">
        <p>{{userMsg.desc || '这个家伙很懒，什么都没写'}}</p>
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icongengduojiantou"></use>
        </svg>
      </div>
    </router-link>
    <router-link :to="{name: 'changepsw'}" class="revise-psw upload">
      <p>修改密码</p>
      <div class="revise-item">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icongengduojiantou"></use>
        </svg>
      </div>
    </router-link>
  </div>
</template>

<script>
import avatar from '@/assets/avanta.jpg'
import hzUpload from '@/components/hzupload'
import {Toast} from 'mint-ui'

export default {
  name: 'revise',
  components: {
    hzUpload
  },
  data () {
    return {
      avatar
    }
  },
  methods: {
    getUserData () {
      if (sessionStorage.getItem('token')) {
        this.$store.dispatch('getUserMsg')
      }
    },
    changeAvanta (url) {
      url = url.replace('https', 'http')
      this.$axios.put(this.$api.changeUserMsg, {avatar: url}).then(res => {
        if (res.code === 200) {
          Toast({
            message: '头像更换成功'
          })
          this.$store.dispatch('getUserMsg')
        }
      })
    }
  },
  created () {
    this.getUserData()
  },
  computed: {
    userMsg () {
      return this.$store.state.userMsg
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../globalcss/px2';

.container {
  padding-top: 0;

  p{
    align-self: center;
    font-size: px2-to-rem(28);
    color: #555;
  }

  .upload {
    display: flex;
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid #eee;

    div {
      display: flex;
      border: none;

      img {
        width: px2-to-rem(120);
        height: px2-to-rem(120);
        border-radius: 50%;
      }

      .iconfont {
        display: flex;
        align-self: center;
        color: #555;
        margin-left: px2-to-rem(10);
      }
    }
  }

  .avanta {
    padding: px2-to-rem(20) 0;
  }
}
</style>
