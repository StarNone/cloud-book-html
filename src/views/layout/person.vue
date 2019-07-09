<template>
  <div class="container">
    <div class="header">
      <div class="msg">
        <router-link class="status" :to="{name: 'login'}" v-if="!userMsg.phone">
          <h1>立即登录</h1>
          <span>时光回头，当下最重要</span>
        </router-link>
        <div class="user-msg" v-if="userMsg.phone">
          <h1 class="username">{{userMsg.nikname || userMsg.phone}}</h1>
          <span class="signature">{{userMsg.desc || '这个家伙很懒，整么都没有写'}}</span>
        </div>
        <div class="avanta">
          <img src="../../assets/avanta.jpg" v-if="!userMsg.phone" alt="">
          <img :src="userMsg.avatar || avatar" alt="" v-if="userMsg.phone">
          <svg class="iconfont" aria-hidden="true" v-if="!userMsg">
            <use xlink:href="#icongengduojiantou"></use>
          </svg>
        </div>
      </div>
      <div class="book-msg">
        <div class="read">
          <p>
            <font size="4px">{{userMsg.read || 0}}</font>本
          </p>
          <p>已读书籍</p>
        </div>
        <div class="collected">
          <p>
            <font size="4px">{{userMsg.collect || 0}}</font>本
          </p>
          <p>已收藏书籍</p>
        </div>
        <div class="like">
          <p>
            <font size="4px">{{userMsg.like || 0}}</font>本
          </p>
          <p>喜欢</p>
        </div>
      </div>
    </div>
    <div class="message">
      <router-link :to="{name: revise}" >
        <div class="person-msg">
          <svg class="iconfont one" aria-hidden="true">
            <use xlink:href="#iconxiugaigerenxinxi"></use>
          </svg>
          <p>修改个人信息</p>
        </div>
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icongengduojiantou"></use>
        </svg>
      </router-link>
      <router-link :to="{name: collect}">
        <div class="collected-book">
          <svg class="iconfont second" aria-hidden="true">
            <use xlink:href="#iconjiazhi"></use>
          </svg>
          <p>收藏书单</p>
        </div>
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icongengduojiantou"></use>
        </svg>
      </router-link>
      <router-link :to="{name: like}">
        <div class="like-book">
          <svg class="iconfont three" aria-hidden="true">
            <use xlink:href="#iconaihao-"></use>
          </svg>
          <p>喜欢的书</p>
        </div>
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icongengduojiantou"></use>
        </svg>
      </router-link>
    </div>
    <Button class="logout" type="danger" v-if="userMsg.phone" @click="handleLogout">退出登录</Button>
  </div>
</template>

<script>
import {Button} from 'mint-ui'
import avatar from '@/assets/avanta.jpg'

export default {
  name: 'person',
  components: {
    Button
  },
  data () {
    return {
      avatar,
      revise: 'person',
      collect: 'person',
      like: 'person'
    }
  },
  methods: {
    handleLogout () {
      sessionStorage.removeItem('token')
      this.$store.commit('CHANGE_USER_MSG', {})
      this.revise = 'person'
      this.collect = 'person'
      this.like = 'person'
    },
    getUserData () {
      if (sessionStorage.getItem('token')) {
        this.revise = 'revise'
        this.collect = 'collect'
        this.like = 'like'
        this.$store.dispatch('getUserMsg')
      }
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
@import "../../globalcss/px2";
.container {
  height: px2-to-rem(336);
  background: #186fc8;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: px2-to-rem(336);
    color: #fff;

    .msg {
      display: flex;
      position: relative;
      justify-content: space-between;

      .user-msg {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 15px;
        left: px2-to-rem(150);

        .username {
          font-size: px2-to-rem(48);
        }

        .signature {
          margin-top: px2-to-rem(24);
          margin-bottom: px2-to-rem(12);
        }
      }

      .status {
        display: flex;
        flex-direction: column;
        margin-top: px2-to-rem(30);
        margin-left: px2-to-rem(36);
        color: #fff;

        h1 {
          font-size: px2-to-rem(48);
        }

        span {
          margin-top: px2-to-rem(24);
        }
      }

      .avanta {
        display: flex;
        justify-content: space-evenly;
        margin-top: px2-to-rem(16);

        img {
          width: px2-to-rem(136);
          height: px2-to-rem(136);
          background: #ff0;
          border-radius: 50%;
        }

        .iconfont {
          align-self: center;
          font-size: 20px;
        }
      }
    }

    .book-msg {
      display: flex;
      justify-content: space-around;

      div > p {
        text-align: center;
        width: 70px;
      }

      .collected:before {
        content: "";
        position: absolute;
        left: 33%;
        top: 130px;
        bottom: auto;
        right: auto;
        height: 20px;
        width: 1px;
        background: #fff;
      }

      .collected:after {
        content: "";
        position: absolute;
        left: 67%;
        top: 130px;
        bottom: auto;
        right: auto;
        height: 20px;
        width: 1px;
        background: #fff;
      }
    }
  }

  .message {
    margin-top: 29px;

    a {
      display: flex;
      justify-content: space-between;

      .iconfont {
        align-self: center;
      }

      div {
        display: flex;
        height: px2-to-rem(130);
        line-height: px2-to-rem(130);

        p {
          color: #343333;
          font-size: 24px;
          font-weight: 500;
        }

        .iconfont {
          font-size: 38px;
        }

        .one {
          color: #0099ff;
        }

        .second {
          color: #fb8095;
        }

        .three {
          color: #f7d871;
        }
      }
    }
  }

  .logout {
    margin-top: px2-to-rem(120);
    width: 100%;
  }
}
</style>
