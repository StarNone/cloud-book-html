<template>
  <div class="content-item">
    <div class="content-item-row1">
      <h2 class="title">
        {{options.title}}
      </h2>
      <router-link :to="{name: 'morearticles', params: {id: options._id}}">更多...</router-link>
    </div>
    <div class="content-item-row2" v-for="(it, index) in options.books" :key="index">
      <router-link :to="{name: 'details', params: {id: it._id}}" class="content">
        <div class="img-wrap">
          <img :src="it.img" :alt="it.img">
        </div>
        <div class="article">
          <div class="article-title">
            {{it.title}}
          </div>
          <div class="article-preview">
            {{it.desc}}
          </div>
          <div class="article-msg">
            <div class="author">
              {{it.author}}
            </div>
            <div class="date">
              {{it.updateTime}}
            </div>
            <div class="looknum">
              {{it.looknums}}人在看
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contentitem',
  props: {
    options: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../globalcss/px2.scss';
.content-item {
  .content-item-row1 {
    margin-top: px2-to-rem(38);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-left: px2-to-rem(10) solid #000;
    padding: 4px 0 4px 10px;
  }
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
}
</style>
