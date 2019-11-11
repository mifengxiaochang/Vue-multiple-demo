<template>
  <div class="mint-header header bgRed">
    <div class="mint-header-button is-left" @click.stop="linkTo">
      <button class="mint-button mint-button--default mint-button--normal">
        <span class="mint-button-icon">
          <i class="mintui mintui-back"></i>
        </span>
        <label class="mint-button-text"></label>
      </button>
    </div>
    <h1 class="mint-header-title" v-if="headerState=='default'">{{headerTitle}}</h1>
    <h1 class="mint-header-title" v-else-if="headerState=='index'">
      <i></i>
      <span>{{headerTitle}}</span>
    </h1>
    <h1 class="mint-header-title oneWay" v-else-if="headerState=='oneway'">
      <span>{{headerMsg.title.from}}</span>
      <i></i>
      <span>{{headerMsg.title.to}}</span>
    </h1>
    <h1 class="mint-header-title multipass" v-else-if="headerState=='multi-city'">
      <span>{{headerMsg.title.from}}</span>
      <i></i>
      <span>{{headerMsg.title.to}}</span>
    </h1>
    <h1 class="mint-header-title depart" v-else-if="headerState=='depart'">
      <span>{{headerMsg.title.from}}</span>
      <i></i>
      <span>{{headerMsg.title.to}}</span>
    </h1>
    <h1 class="mint-header-title return" v-else-if="headerState=='return'">
      <span>{{headerMsg.title.from}}</span>
      <i></i>
      <span>{{headerMsg.title.to}}</span>
    </h1>
    <div class="mint-header-button is-right" @click.stop="showList">
      <button
        v-show="headerMsg.right.isShow"
        class="mint-button trpfont TRP-list mint-button--default mint-button--normal"
      >
        <label class="mint-button-text"></label>
      </button>
    </div>
    <div class="mint-header-add-btn" @click.stop="addCoupon()" v-if="headerMsg.addCoupon">
      <i class="trpfont TRP-jiahao"></i>
      <span>新增</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-component',
  data() {
    return {
      airlines: 'EU',
      isLoginPage: false
    };
  },
  props: {
    headerMsg: Object
  },
  // mounted: function() {
  //   console.log('-mounted-headerMsg--', this.headerMsg);
  // },
  computed: {
    headerTitle: function() {
      let { title = '' } = this.headerMsg.title;
      return title;
    },
    headerState: function() {
      let { state = '' } = this.headerMsg.title;
      return state;
    }
  },
  methods: {
    linkTo: function() {
      this.$emit('back');
    },
    showList: function() {
      this.$emit('showList');
    },
    // 添加优惠券
    addCoupon: function() {
      this.$router.push({
        name: 'PersonalCenterCouponAdd'
      });
    }
  }
};
</script>
<style lang='css'>
.mint-header.header {
  position: absolute;
  width: 100%;
  height: 0.9rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.38rem;
  z-index: -1;
  box-shadow: 0 0.08rem 0.08rem rgba(0, 0, 0, 0.05);
}
.mint-header.header > .mint-button {
  height: 0.9rem;
  color: #444d54;
  font-size: 0.38rem;
}
.mint-header.header > .mint-button > .mintui {
  font-size: 0.38rem;
}
.is-left > .mint-button {
  margin-left: -0.08rem;
}
.mint-header-title {
  font-size: 0.34rem;
  color: #333;
  overflow: unset;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mint-header-title > i {
  font-style: normal;
  background-image: url("../../static/img/logo.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 0.4rem;
  height: 0.46rem;
  margin: -0.02rem 0.16rem 0 0;
}
.mint-header-title > span {
  margin-top: 0.01rem;
}

.oneWay > i {
  width: 0.53rem;
  height: 0.12rem;
  background-image: url("../../static/img/oneWay.png");
  background-position: center center;
  background-size: 100% auto;
  margin: 0 0.18rem;
}

.multipass > i {
  width: 0.83rem;
  height: 0.12rem;
  background-image: url("../../static/img/multipass.png");
  background-position: center center;
  background-size: 100% auto;
  margin: 0 0.18rem;
}
.depart > i {
  width: 0.53rem;
  height: 0.12rem;
  background-image: url("../../static/img/oneWay.png");
  background-position: center center;
  background-size: 100% auto;
  margin: 0.05rem 0.18rem 0 0.18rem;
  position: relative;
}
i::before {
  content: "去";
  position: absolute;
  left: 25%;
  top: -200%;
  font-size: 12px;
}
.return > i {
  width: 0.53rem;
  height: 0.12rem;
  background-image: url("../../static/img/oneWay.png");
  background-position: center center;
  background-size: 100% auto;
  margin: 0.05rem 0.18rem 0 0.18rem;
  position: relative;
}
.return > i::before {
  content: "返";
  position: absolute;
  left: 25%;
  top: -200%;
  font-size: 12px;
}

.mint-header.bgRed {
  background-color: #d92129;
  box-shadow: unset;
}
.mint-header.bgRed > .mint-button {
  color: #fff;
}
.mint-header.bgRed > .mint-header-title {
  color: #fff;
}
.mint-header.bgRed > .oneWay > i {
  background-image: url("../../static/img/EU/oneWay.png");
}
.mint-header.bgRed > .multipass > i {
  background-image: url("../../static/img/EU/multipass.png");
}
.mint-header.bgRed > .depart > i {
  background-image: url("../../static/img/EU/oneWay.png");
}
.mint-header.bgRed > .return > i {
  background-image: url("../../static/img/EU/oneWay.png");
}

.mint-header.bgNone {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: unset;
}
/* // 新增按钮 */
.mint-header-add-btn {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0.2rem;
  height: 0.9rem;
  display: flex;
  align-items: center;
}
.mint-header-add-btn > span {
  color: #fff;
  font-size: 0.28rem;
  margin-left: 0.1rem;
}
.mint-header-add-btn > i {
  font-size: 0.28rem;
  color: #fff;
}
</style>

