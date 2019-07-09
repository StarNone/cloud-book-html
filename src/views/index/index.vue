<template>
  <div class="container">
    <Loadmore :top-method="loadTop" ref="loadmore" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" :auto-fill="false">
      <MySwiper></MySwiper>
      <div class="content">
        <ContentItem v-for="(item, index) in contentData" :key="index" :options="item" />
      </div>
    </Loadmore>
  </div>
</template>

<script>
import MySwiper from '@/components/my-swiper/'
import ContentItem from './components/contentitem'
import moment from 'moment'
import { Loadmore } from 'mint-ui'

export default {
  name: 'index',
  components: {
    MySwiper,
    ContentItem,
    Loadmore
  },
  data () {
    return {
      contentData: [],
      queryData: {
        pn: 1,
        booksSize: 2,
        size: 2
      },
      allLoaded: false
    }
  },
  methods: {
    getContent () {
      return new Promise((resolve) => {
        this.$axios.get(this.$api.getContent, {
          params: this.queryData
        }).then(res => {
          let resData = res.data
          if (resData.length < this.queryData.size) {
            this.allLoaded = true
          }
          resData = resData.map(item => {
            item.books = item.books.map(it => {
              it.updateTime = moment(it.updateTime).format('YYYY年M月D日')
              return it
            })
            return item
          })
          this.contentData = [...this.contentData, ...resData]
          resolve()
        })
      })
    },
    loadTop () {
      this.queryData = {
        pn: this.queryData.pn + 1,
        booksSize: 2,
        size: 2
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
        size: 2
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

.container {
  padding: px2-to-rem(18);
}

.content {
  padding-bottom: 60px;
}
</style>
