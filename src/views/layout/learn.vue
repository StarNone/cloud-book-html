<template>
  <div class="container">
    <div class="content-item" v-for="(item, index) in readData" :key="index">
      <div class="image">
        <img :src="item.book.img" alt="">
      </div>
      <div class="content">
        <p class="title">{{item.book.title}}</p>
        <p class="list">书籍{{item.title.index + 1}}/{{item.title.total}}章节</p>
        <div class="jindutiao">
          <Progress :value="(item.title.index + 1)/item.title.total*100"></Progress>
        </div>
        <div class="last-read">
          <p class="read">上次查看：{{item.title.title}}</p>
          <beforeTime class="time" :value="item.updateTime"></beforeTime>
        </div>
        <div class="btns">
          <Button class="btn1" size="small" @click="handleRead(item.title._id)">继续阅读</Button>
          <Button class="btn2" size="small" @click="handleLook(item.book._id)">查看文档</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Button} from 'mint-ui'
import Progress from '@/components/hzprogress'
import beforeTime from '@/components/before-time'

export default {
  name: 'learn',
  components: {
    Button,
    Progress,
    beforeTime
  },
  data () {
    return {
      readData: []
    }
  },
  methods: {
    handleRead (id) {
      this.$router.push({
        name: 'article',
        params: {
          id: id
        }
      })
    },
    handleLook (id) {
      this.$router.push({
        name: 'details',
        params: {
          id: id
        }
      })
    }
  },
  created () {
    let token = sessionStorage.getItem('token')
    if (token) {
      let _this = this
      this.$axios.get(this.$api.getReadlist, {
        params: {
          pn: 1,
          size: 4
        }}).then(res => {
        _this.readData = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../globalcss/px2';

.content-item {
  margin-top: px2-to-rem(20);
  display: flex;
  justify-content: space-between;

  .image {
    width: px2-to-rem(200);
    height: px2-to-rem(266);
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .5);

    img {
      height: 100%;
    }
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    margin-left: 9px;

    .title {
      font-size: px2-to-rem(32);
      font-weight: 500;
      height: 30px;
    }

    .list {
      font-size: px2-to-rem(24);
      color: #888;
    }

    .jindutiao {
      font-size: px2-to-rem(24);
      color: #888;

      .read {
        margin-left: 10px;
        width: 50px;
      }
    }

    .last-read {
      display: flex;
      justify-content: space-between;
      font-size: px2-to-rem(16);
      height: 30px;
      color: #888;

      .read {
        display: -webkit-box;
        width: 206px;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .btns {
      display: flex;
      justify-content: space-around;

      Button {
        font-size: px2-to-rem(28);
        color: #000;
        height: px2-to-rem(38);
      }
    }
  }
}
.container {
  padding-bottom: 60px;
}
</style>
