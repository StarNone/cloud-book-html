<template>
  <div class="container">
    <Loadmore :top-method="loadTop" ref="loadmore" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" :auto-fill="false">
      <div class="content-item-row2" v-for="(item, index) in likeData" :key="index">
        <div :to="{name: 'details', params: {id: item.book._id}}" class="content">
          <div class="img-wrap">
            <img :src="item.book.img" :alt="item.book.img">
          </div>
          <div class="article">
            <div class="article-title">
              {{item.book.title}}
            </div>
            <div class="article-preview">
              {{item.book.desc}}
            </div>
            <div class="article-msg">
              <div class="author">
                {{item.book.author}}
              </div>
              <div class="date">
                {{item.book.updateTime}}
              </div>
              <div class="looknum">
                {{item.book.looknums}}人在看
              </div>
            </div>
          </div>
          <div class="btns">
            <Button class="del" @click="handleDelete(item._id)" type="primary">删除</Button>
            <Button class="look" @click="handleLook(item.book._id)">查看</Button>
          </div>
        </div>
      </div>
    </Loadmore>
  </div>
</template>

<script>
import {Button, Loadmore, Toast} from 'mint-ui'
import moment from 'moment'

export default {
  name: 'like',
  components: {
    Button,
    Loadmore,
    Toast
  },
  data () {
    return {
      likeData: [],
      queryData: {
        pn: 1,
        booksSize: 2,
        size: 4
      },
      allLoaded: false
    }
  },
  methods: {
    getLike () {
      return new Promise((resolve) => {
        let _this = this
        this.$axios.get(this.$api.getLike, {
          params: this.queryData
        }).then(res => {
          let resData = res.data
          console.log(resData)
          resData = resData.map(item => {
            item.book.updateTime = moment(item.book.updateTime).format('YYYY年M月D日')
            return item
          })
          _this.likeData = [..._this.likeData, ...resData]
          console.log(_this.likeData)
          resolve()
        })
      })
    },
    loadTop () {
      this.queryData = {
        pn: this.queryData.pn + 1,
        booksSize: 2,
        size: 4
      }
      this.allLoaded = true
      this.getLike().then(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadBottom () {
      this.queryData = {
        pn: this.queryData.pn + 1,
        booksSize: 2,
        size: 4
      }
      this.allLoaded = false
      this.getLike().then(() => {
        this.$refs.loadmore.onBottomLoaded()
      })
    },
    handleLook (id) {
      this.$router.push({
        name: 'details',
        params: {
          id: id
        }
      })
    },
    handleDelete (id) {
      this.$axios.delete(this.$api.deleteLike + id).then(res => {
        if (res.code === 200) {
          Toast({
            message: res.msg,
            duration: 1000
          })
        } else {
          Toast({
            message: res.msg,
            duration: 1000
          })
        }
      })
    }
  },
  created () {
    this.getLike()
  }
}
</script>

<style scoped lang="scss">
@import '../../globalcss/px2.scss';
  .content-item-row2 {
    .content {
      margin-top: px2-to-rem(20);
      display: flex;
      justify-content: space-between;
      .img-wrap {
        width: px2-to-rem(200);
        height: px2-to-rem(260);
        img {
          height: 100%;
        }
      }
      .article {
        position: relative;
        flex: 1;
        margin-left: 9px;
        .article-title {
          font-size: 18px;
          font-weight: 500;
          color: #333;
        }
        .article-preview {
          margin-top: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 12px;
          color: #555;
          line-height: 1.5;
        }
        .article-msg {
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #555;
        }
      }

      .btns {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        button {
          font-size: 12px;
          border: 1px solid #fff;
          border-radius: 19px;
        }

        .look {
          background: #0099ff;
          color: #fff;
        }

        .del {
          background: #ff0044;
        }
      }
    }
  }
</style>
