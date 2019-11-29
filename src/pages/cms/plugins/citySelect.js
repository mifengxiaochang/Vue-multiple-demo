!function ($) {
    'use strict';

    $.fn.citySelect = function (options) {
        var inputC = this; //输入框
        var cityData={
            "中国":"阿尔山!Aershan-aes@YIE|北京!beijin-bj@PEK|邦达@BPX|包头@BAV|巴彦淖尔@RLK|北海@BHY|常州@CZX|长白山@NBS|朝阳@CHG|成都@CTU|赤峰@CIF|池州@JUH|长春@CGQ|长沙@CSX|长治@CIH|重庆@CKG|大连@DLC|大理@DLU|丹东@DDG|稻城@DCY|大庆@DQA|大同@DAT|达州@DAX|德宏芒市@LUM|敦煌@DNH|鄂尔多斯@DSN|恩施@ENH|福州@FOC|阜阳@FUG|广州@CAN|贵阳@KWE|桂林@KWL|赣州@KOW|广元@GYS|哈尔滨@HRB|海口@HAK|海拉尔@HLD|哈密@HMI|汉中@HZG|杭州@HGH|黄岩@HYN|淮安@HIA|合肥@HFE|邯郸@HDG|和田@HTN|黄山@TXN|呼和浩特@HET|惠州@HUZ|济南@TNA|济宁@JNG|晋江@JJN|佳木斯@JMU|揭阳@SWA|嘉峪关@JGN|景德镇@JDZ|井冈山@JGS|锦州@JNZ|九江@JIU|九寨沟@JZH|鸡西@JXA|喀什@KHG|克拉玛依@KRY|库尔勒@KRL|库车@KCA|昆明@KMG|拉萨@LXA|兰州@LHW|丽江@LJG|荔波@LLB|连云港@LYG|临沂@LYI|林芝@LZY|六盘水@LPF|柳州@LZH|泸州@LZO|洛阳@LYA|满洲里@NZH|芒市@LUM|绵阳@MIG|牡丹江@MDG|南昌@KHN|南阳@NNY|南京@NKG|南通@NTG|南宁@NNG|那拉提@NLT|宁波@NGB|齐齐哈尔@NDG|秦皇岛（山海关）@SHP|秦皇岛（北戴河）@BPE|青岛@TAO|攀枝花@PZI|普陀山@HSN|庆阳@IQN|三亚@SYX|汕头@SWA|上海虹桥@SHA|上海浦东@PVG|深圳@SZX|沈阳@SHE|石家庄@SJW|思茅@SYM|塔城@TCG|太原@TYN|铜仁@TEN|唐山@TVS|台州@HYN|腾冲@TCZ|天津@TSN|天水@THQ|通化@TNH|通辽@TGO|威海@WEH|潍坊@WEF|温州@WNZ|乌海@WUA|乌兰浩特@HLH|乌鲁木齐@URC|无锡@WUX|武汉@WUH|万州@WXN|武夷山@WUS|十@WDS|泉州@JJN|衢州@JUZ|西安@XIY|西宁@XNN|西双版纳@JHG|锡林浩特@XIL|厦门@XMN|襄阳@XFN|西昌@XIC|兴义@ACX|徐州@XUZ|烟台@YNT|延安@ENY|延吉@YNJ|盐城@YNZ|扬州@YTY|宜宾@YBP|宜春@YIC|伊宁@YIN|义乌@YIW|宜昌@YIH|银川@INC|榆林@UYN|运城@YCU|湛江@ZHA|张家界@DYG|昭通@ZAT|舟山@HSN|遵义@ZYI|郑州@CGO|中卫@ZHY|珠海@ZUH",
            "澳大利亚":"墨尔本@MEL",
            "德国":"法兰克福@FRA",
            "韩国":"济州岛@CJU|首尔@ICN",
            "日本":"名古屋@NGO|大阪@KIX|东京成田@NRT",
            "泰国":"普吉岛@HKT|曼谷@BKK",
            "马来西亚":"吉隆坡@KUL",
            "菲律宾":"马尼拉@MNL",
            "新加坡":"新加坡@SIN",
            "香港":"香港@HKG",
            "澳门":"澳门@MFM",
            "台北":"台北@TPE"
        };
        var defaults = {
            inputComponent: ".city-component",
            cityData: cityData,
            container: "#city-select-box",
            triggerIcon:".icon-city",//组件icon
            htmlTemp: '<div id="city-select-box" class="city-select-box"></div>',
            areaTitle:"选择国家/地区",
            cityTitle:"选择城市",
            hotCity:"热门城市"
        };
        var setting = $.extend({}, defaults, options);
        var setPos = function (e) {
            var left = $(e).offset().left,
                top = $(e).offset().top,
                height = $(e).outerHeight();
            $(setting.container).css({ "left": left + "px", "top": top + height + "px" });
        };
        var citySelect = {
            data: {
                triggerType:0,//0表示输入框点击触发,1表示icon点击触发
                cityData: [], //存储格式为 CKG@重庆,中国
                filterCity: [],//存储输入过滤后的数据
                componentTrigger:{} //控件对应的输入框
            },
            initData: function () {
                var stringTemp=''
                this.data.cityData=[];
                this.data.filterCity=[];
                for (var country in setting.cityData) {

                    if(country===setting.hotCity&& this.data.triggerType===0){
                        continue;
                    }
                    var citys = setting.cityData[country].split("|");
                    for (var i = 0; i < citys.length; i++) {
                        var city = citys[i].split("@"),
                            cityName = city[0].split("!"),
                            code = city[1];//城市三字码
                        stringTemp = code+"@"+cityName[0] + "," + country+"!"+cityName[1];
                        this.data.cityData.push(stringTemp);//存储原始数据,初始化之后不变;
                        this.data.filterCity.push(stringTemp);//初始化过滤后城市数据
                    }
                }
            },

            init: function () {
                this.trigger();
                this.bindEvent();
            },

            setVal:function(input) {
                $(input).val($(setting.container).find("li.active").attr("data-text"));
                $(input).attr("data-cityCode",$(setting.container).find("li.active").attr("_3code"));
                $(input).trigger("change");
            },
            closeComponent:function(){
                $(setting.container).html("");
            },
            renderHtml: function () {
                var lis ="";
                var list ="";
                var width=$(this.data.componentTrigger).outerWidth();
                var arrayCity =this.data.filterCity;
                var length=arrayCity.length;
                var arrItem;
                var showName;
                for(var i = 0; i <length; i++){
                    arrItem=arrayCity[i].split("@");
                    showName=arrItem[1].split("!")[0];
                    lis += '<li _3code="' + arrItem[0]+'" data-text="'+showName+'">' + showName + '</li>';
                }
                list = '<ul class="city-list" style="width: '+width+'px">'+lis+'</ul>';

                if (!$(setting.container).length) {
                    $("body").append(setting.htmlTemp);
                }
                $(setting.container).html(list).find("li:first-child").addClass("active");
            },
            // _renderHtml:function(){
            //     var countryLis = "",
            //         countryList="",
            //         ciytList = "",
            //         cityLis = "";
            //     for (var country in setting.cityData) {
            //         var citys = setting.cityData[country].split("|");
            //         cityLis="";
            //         for (var i = 0; i < citys.length; i++) {
            //             var city = citys[i].split("@"),
            //                 cityName = city[0],
            //                 code = city[1];//城市三字码
            //             cityLis+='<li _3code="'+code+'" data-text="'+cityName+'">'+cityName+'</li>';
            //         }
            //         ciytList ='<ul class="city-son-list"><li class="title">'+setting.cityTitle+'</li>'+cityLis+'</ul>';
            //         countryLis += '<li><span>'+country+'</span><i class="icon-xiangyou"></i>'+ciytList+'</li>';
            //     }
            //
            //     countryList = '<ul class="country-list"><li class="title">'+setting.areaTitle+'</li>'+countryLis+'</ul>'
            //
            //     if (!$(setting.container).length) {
            //         $("body").append(setting.htmlTemp);
            //     }
            //     $(setting.container).html(countryList);
            // },

            trigger: function () {
                var citySelect = this;

                $(inputC).siblings(setting.triggerIcon).click(function(e){
                    e.stopPropagation();
                    citySelect.data.triggerType=1;
                    $(this).parent().find(".text").focus();
                    citySelect.data.componentTrigger=$(this).siblings(setting.inputComponent)[0];
                    setPos(citySelect.data.componentTrigger);

                });
                $(inputC).focus(function(){
                    citySelect.initData();
                    citySelect.inputFilter(this);
                    citySelect.data.componentTrigger=this;
                    setPos(citySelect.data.componentTrigger);
                });

                // $(inputC).change(function() {
                //     citySelect.data.componentTrigger=this;
                //     if(citySelect.data.filterCity.length===1){
                //         citySelect.setVal(citySelect.data.componentTrigger);
                //     }
                //     else {
                //         $(this).attr("data-cityCode","");
                //     }
                // });
            },

            inputFilter: function (input) {
                var inputVal = $.trim($(input).val().toUpperCase());
                var arrayCity =this.data.cityData;
                var length=arrayCity.length;
                this.data.filterCity=[];
                for(var i = 0; i <length; i++){
                    if(!(arrayCity[i].toUpperCase().indexOf(inputVal)===-1)&&(arrayCity[i].toUpperCase().indexOf(setting.hotCity)===-1)){
                        this.data.filterCity.push(arrayCity[i]);
                    }
                }
                this.data.componentTrigger=input;
                if(this.data.triggerType===1){
                    this._renderHtml();
                }
                else {
                    this.renderHtml();
                }
            },

            bindEvent: function () {
                var that =this;
                $(inputC).keyup(function (event) {
                    var input = this;
                    if(event.keyCode === 40||event.keyCode===38){ //up and down
                        var activeLi = $(setting.container).find("li.active");
                        var cityDom =  $(setting.container).find(".city-list");
                        var liHeight = activeLi.outerHeight();
                        var index = activeLi.index()+1;
                        var length=cityDom.children("li").length;
                        if(event.keyCode === 40){ //down
                            if(length===1){
                                return;
                            }

                            if(index<=8){
                                activeLi.removeClass("active").next("li").addClass("active");
                            }

                            if(index>8 && index<length){
                                cityDom.scrollTop((index-8)*liHeight);
                                activeLi.removeClass("active").next("li").addClass("active");
                            }
                            if(index===length){
                                cityDom.scrollTop(0);
                                activeLi.removeClass("active").siblings("li").first().addClass("active");
                            }
                        }
                        if(event.keyCode===38){ //up
                            var scrollT = cityDom.scrollTop();
                            if(length===1){
                                return;
                            }
                            if(index===1){
                                activeLi.removeClass("active").siblings("li").last().addClass("active");
                                cityDom.scrollTop(length*liHeight);
                            }

                            else if(index!==1 &&scrollT>0 && index*liHeight<=scrollT+liHeight){
                                activeLi.removeClass("active").prev("li").addClass("active");
                                cityDom.scrollTop(scrollT-liHeight);
                            }
                            else if(index!==1 && (scrollT=0 ||index*liHeight>scrollT+liHeight)){
                                activeLi.removeClass("active").prev("li").addClass("active");
                            }
                        }
                        return;
                    }
                    if(event.keyCode === 13){//enter
                        if(!$(setting.container).children().length){//fixed for enter 重置为空值
                            return;
                        }
                        that.setVal(input);
                        that.closeComponent();
                        return;
                    }
                    if(event.keyCode===9){//tab
                        that.data.triggerType=0;
                    }

                    if(event.keyCode===8||event.keyCode===46){ //backspace || delete
                        $(input).val("");
                    }
                    that.inputFilter(input);
                });

                $(inputC).on('input paste', function() {
                    that.inputFilter(this);
                });

                $(inputC).keydown(function (event) {
                    if(event.keyCode===9){ //tab
                        that.data.triggerType=0;
                        that.closeComponent();
                    }
                });


                $(document).on("click",setting.container+" .city-list li",function(e){
                    e.stopPropagation();
                    $(this).addClass("active").siblings(".active").removeClass("active");
                    that.setVal(that.data.componentTrigger);
                    that.closeComponent();
                }).on("click",setting.container+" .country-list>li:not(.title)",function(){
                    $(this).addClass("cur").siblings("li").removeClass("cur");
                    $(setting.container).children(".city-son-list").remove();
                    $(setting.container).append($(this).find(".city-son-list").clone());
                }).on("click",setting.container+" .city-son-list li:not(.title)",function(e){
                    e.stopPropagation();
                    $(this).addClass("active").siblings(".active").removeClass("active");
                    that.setVal(that.data.componentTrigger);
                    that.closeComponent();

                }).on("click",function(e){
                    var $cityComponent = $(e.target).closest("#city-select-box").length||$(e.target).closest(".city-component-wrap").length;
                    if($cityComponent===0){
                        that.closeComponent();
                    }

                });

            }
        }
        citySelect.init();
    };

}(jQuery);


