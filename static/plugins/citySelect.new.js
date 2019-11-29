!function ($) {
    'use strict';

    $.fn.citySelect = function (options) {
        var inputC = this; //输入框
        var cityData = {
            locations:[
                {
                    "name":"重庆",
                    "code":"CKG",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"ABCDE"
                },
                {
                    "name":"福州",
                    "code":"FOC",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"FGHIJ"
                },
                {
                    "name":"拉萨",
                    "code":"LXA",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"天津",
                    "code":"TSN",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"郑州",
                    "code":"CGO",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"沈阳",
                    "code":"SHE",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"长春",
                    "code":"CGQ",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"ABCDE"
                },
                {
                    "name":"昌都",
                    "code":"BPX",
                    "hot": true,
                    "foreign": false,//国内or国外
                    "continent":"亚洲",
                    "group":"ABCDE"
                },
                {
                    "name":"林芝",
                    "code":"LZY",
                    "hot": false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"深圳",
                    "code":"SZX",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"夏河县",
                    "code":"GXH",
                    "hot": false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"长沙",
                    "code":"CSX",
                    "hot": false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"ABCDE"
                },

                {
                    "name":"杭州",
                    "code":"HGH",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"FGHIJ"
                },
                {
                    "name":"昆明",
                    "code":"KMG",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"贵阳",
                    "code":"KWE",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"FGHIJ"
                },
                {
                    "name":"洛阳",
                    "code":"LYA",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"日喀则",
                    "code":"RKZ",
                    "hot": false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"上海",
                    "code":"SHA",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"三亚",
                    "code":"SYX",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"铜仁",
                    "code":"TEN",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },

                {
                    "name":"温州",
                    "code":"WNZ",
                    "hot": false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"西宁",
                    "code":"XNN",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"珠海",
                    "code":"ZUH",
                    "hot": false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"达州",
                    "code":"DAX",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"ABCDE"
                },
                {
                    "name":"格尔木",
                    "code":"GOQ",
                    "hot": false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"FGHIJ"
                },

                {
                    "name":"南充",
                    "code":"NAO",
                    "hot":false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"宜宾",
                    "code":"YBP",
                    "hot":false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"兰州",
                    "code":"LHW",
                    "hot":true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"丽江",
                    "code":"LJG",
                    "hot":false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"南昌",
                    "code":"KHN",
                    "hot":false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"南京",
                    "code":"NKG",
                    "hot":true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"KLMNP"
                },
                {
                    "name":"石家庄",
                    "code":"SJW",
                    "hot":false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"青岛",
                    "code":"TAO",
                    "hot":true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"济南",
                    "code":"TNA",
                    "hot":true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"FGHIJ"
                },
                {
                    "name":"太原",
                    "code":"TYN",
                    "hot":false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"QRSTU"
                },
                {
                    "name":"烟台",
                    "code":"YNT",
                    "hot":false,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"绵阳",
                    "code":"MIG",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"阿里",
                    "code":"NGQ",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"北京",
                    "code":"PEK",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"ABCDE"
                },
                {
                    "name":"西安",
                    "code":"XIY",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"西宁",
                    "code":"XNN",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"玉树",
                    "code":"YUS",
                    "hot": true,
                    "foreign": false,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"苏梅岛",
                    "code":"USM",
                    "hot": true,
                    "foreign": true,
                    "continent":"亚洲",
                    "group":"VWXYZ"
                },
                {
                    "name":"加德满都",
                    "code":"KTM",
                    "hot": true,
                    "foreign": true,
                    "continent":"亚洲",
                    "group":"FGHIJ"
                }
            ]
        };

        var defaults = {
            inputComponent: '.city-component',
            cityData: cityData,//cityData
            container:  '#city-select-box',
            htmlTemp: '<div id="city-select-box" class="city-select-box"></div>'
        };
        var setting = $.extend({}, defaults, options);
        var setPos = function (e) {
            var left = $(e).offset().left,
                top = $(e).offset().top,
                height = $(e).outerHeight();
            var cityUnitWidth=$(setting.container).outerWidth()||302;
            var bodyWidth= $("body").outerWidth();
            if(bodyWidth-left<cityUnitWidth) {
                left = left-cityUnitWidth-left+bodyWidth-10;
            }
            $(setting.container).css({ left: left + "px", top: top + height + "px" });
        };
        var citySelect = {
            data: {
                listType: 0,//选择列表形态0分组形态，1模糊查询列表形态
                cityData: {},//城市数据对象
                curCity: {},
                filterData: [],//存储模糊查询
                componentTrigger: {} //控件对应的输入框
            },
            initData:function () {
                var cities = setting.cityData.locations,
                    cityData= {};
                cityData.hotgroup =[];
                cityData.abcObj={};//abc分组对象
                cityData.continentObj={}; //洲分组对象

                this.data.curCity.name="";
                this.data.curCity.code="";


                if (cities.length>0){

                    for (var i=0;i<cities.length;i++){
                        if(cities[i].hot){
                            cityData.hotgroup.push(cities[i]);//对象数组
                        }
                       // console.log(cities[i].foreign);
                        if(cities[i].foreign){//国外城市
                            if(cityData.continentObj[cities[i].continent]=== undefined){
                                cityData.continentObj[cities[i].continent]=[];
                                cityData.continentObj[cities[i].continent].push(cities[i]);
                            }else {
                                cityData.continentObj[cities[i].continent].push(cities[i]);
                            }
                        } else { //国内城市

                            if(cityData.abcObj[cities[i].group]=== undefined){
                                cityData.abcObj[cities[i].group]=[];
                                cityData.abcObj[cities[i].group].push(cities[i]);
                            }else {
                                cityData.abcObj[cities[i].group].push(cities[i]);
                            }
                        }
                    }

                }

                this.data.cityData=cityData;

            },
            init:function () {
                this.initData();
                this.trigger();
                this.bindEvent();
            },
            setVal:function(input) {
                $(input).val(this.data.curCity.name);
                $(input).attr("data-cityCode",this.data.curCity.code);
                $(input).trigger("change");
            },
            closeComponent:function(){
                $(setting.container).html("");
                citySelect.data.listType=0;
            },
            renderHtml: function () {
                var lis='',
                    list ,
                    width=$(this.data.componentTrigger).outerWidth(),
                    arrayCity =this.data.filterData,
                    length;

                if(arrayCity && arrayCity.length){
                    length=arrayCity.length;
                }else  {
                    length=0;
                }
                var code;
                var name;
                if(length){
                    for(var i = 0; i <length; i++){
                        code=arrayCity[i].code;
                        name=arrayCity[i].name;
                        lis += '<li data-code="' + code+'">' + name + '</li>';
                    }
                }else {
                    lis='<li class="no-city">暂时不支持该地点</li>';
                }

                list = '<ul class="city-list" style="width: '+width+'px">'+lis+'</ul>';

                if (!$(setting.container).length) {
                    $("body").append(setting.htmlTemp);
                }
                $(setting.container).html(list).find("li:first-child").addClass("cur");
            },
            renderUnit: function () {
                citySelect.data.listType=0;

                var cityTab = '<div class="city-tab">'+
                    '<span class="group-t cur">热门城市</span>'+
                    '<span class="group-t">国内城市</span>'+
                    '<span class="group-t">国际城市</span>'+
                    '</div>';
                var hotList='',
                    innerList='',
                    foreignList='',
                    tabHot,
                    tabInner,
                    tabForeign,
                    groupTab,
                    tabCon,
                    list ;

                var hotArr = this.data.cityData.hotgroup,
                    innerObj = this.data.cityData.abcObj,
                    foreignObj =this.data.cityData.continentObj;

                if(hotArr.length>0){// 热门城市

                    for (var i=0;i<hotArr.length;i++){
                        hotList+= '<span class="city-item"  data-code="' + hotArr[i].code+'">'+hotArr[i].name+'</span>';
                    }
                }
                if(innerObj){//国内城市
                    var groupList='';

                    for(var abcArr in innerObj) {
                      var arrItem = innerObj[abcArr];//abc分组item
                      var groupItems='';
                      var cur= abcArr==="ABCDE"? 'cur':'';

                        groupList+= '<span class="group-item '+cur+'">'+abcArr+'</span>';
                        groupTab ='<div class="group-tab">'+groupList+'</div>';
                        var cities='';
                        for (var j=0;j<arrItem.length;j++){
                            cities += '<span class="city-item" data-code="' + arrItem[j].code+'">'+arrItem[j].name+'</span>';
                        }
                        groupItems += '<div class="city-items '+cur+'">'+cities+'</div>';

                        innerList += groupItems;
                  }
                }
                if(foreignObj){//国际城市
                    var continentList='',
                        continentTab;
                        //foreignList='';

                    for(var continentArr in foreignObj) {
                        var continentItem = foreignObj[continentArr];//abc分组item
                        var groupItems='';
                        var cur= continentArr==="亚洲"? 'cur':'';
                        var cities='';

                        continentList += '<span class="group-item '+cur+'">'+continentArr+'</span>';
                        continentTab = '<div class="group-tab group-continent">'+continentList+'</div>';
                        for (var j=0;j<continentItem.length;j++){
                            cities += '<span class="city-item" data-code="' + continentItem[j].code+'">'+continentItem[j].name+'</span>';
                        }
                        groupItems += '<div class="city-items ' +cur+'">'+cities+'</div>';

                        foreignList += groupItems;
                    }

                }

                tabHot = '<div class="tab-item tab-hot cur">'+
                    '<div class="city-items">'+
                    hotList+
                    ' </div>'+
                    '</div>';

                tabInner = '<div class="tab-item tab-group">'+groupTab+
                    innerList +
                    '</div>';

                tabForeign ='<div class="tab-item tab-continent">'+continentTab+
                    foreignList+
                    '</div>';

                tabCon = tabHot+tabInner+tabForeign;
                list = '<div class="city-unit">' +
                    cityTab+tabCon +
                    '</div>';

                if (!$(setting.container).length) {
                    $("body").append(setting.htmlTemp);
                }
                $(setting.container).html(list);
            },
            trigger: function () {
                $(inputC).focus(function(){
                    citySelect.data.componentTrigger=this;
                    citySelect.renderUnit();
                    setPos(citySelect.data.componentTrigger);
                });
            },
            inputFilter: function (input) {
                var inputVal = $.trim($(input).val());//输入框的值,
                citySelect.data.listType=1; //渲染类型设值

                 // todo: ajax请求方法由开发重写
                 $.get("plugins/data.test.json",function (data,status) {
                    // data格式如下

                     // {"locations": {
                     //     "location": [
                     //         {
                     //             "name": "重庆",
                     //             "code": "CKG",
                     //             "hot": true,
                     //             "foreign": false,
                     //             "continent": "亚洲",
                     //             "group": "ABCDE"
                     //         },
                     //         {
                     //             "name": "拉萨",
                     //             "code": "LXA",
                     //             "hot": true,
                     //             "foreign": false,
                     //             "continent": "亚洲",
                     //             "group": "KLMNP"
                     //         }
                     //     ]
                     // }
                     // }

                     if(status==="success"){
                         var temp =data["locations"];
                         citySelect.data.filterData = temp["location"];//初始化filterData 数组;
                         citySelect.renderHtml();
                     }

                 },"json");
            },
            bindEvent: function () {
                var that =this;
                $(inputC).keyup(function (event) {
                    var input = this;

                    if(event.keyCode === 9){//  tab 切换不执行 ,执行focus
                        return;
                    }
                    if(event.keyCode === 40||event.keyCode===38){ //up and down
                        var activeLi = $(setting.container).find("li.cur")
                        if(activeLi.length===0){
                            activeLi = $(setting.container).find("li").first().addClass("cur");
                        }
                        var cityDom =  $(setting.container).find(".city-list");
                        var liHeight = activeLi.outerHeight();
                        var index = activeLi.index()+1;
                        var length=cityDom.children("li").length;
                        if(event.keyCode === 40){ //down
                            if(length===1){
                                return;
                            }
                            if(index<=8){
                                activeLi.removeClass("cur").next("li").addClass("cur");
                            }

                            if(index>8 && index<length){
                                cityDom.scrollTop((index-8)*liHeight);
                                activeLi.removeClass("cur").next("li").addClass("cur");
                            }
                            if(index===length){
                                cityDom.scrollTop(0);
                                activeLi.removeClass("cur").siblings("li").first().addClass("cur");
                            }
                        }
                        if(event.keyCode===38){ //up
                            var scrollT = cityDom.scrollTop();
                            if(length===1){
                                return;
                            }
                            if(index===1){
                                activeLi.removeClass("cur").siblings("li").last().addClass("cur");
                                cityDom.scrollTop(length*liHeight);
                            }

                            else if(index!==1 && scrollT>0 && index*liHeight<=scrollT+liHeight){
                                activeLi.removeClass("cur").prev("li").addClass("cur");
                                cityDom.scrollTop(scrollT-liHeight);
                            }
                            else if(index!==1 && (scrollT===0 ||index*liHeight>scrollT+liHeight)){
                                activeLi.removeClass("cur").prev("li").addClass("cur");
                            }
                        }
                        return;
                    }
                    if(event.keyCode === 13){//enter
                        if(citySelect.data.filterData.length===0){//fixed for enter 重置为空值
                            citySelect.data.curCity.code = "" ;
                            citySelect.data.curCity.name = "";
                            return;
                        }
                        if($(setting.container).find("li.cur").length===0){
                            $(setting.container).find("li").first().addClass("cur");
                        }

                        citySelect.data.curCity.code =$(setting.container).find("li.cur").attr("data-code");
                        citySelect.data.curCity.name =$(setting.container).find("li.cur").text();
                        that.setVal(input);
                        that.closeComponent();
                        return;
                    }

                    if(event.keyCode === 8||event.keyCode===46){ //backspace || delete
                        $(input).val("");
                    }

                    if($(input).val()===""){
                        citySelect.renderUnit();
                    }else {
                        citySelect.inputFilter(input);
                    }
                });

                // $(inputC).on('input paste', function() {
                //    // that.inputFilter(this);
                // });

                $(document).on("click",setting.container+" .city-list li:not(.no-city)",function(e){
                    e.stopPropagation();
                    $(this).addClass("cur").siblings(".cur").removeClass("cur");
                    citySelect.data.curCity.code =$(this).attr("data-code");
                    citySelect.data.curCity.name =$(this).text();
                    that.setVal(that.data.componentTrigger);
                    that.closeComponent();

                }).on("click",setting.container+" .city-list .no-city",function(e){
                    e.stopPropagation();
                    that.closeComponent();
                }).on("mouseenter", setting.container+" .city-list li:not(.no-city)", function(){
                    $(this).siblings(".cur").removeClass("cur");
                    $(this).addClass("cur");

                }).on("mouseleave", setting.container+" .city-list li:not(.no-city)",function () {
                    $(this).removeClass("cur");

                }).on("click",setting.container+" .city-unit .group-t",function(e){
                    e.stopPropagation();
                    $(this).addClass("cur").siblings(".cur").removeClass("cur");
                    $(this).closest(".city-unit").find(".tab-item").eq($(this).index()).addClass("cur").siblings(".tab-item.cur").removeClass("cur");

                }).on("click",setting.container+" .city-unit .group-item",function (e) {
                    e.stopPropagation();
                    $(this).addClass("cur").siblings(".cur").removeClass("cur");
                    $(this).closest(".tab-item").find(".city-items").eq($(this).index()).addClass("cur").siblings(".city-items.cur").removeClass("cur");

                }).on("click",setting.container+" .city-unit .city-item",function (e) {
                    e.stopPropagation();
                    citySelect.data.curCity.code =$(this).attr("data-code");
                    citySelect.data.curCity.name =$(this).text();
                    that.setVal(that.data.componentTrigger);
                    that.closeComponent();

                }).on("click",function(e){

                    var $cityComponent = $(e.target).closest("#city-select-box").length||$(e.target).closest(".city-component-wrap").length;
                    if($cityComponent===0){
                        if(citySelect.data.listType===1){
                           var arrayCity = citySelect.data.filterData;
                            if(arrayCity && arrayCity.length>0 ){
                                citySelect.data.curCity.code = arrayCity[0].code;
                                citySelect.data.curCity.name = arrayCity[0].name;
                            }else if(arrayCity.length===0) {
                                citySelect.data.curCity.code="";
                                citySelect.data.curCity.name="";
                            }
                            that.setVal(that.data.componentTrigger);
                        }
                        that.closeComponent();
                    }
                });
            }
        };
        citySelect.init();
    };

}(jQuery);


