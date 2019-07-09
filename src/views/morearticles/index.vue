<template>
  <div class="container">
    <Loadmore :top-method="loadTop" ref="loadmore" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" :auto-fill="false">
      <div class="content-item-row2" v-for="(item, index) in contentData" :key="index">
        <router-link :to="{name: 'details', params: {id: item._id}}" class="content">
          <div class="img-wrap">
            <img :src="item.img" :alt="item.img">
          </div>
          <div class="article">
            <div class="article-title">
              {{item.title}}
            </div>
            <div class="article-preview">
              {{item.desc}}
            </div>
            <div class="article-msg">
              <div class="author">
                {{item.author}}
              </div>
              <div class="date">
                {{item.updateTime}}
              </div>
              <div class="looknum">
                {{item.looknums}}人在看
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </Loadmore>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
import moment from 'moment'

export default {
  name: 'morearticles',
  components: {
    Loadmore
  },
  data () {
    return {
      contentData: [],
      queryData: {
        pn: 1,
        booksSize: 2,
        size: 5
      },
      allLoaded: false
    }
  },
  methods: {
    getContent () {
      return new Promise((resolve) => {
        let id = this.$route.params.id
        let _this = this
        this.$axios.get(this.$api.getCategory + id + '/books', {
          params: this.queryData
        }).then(res => {
          console.log(res)
          let resData = res.data
          resData.books = resData.books.map(item => {
            item.updateTime = moment(item.updateTime).format('YYYY年M月D日')
            return item
          })
          _this.contentData = [..._this.contentData, ...resData.books]
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
      this.getContent().then(() => {
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
      this.getContent().then(() => {
        this.$refs.loadmore.onBottomLoaded()
      })
    }
  },
  created () {
    this.getContent()
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
    }
}
</style>
