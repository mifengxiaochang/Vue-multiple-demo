export const ROUTER_CONFIG_ENUM = {
  left: {
    isShow: true, // 左侧图标是否显示
    flag: false, // 是否开启$router.replace
    options: { // 开启$router.replace后需要跳转的页面
      name: ''
    }
  },
  title: {
    state: 'default', // 默认状态 有oneway,multi-city,depart,return共五中状态
    title: '', // 默认状态下header标题
    from: '', // 去程，返程，单程，往返时出发城市
    to: '' // 去程，返程，单程，往返时到达城市
  },
  right: {
    isShow: true // 是否显示header右侧图标
  }
};
