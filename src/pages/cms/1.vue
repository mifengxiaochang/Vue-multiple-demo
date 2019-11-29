<template>
  <div>
    <div class="wrap">
      <!-- head -->
      <div class="head">
        <div class="hd-user">
          <div class="wc">
            <div class="user-list">
              <div class="list-tit">张三三</div>
              <!-- 登录 -->
              <!-- select-user1 -->
              <!-- <a class="select-user btn-select">
					<div class="select-box active">
						<div class="select-txt"><i class="icon-user"></i>张三三</div>
						<i class="icon icon-arrowdown"></i>
					</div>
					<select class="select-ops">
						<option value="#" selected class="hidden"></option>
						<option value="#" class="select-link">个人中心</option>
						<option value="#" class="select-link">我的订单</option>
						<option value="logout">退出</option>
					</select>
              </a>-->
              <!--登录注册-->
              <!-- <div class="login-sign-box">
					<i class="icon-user"></i>
					<a class="login-btn" href="#">登录</a>
					<span class="spe">|</span>
					<a class="login-btn" href="#">注册</a>
              </div>-->
              <!-- select-user2 -->
              <div class="layer-user">
                <span class="layer-link">
                  用户名
                  <i class="icon-arrowdown"></i>
                </span>
                <div class="layer-con">
                  <div class="layer-ul">
                    <!--<a class="layer-text" href="#">个人中心<i class="icon-x"></i></a>-->
                    <ul class="layer-li">
                      <a href="#">账户信息管理</a>
                      <a class="active" href="#">常用旅客管理</a>
                    </ul>
                  </div>
                  <a href="#">我的订单</a>
                  <a href="javascript:" data-toggle="modal" data-target=".modal-confirm">退出</a>
                </div>
              </div>

              <div class="index_login-btn">
                <i class="login-logo_gl"></i>
                <a href class="index_login-href">登录</a>/
                <a href class="index_login-href">注册</a>
              </div>
              <!-- select-lang1 -->
              <a class="select-lang btn-select select-lang_gl">
                <div class="select-box active">
                  <div class="select-txt">
                    <img src="static/images/flag.png" class="flag" />
                    中国
                    <span class="hr">|</span>简体中文
                  </div>
                </div>
              </a>
              <div class="hd-hd">
                <!-- common -->
                <span class="hd-txt">
                  <i class="icon-phone_gl"></i>
                  <span>9507101</span>
                </span>
                <!-- <a class="hd-txt" href="#">
                        <i class="icon-survey"></i>
                        意见与建议
                </a>-->
              </div>

              <a class="link-return" href="#">
                <i class="link-return_gl"></i>
                <span>返回旧网站</span>
              </a>
            </div>
          </div>
        </div>
        <div class="hd-nav">
          <div class="hd-nav_bg"></div>
          <div class="wc">
            <!-- logo1 -->
            <a class="logo" href="#">
              <img src="static/images/logo.png" />
            </a>
            <div class="nav-list">
              <div class="list-tit">菜单栏</div>
              <ul class="nav-ul">
                <li class="nav-li li-active">
                  <a class="nav-link" href="#">首页</a>
                </li>
                <li class="nav-li">
                  <a class="nav-link" href="javascript:">预订管理</a>
                  <div class="nav-sub">
                    <div class="sub-box">
                      <div class="clearfix">
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">机票预订</a>
                          </dt>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <span class="sub-link">订单管理</span>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">我的订单</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">改期｜退票</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">旧网站订单</a>
                          </dd>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <span class="sub-link">会员中心</span>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">个人信息</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">常用旅客信息</a>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="nav-li">
                  <a class="nav-link" href="#">航班服务</a>
                  <div class="nav-sub">
                    <div class="sub-box">
                      <div class="clearfix">
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">最成都</a>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">乐活成都</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">历史成都</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">视野成都</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">时代成都</a>
                          </dd>
                        </dl>

                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">ARJ飞机专题</a>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">ARJ示范运营</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">ARJ大事记</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">ARJ航线</a>
                          </dd>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">热门活动</a>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">优享超值经济舱</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">如意行增值礼包</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">限时秒杀</a>
                          </dd>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">航线推荐</a>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">新开航线</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">热门航线</a>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="nav-li">
                  <a class="nav-link" href="#">出行帮助</a>
                  <div class="nav-sub">
                    <div class="sub-box">
                      <div class="clearfix">
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">自助值机</a>
                          </dt>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">航班动态</a>
                          </dt>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">机票验真</a>
                          </dt>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <a class="sub-link" href="#">非正常航班改期</a>
                          </dt>
                        </dl>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="nav-li">
                  <a class="nav-link" href="#">建议与投诉</a>
                  <div class="nav-sub">
                    <div class="sub-box">
                      <div class="clearfix">
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <span class="sub-link">购票须知</span>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">旅客须知</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">安全须知</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">特殊旅客</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">客票规定</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">军残警残客票</a>
                          </dd>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <span class="sub-link">旅行服务</span>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">行李服务</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">值机服务</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">保险指南</a>
                          </dd>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">常见问题</a>
                          </dd>
                        </dl>
                        <dl class="sub-list">
                          <dt class="sub-tit">
                            <span class="sub-link">客户服务</span>
                          </dt>
                          <dd class="sub-li">
                            <a class="sub-link" href="#">货运服务</a>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- select-lang2 -->
              <div class="select-con">
                <a class="select-lang btn-select">
                  <div class="select-box active">
                    <div class="select-txt">
                      中国
                      <span class="hr">|</span> 简体中文
                    </div>
                  </div>
                </a>
              </div>

              <!--微信和电话-->
              <div class="wechat-phone-hd">
                <!-- common -->
                <!-- <div class="box">
                        <div class="box-info"><i class="icon-survey"></i>意见与建议</div>
                </div>-->
                <!-- common -->
                <div class="box">
                  <div class="box-info">
                    <i class="icon-phone"></i>9507101
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-bg">
            <div class="wc">
              <div class="nav-line"></div>
            </div>
          </div>
        </div>
        <div class="hd-mobile">
          <!-- logo2 -->
          <a class="logo" href="#">
            <img src="static/images/pic_footer_logo.png" />
          </a>
          <!-- 登录 -->
          <span class="btn-user icon-user"></span>
          <span class="btn-nav icon-menu"></span>
        </div>
      </div>
      <!-- head -->
      <!-- modal -->
      <div class="modal fade example-modal-sm modal-qr" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <a class="close" data-dismiss="modal" aria-label="Close" href="javascript:;">
                <span class="h2" aria-hidden="true">&times;</span>
              </a>
            </div>
            <div class="modal-body">
              <img src="static/images/qr.jpg" alt />
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <!-- 登录 -->
      <div class="modal fade example-modal-sm modal-confirm" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <a class="close" data-dismiss="modal" aria-label="Close" href="javascript:;">
                <span class="h2" aria-hidden="true">&times;</span>
              </a>
            </div>
            <div class="modal-body">
              <div class="modal-tit">退出登录…</div>
              <p>您确定要退出当前账号的登录状态吗？</p>
            </div>
            <div class="modal-footer">
              <div class="btn-group row">
                <div class="col-xs-4 col-xs-offset-2">
                  <button type="button" class="btn btn-gray no-change">确定</button>
                </div>
                <div class="col-xs-4">
                  <button type="button" class="btn btn-line no-change" data-dismiss="modal">取消</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->

      <!-- content -->
      <div class="content">
        <div class="container ticket-check entrance-item">
          <h2 class="con-tit">机票验真</h2>
          <div class="info-box">
            <a
              href="javascript:"
              class="link-intro"
              data-toggle="modal"
              data-target=".intro-modal"
            >查看机票验真说明</a>
            <p class="info-li">
              <i class="li-style">•</i>如果您已经购票成功，可在此处进行机票验真。
            </p>
            <p class="info-li">
              <i class="li-style">•</i>如果您已需要验证行程单的真伪，请点击中国民航局授权验真网站
              <a href="http://www.travelsky.com">www.travelsky.com</a> 进行查询。
            </p>
            <p class="info-li">
              <i class="li-style">•</i>此处只可支持西藏航空销售的以880开头的客票验证。
            </p>
            <p class="info-li">
              <i class="li-style">•</i>若系统提示查询不到您的客票信息，说明您的客票无效或还未出票。
            </p>
          </div>
          <div class="item-con">
            <div class="entrance-service">
              <div class="module-item service-module-group">
                <div class="row row-tip">
                  <div class="col-md-4 col-sm-6">
                    <div class="input-group">
                      <input class="text" type="text" placeholder="票号" placeholder-data="票号" />
                      <span class="input-info">票号</span>
                    </div>
                    <div class="fill-prompt">
                      <i class="i-trigger icon-noticeInfo"></i>
                      <div class="prompt-txt">输入13位票号信息</div>
                    </div>
                  </div>
                </div>
                <div class="row row-tip">
                  <div class="col-md-4 col-sm-6">
                    <div class="input-group">
                      <input class="text" type="text" placeholder="旅客名" placeholder-data="旅客姓名" />
                      <span class="input-info">旅客名</span>
                    </div>
                    <div class="fill-prompt">
                      <i class="i-trigger icon-noticeInfo"></i>
                      <div class="prompt-txt">国际票请输入：姓（拼音）／名（拼音）</div>
                    </div>
                  </div>
                </div>

                <div class="row row-tip">
                  <div class="col-md-4 col-sm-6">
                    <div class="input-group img-code-group">
                      <input class="text" type="text" placeholder="验证码" placeholder-data="验证码" />
                      <span class="input-info">验证码</span>
                    </div>
                    <div class="img-code-wrap img-codewrap_gl">
                      <img src />
                      <i class="icon-exchange"></i>
                    </div>
                  </div>
                </div>
                <div class="row mT40">
                  <div class="col-md-3 col-sm-3 col-xs-12">
                    <a class="btn btn-primary">验真</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- foot -->
        <div class="foot foot-common_gl">
          <div class="ft-t">
            <div class="wc">
              <div class="clearfix">
                <div class="col-md-3 col-sm-12 foot_left">
                  <div class="foot-gl_logo">
                    <!-- <img src="../images/pic_footer_logo.png" alt /> -->
                    <div class="foot_media">
                      <img src="static/images/ic_webo.png" alt class="foot-gl_webo" />
                      <img src="static/images/wb.png" alt class="foot-gl_wb" />
                      <img src="static/images/ic_wechat.png" alt class="foot-gl_wechat" />
                      <img src="static/images/wx.jpeg" alt class="foot-gl_wx" />
                      <p class="foot-gl_kf">客服热线：9507101</p>
                      <p class="foot-gl_jd">服务监督热线(工作时间)：0773-2844369</p>
                      <p class="foot-gl_jd">不正常航班服务热线：0773-7795632</p>
                    </div>
                  </div>
                </div>
                <dl class="col-md-3 col-sm-12 foot-gl_dl">
                  <dt>
                    <span class="ft-link">
                      出行须知
                      <i class="icon-arrowdown"></i>
                    </span>
                  </dt>
                  <dd>
                    <a class="ft-link" href="#">购票须知</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">旅客须知</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">特殊旅客须知</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">行李运输和危险品说明</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">宠物运输须知</a>
                  </dd>
                </dl>
                <dl class="col-md-3 col-sm-12 foot-gl_dl">
                  <dt>
                    <span class="ft-link">
                      服务指南
                      <i class="icon-arrowdown"></i>
                    </span>
                  </dt>
                  <dd>
                    <a class="ft-link" href="#">常见问题</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">退改签须知</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">运输总条件</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">机上延误应急处置预案</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">隐私条款</a>
                  </dd>
                </dl>
                <dl class="col-md-3 col-sm-12 foot-gl_dl">
                  <dt>
                    <span class="ft-link">
                      关于我们
                      <i class="icon-arrowdown"></i>
                    </span>
                  </dt>
                  <dd>
                    <a class="ft-link" href="#">公司介绍</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">联系我们</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">加入我们</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">机长宣誓视频</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">航线网络</a>
                  </dd>
                  <dd>
                    <a class="ft-link" href="#">航班时刻</a>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="ft-b">
            <div class="wc">
              <div class="ft-info">
                <p>
                  友情链接：
                  <a href="http://www.airguilingroup.net/" class="link">桂林航空旅游集团</a>
                  <a href=" http://www.hnair.com/" class="link">海南航空</a>
                  <a href="http://www.jdair.net/" class="link">首都航空</a>
                  <a href="http://www.tianjin-air.com/" class="link">天津航空</a>
                  <a href="http://www.fuzhou-air.cn/" class="link">福州航空</a>
                  <a href="http://www.luckyair.net/" class="link">祥鹏航空</a>
                  <a href="http://www.airchangan.com/portal" class="link">长安航空</a>
                  <a href="http://www.yzr.com.cn/" class="link">金鹏航空</a>
                  <a href="http://www.gxairlines.com/" class="link">北部湾航空</a>
                  <a href="http://www.westair.cn/portal/" class="link">西部航空</a>
                  <a href="http://www.urumqi-air.com/" class="link">乌鲁木齐航空</a>
                </p>
                <p>© 2018 桂林航空有限公司保留所有权利 桂ICP备16009035号</p>
              </div>
            </div>
          </div>
        </div>
        <!-- foot -->
      </div>
      <!-- content -->
    </div>
    <div class="modal fade intro-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <a class="close" data-dismiss="modal" aria-label="Close" href="javascript:;">
              <span class="h2" aria-hidden="true">&times;</span>
            </a>
            <h4 class="modal-title">机票验真说明</h4>
          </div>
          <div class="modal-body notice">
            <div class="modal-detail">
              <p class="info-li">
                <i class="li-style">•</i>为如果您已经购票成功，可在此处进行计票验真。
              </p>
              <p class="info-li">
                <i class="li-style">•</i>如果您已需要验证行程单的真伪，请点击中国民航局授权验真网站
                <a href="http://www.travelsky.com">www.travelsky.com</a> 进行查询。
              </p>
              <p class="info-li">
                <i class="li-style">•</i>此处只可支持西藏航空销售的以880开头的客票验证。
              </p>
              <p class="info-li">
                <i class="li-style">•</i>若系统提示查询不到您的客票信息，说明您的客票无效或还未出票。
              </p>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </div>
  <!-- /.modal -->
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
