<template>
  <div class="container">
    <div class="content markdown" :style="{fontSize: fontSize + 'px'}" v-html="html"></div>
    <div class="btns">
      <svg class="iconfont" aria-hidden="true" @click="handleJump('prev')">
        <use xlink:href="#iconshangyiye"></use>
      </svg>
      <svg class="iconfont" aria-hidden="true" @click="showTitles">
        <use xlink:href="#iconmulu"></use>
      </svg>
      <svg class="iconfont" aria-hidden="true" @click="handleAdd">
        <use xlink:href="#iconzitizengda"></use>
      </svg>
      <svg class="iconfont" aria-hidden="true" @click="handleReduce">
        <use xlink:href="#iconzitijianxiao"></use>
      </svg>
      <svg class="iconfont" aria-hidden="true" @click="handleJump('next')">
        <use xlink:href="#iconxiayiye"></use>
      </svg>
    </div>
    <div class="title-wrap" v-show="isShowTitles" @click="hideTitles">
      <transition name="slide">
        <ul class="title" v-show="isActive" @click.stop>
          <li v-for="(item, index) in titles" :key="index" class="title-item" @click="handleJump(item.index)">
            {{item.title}}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import Showdown from 'showdown'
import { Toast } from 'mint-ui'

export default {
  name: 'hh-article',
  data () {
    return {
      article: [],
      html: '',
      fontSize: 48,
      titles: [],
      index: -1,
      isShowTitles: false,
      isActive: false
    }
  },
  methods: {
    getArticle (itemId) {
      return new Promise((resolve) => {
        const id = itemId || this.$route.params.id
        this.$axios.get(this.$api.getArticle + id).then(res => {
          const coverter = new Showdown.Converter()
          this.html = coverter.makeHtml(res.data[0].content.trim())
          this.article = res.data
          this.index = res.data[0].index
          resolve()
        })
      })
    },
    handleAdd () {
      if (this.fontSize >= 80) {
        Toast({
          message: '字体太大不好看啊',
          duration: 2000
        })
      } else {
        this.fontSize += 2
      }
    },
    handleReduce () {
      if (this.fontSize <= 42) {
        Toast({
          message: '字体太小会伤眼睛',
          duration: 2000
        })
      } else {
        this.fontSize -= 2
      }
    },
    getTitles () {
      console.log(1)
      const id = this.article[0].bookId
      this.$axios.get(this.$api.getTitles + id).then(res => {
        console.log(res)
        this.titles = res.data
      })
    },
    handleJump (isPrev) {
      const _this = this
      function getArticleByIndex () {
        const id = _this.titles.find(item => item.index === _this.index)._id
        _this.getArticle(id)
        _this.$router.push({
          name: 'article',
          params: {
            id
          }
        })
      }
      if (isPrev === 'prev') {
        if (this.index === 0) {
          Toast({
            message: '已经是第一章了',
            duration: 1500
          })
        } else {
          this.index--
          getArticleByIndex()
        }
      } else if (isPrev === 'next') {
        if (this.index === this.titles.length) {
          Toast({
            message: '已经是最后一章了',
            duration: 1500
          })
        } else {
          this.index++
          getArticleByIndex()
        }
      } else {
        this.index = isPrev
        getArticleByIndex()
        window.scrollBy(0, 0)
      }
    },
    showTitles () {
      this.isShowTitles = true
      this.isActive = true
    },
    hideTitles () {
      this.isActive = false
      setTimeout(() => {
        this.isShowTitles = false
      }, 500)
    }
  },
  created () {
    this.getArticle().then(() => {
      this.getTitles()
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../globalcss/px2.scss';

.content {
  margin-bottom: 42px;
}

.btns {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
  height: 42px;
  line-height: 42px;
  text-align: center;

  .iconfont {
    margin: auto;
    flex: 1;
    color: #333;
    font-size: 24px;
  }
}

.title-wrap {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);

  .title {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background: #fff;
    color: #000;
    overflow: auto;

    .title-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  }

  .slide-enter,.slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  .slide-enter-active,.slide-leave-active {
    transition: transform .5s ease;
  }
}
</style>

<style lang="scss">
@import './markdown.scss'
</style>
