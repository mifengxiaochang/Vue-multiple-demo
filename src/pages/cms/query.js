let queryDynamic = {};

data = {};

queryDynamic.load = function(){
    let queryDynamic = new Vue({
		el: '#queryDynamic',
		data: {
			/*
				data中定义vue实例中将要用到的参数
				一般只定义不赋值，赋值在created中进行
      */
      selectedQueryType: '0',
      queryTypeOpions: [
        {text: '按行程查询',value: '0'},
        {text: '按航班查询',value: '1'}
      ],
      departureCity: '',
      arrivalCity: '',
      flightNum: ''
		},
		/*
			vue生命周期created，代表vue实例已经创建完成
			此时的data和methods已经创建完成
			一般在这里进行data的赋值和初始化方法的调用
		*/
		created: function() {

		},
		methods: {

		}

	});
};
