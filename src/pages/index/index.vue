<template>
  <div id="App" class="container">
    <headers :headerMsg="headerMsg" @showList="handleIsShowList"></headers>
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
      </ul>
    </div>
    <!-- 填写行程信息 -->
    <div>
      行程信息
      <div v-for="(passenger,index) in passengerData" :key="passenger.id">
        <div>{{`${passenger.title}${index}` }}</div>
        <select @change="handdleCommonlySelect(index,$event)" v-model="passenger.commonlySelected">
          <option
            v-for="item in commonlyPassenger"
            :key="item.indexId"
            :value="item.indexId"
          >{{item.name}}</option>
        </select>
        <input v-model="passenger.pName" />
        <!-- 身份证选择 -->
        <select v-model="passenger.type">
          <option v-for="card in cardList" :key="card.indexId" :value="card.indexId">{{card.type}}</option>
        </select>
        <input v-model="passenger.pNumber" />
      </div>
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
      passengerData: [
        {
          title: '',
          commonlySelected: '',
          pName: '',
          type: '',
          pNumber: ''
        }
      ],
      commonlyPassenger: [
        {
          indexId: 0,
          name: 'please select',
          cardType: '',
          cardNum: ''
        }
      ],
      cardList: [],
      routerConfig: ROUTER_CONFIG_ENUM,
      menuIsShow: false,
      signInState: '',
      menuList: []
    };
  },
  components: { headers },
  methods: {
    handleIsShowList: function() {
      console.log('this.routerconfig', this.routerConfig.right);
      if (this.routerConfig.right.isShow) {
        // this.$router.push({name:'First'});
        this.menuIsShow = !this.menuIsShow;
      }
    },
    getHeaderMsg: function() {
      const vm = this;
      fetch.get('/api/test/getHeader').then(res => {
        vm.headerMsg = res.headerMsg;
      });
    },
    getPassengerData: function() {
      const vm = this;
      fetch.get('/api/test/getPassengerData').then(res => {
        let passengerList = [];
        res.forEach(passenger => {
          passengerList.push({
            title: passenger.title,
            commonlySelected: '',
            pName: '',
            type: '',
            pNumber: ''
          });
        });
        vm.passengerData = passengerList;
      });
    },
    getPassengerInfo: function() {
      const vm = this;
      fetch.get('/api/test/getPassengerInfo').then(res => {
        const { commonlyPassenger } = res;
        vm.commonlyPassenger.concat(commonlyPassenger);
        commonlyPassenger.forEach((item, index) => {
          vm.commonlyPassenger.push({
            indexId: index + 1,
            name: item.name,
            cardType: item.cardType,
            cardNum: item.cardNum
          });
        });
        vm.cardList = res.cardList;
      });
    },
    getAllData: function() {
      this.getHeaderMsg();
      this.getPassengerInfo();
      this.getPassengerData();
    },
    hideShade: function() {
      this.handleIsShowList();
    },
    handdleCommonlySelect: function(index, e) {
      const selectNum = e.target.value;
      const selectedList = this.commonlyPassenger[selectNum];
      this.passengerData[index].pNumber = selectedList.cardNum;
      if (selectNum !== '0') {
        const selectedType = this.cardList.find(
          card => card.key === selectedList.cardType
        );
        this.passengerData[index].pName = selectedList.name;
        this.passengerData[index].type = selectedType.indexId;
      } else {
        this.passengerData[index].pName = '';
        this.passengerData[index].type = '';
      }
    }
  },
  mounted: function() {
    this.getAllData();
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
