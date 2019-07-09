<template>
  <div>
    <router-link :to="{name: selected}">
      <Tabbar v-model="selected" :fixed="true">
        <TabItem id="index">
          <svg class="iconfont" aria-hidden="true" slot="icon">
            <use xlink:href="#iconshouye"></use>
          </svg>
          首页
        </TabItem>
        <TabItem id="learn">
          <svg class="iconfont" aria-hidden="true" slot="icon">
            <use xlink:href="#iconboshi"></use>
          </svg>
          我的学习
        </TabItem>
        <TabItem id="person">
          <svg class="iconfont" aria-hidden="true" slot="icon">
            <use xlink:href="#icongerenzhongxin"></use>
          </svg>
          个人中心
        </TabItem>
      </Tabbar>
    </router-link>
  </div>
</template>

<script>
import {Tabbar, TabItem} from 'mint-ui'

export default {
  name: 'tab-bar',
  components: {
    Tabbar,
    TabItem
  },
  data () {
    return {
      selected: location.hash.slice(2)
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-around;
}
.iconfont {
  font-size: 26px;
}
</style>
