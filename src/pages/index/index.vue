<template>
  <div id="App" class="container">
    <headers :headerMsg="headerMsg" @showList="handleShowList"></headers>
    <!-- 被缓存的视图组件-->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>-->
    <!-- 不被缓存的视图组件，比如 Edit！ -->
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <!-- 下拉列表 -->
    <div class="menu-list-shade" v-show="menuIsShow" @click="hideShade()"></div>
    <div class="menu-list" v-show="menuIsShow">
      <ul v-if="signInState=='trur'">
        <li
          v-for="item in menuList"
          v-tap="{methods:linkto}"
          :data-tag="item.dataTag"
          :key="item.dataTag"
        >
          <i class="trpfont" :class="item.fontClass"></i>
          {{item.text}}
        </li>

        <!-- <li v-tap="{methods:linkto}" data-tag="TicketQuery"><i class="trpfont TRP-shouye"></i> 首页</li>
        <li v-tap="{methods:linkto}" data-tag="OrderList"><i class="trpfont TRP-gerenzhongxin"></i>我的订单</li>
        <li v-tap="{methods:linkto}" data-tag="quit"><i class="trpfont TRP-tuichu"></i>退出</li>-->
      </ul>
      <ul v-else>
        <li
          v-for="item in menuList"
          v-tap="{methods:linkto}"
          :data-tag="item.dataTag"
          :key="item.dataTag"
        >
          <i class="trpfont" :class="item.fontClass"></i>
          {{item.text}}
        </li>

        <!-- <li v-tap="{methods:linkto}" data-tag="TicketQuery"><i class="trpfont TRP-shouye"></i> 首页</li>
        <li v-tap="{methods:linkto}" data-tag="SignIn"><i class="trpfont TRP-tuichu"></i>登录</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import headers from '@/components/header';
import * as fetch from '@/common/request.js';
import { ROUTER_CONFIG_ENUM } from '@/common/constants.js';

export default {
  name: 'App',
  data() {
    return {
      headerMsg: {
        left: { isShow: false, flag: false },
        title: { title: '', state: '' },
        right: { isShow: true },
        inSigninTitle: '',
        addCoupon: false
      },
      routerConfig: ROUTER_CONFIG_ENUM,
      menuIsShow: false
    };
  },
  components: { headers },
  methods: {
    handleShowList: function() {
      console.log('this.routerconfig', this.routerConfig.right);
      if (this.routerConfig.right.isShow) {
        // this.$router.push({name:'First'});
        this.menuIsShow = !this.menuIsShow;
      }
    },
    getHeaderMsg: function() {
      const vm = this;
      fetch.get('/api/test/getHeader').then(res => {
        console.log('res', res);
        vm.headerMsg = res.headerMsg;
      });
    }
  },
  mounted: function() {
    this.getHeaderMsg();
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.readyPage {
  width: 100vw;
  height: calc("100vh - 0.9rem");
  background-color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
.menu-list-shade {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.2);
}
.menu-list {
  width: 2.07rem;
  position: absolute;
  right: 0.09rem;
  top: 1.06rem;
  background: #fff;
  border-radius: 0.03rem;
  padding: 0.2rem 0 0.2rem 0.28rem;
  box-sizing: border-box;
  box-shadow: 0.02rem 0.02rem 0.04rem rgba(0, 0, 0, 0.3);
  z-index: 3;
}
.menu-list::before {
  content: "";
  position: absolute;
  right: 0.28rem;
  top: -0.13rem;
  border-width: 0 0.15rem 0.15rem;
  border-style: solid;
  border-color: transparent transparent rgba(255, 255, 255, 1); /*透明 透明  灰*/
}
.menu-list > ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 0.23rem;
  color: #333;
}
.menu-list > li {
  /* margin-bottom: 0.3rem; */
  display: flex;
  align-items: center;
  padding: 0.15rem 0;
}
.menu-list > li > i {
  font-size: 0.3rem;
  margin-right: 0.19rem;
}
.menu-list > li:nth-last-child(1) {
  margin: 0;
}
</style>
