(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * Created by Alex on 2017/7/11.
 * 组件js，公用js
 * 手风琴、弹窗、过渡效果、tab切换，使用bootstrap组件
 * 输入框 使用自研组件
 */

/* ========================================================================
 * Bootstrap: transition.js v3.3.7 过渡效果
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

window.jq = jQuery.noConflict();
+function ($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] };
            }
        }

        return false; // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false;
        var $el = this;
        $(this).one('bsTransitionEnd', function () {
            called = true;
        });
        var callback = function callback() {
            if (!called) $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
    };

    $(function () {
        $.support.transition = transitionEnd();

        if (!$.support.transition) return;

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function handle(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            }
        };
    });
}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7  tab页
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function Tab(element) {
        // jscs:disable requireDollarBeforejQueryAssignment
        this.element = $(element);
        // jscs:enable requireDollarBeforejQueryAssignment
    };

    Tab.VERSION = '3.3.7';

    Tab.TRANSITION_DURATION = 150;

    Tab.prototype.show = function () {
        var $this = this.element;
        var $ul = $this.closest('ul:not(.dropdown-menu)');
        var selector = $this.data('target');

        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return;

        var $previous = $ul.find('.active:last a');
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        });
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        });

        $previous.trigger(hideEvent);
        $this.trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

        var $target = $(selector);

        this.activate($this.closest('li'), $ul);
        this.activate($target, $target.parent(), function () {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            });
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            });
        });
    };

    Tab.prototype.activate = function (element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

        function next() {
            $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);

            element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

            if (transition) {
                element[0].offsetWidth; // reflow for transition
                element.addClass('in');
            } else {
                element.removeClass('fade');
            }

            if (element.parent('.dropdown-menu').length) {
                element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
            }

            callback && callback();
        }

        $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();

        $active.removeClass('in');
    };

    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.tab');

            if (!data) $this.data('bs.tab', data = new Tab(this));
            if (typeof option == 'string') data[option]();
        });
    }

    var old = $.fn.tab;

    $.fn.tab = Plugin;
    $.fn.tab.Constructor = Tab;

    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old;
        return this;
    };

    // TAB DATA-API
    // ============

    var clickHandler = function clickHandler(e) {
        e.preventDefault();
        Plugin.call($(this), 'show');
    };

    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);

/* ========================================================================
 * TRP: swipe.js v1.0.0  当前浏览器环境userAgent判断
 * Author: circle
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response userAgent compoment
 * ======================================================================== */

//判断当前浏览器环境
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    //true为PC端，false为手机端
    return flag;
}

/* ========================================================================
 * TRP: input.js v1.0.0  select原生下拉修改模拟组件
 * Author: Alex
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response input compoment
 * ======================================================================== */
+function ($) {
    'use strict';

    $(document).on("change", ".btn-select .select-ops", function () {
        var obj = $(this).parents('.btn-select');
        //错误下拉框，change后，还原
        if (obj.hasClass('has-error')) {
            obj.removeClass('has-error');
        }
        var $selectText = $(this).find("option:selected").text();
        $(this).parent().find(".select-text").text($selectText);
        $(this).parent().find(".select-box").addClass('active');
    });
}(jQuery);

//新版 显示隐藏成人、儿童、婴儿下拉框
+function ($) {
    'use strict';

    $(".tkt-select").on("click", ".select-box", function () {
        var isOpen = $(".tkt-select").hasClass("focus");
        $(".tkt-select").removeClass("focus");
        if (!isOpen) {
            if ($(this).parents(".tkt-select").hasClass("disabled")) {
                console.log("1");
                return;
            } else {
                $(this).parent().addClass("focus");
            }
        }
    });
}(jQuery);

/* ========================================================================
 * TRP: pannel & cart  v1.0.0  手风琴和购物车
 * Author: Alex
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response pannel & cart compoment
 * ======================================================================== */
+function ($) {
    'use strict';

    $(".panel .panel-title a").click(function () {
        var tar = $(this).parents('.panel');
        if (tar.hasClass('open')) {
            tar.removeClass('open');
            tar.find('.icon-packUp').removeClass('icon-packUp').addClass('icon-unfold');
        } else {
            tar.addClass('open');
            tar.find('.icon-unfold').removeClass('icon-unfold').addClass('icon-packUp');
        }
    });
}(jQuery);

/* ========================================================================
 * TRP: frame.js v1.0.0
 * Author: dengyy
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response pannel compoment
 * ======================================================================== */
+function ($) {
    'use strict';

    $(document).on('click', '.frame .fra-hd', function (e) {
        //ggx 5月30日改
        console.log(e);
        var tar = $(this).parents('.frame');
        if (tar.hasClass('close')) {
            tar.removeClass('close');
            tar.find('.icon-unfold').removeClass('icon-unfold').addClass('icon-packUp');
        } else {
            tar.addClass('close');
            tar.find('.icon-packUp').removeClass('icon-packUp').addClass('icon-unfold');
        }
    });
}(jQuery);

/* ========================================================================
 * TRP: coupon.js v1.0.0
 * Author: dengyy
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response coupon compoment
 * ======================================================================== */
+function ($) {
    'use strict';

    var $coupon;
    //  var coupon_path = $(".coupon-path").text();
    var index = 0;
    $(".coupon").on("click", function () {
        $coupon = $(this).parents(".coupon-box");
    });
    $(".check-available").click(function () {
        $(".check-available").is(":checked") ? $(".coupon-item.disabled").hide() : $(".coupon-item.disabled").show();
    });
}(jQuery);

/* ========================================================================
 * TRP: select 用户管理模块特有 9-1-x
 * Author: yzy
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response coupon compoment
 * ======================================================================== */

+function ($) {
    //select
    $(document).on("click", ".select-show", function () {
        var select = $(this).closest(".select"),
            list = select.find(".select-list"),
            isOpen = list.hasClass("db");
        if (select.hasClass("select-disable")) {
            return;
        }
        $(".select-list").removeClass("db");
        $(".select").removeClass("select-focus");
        if (!isOpen) {
            list.addClass("db");
            select.addClass("select-focus");
        }
    }).on("click", ".select-option", function () {
        var select = $(this).closest(".select");
        select.find(".select-text").html($(this).children('a').html());
        select.find(".select-text.has-prompt").removeClass('has-prompt');
        select.find("input").val($(this).attr("data-value"));
        select.find(".select-list").removeClass("db");
        select.removeClass("select-focus");
    });

    $(document).on("click", function (e) {
        var select = $(e.target).closest(".select"),
            layer = $(e.target).closest(".layer"),
            tkt_select = $(e.target).closest(".tkt-select");
        if (select.length == 0) {
            $(".select-list").removeClass("db");
            $(".select").removeClass("select-focus");
        }
        if (layer.length == 0) {
            $('.layer').removeClass('layer-on');
            $('.layer-pass .layer-arrow').removeClass('icon-xiangshang');
        }
        if (tkt_select.length == 0) {
            $('.tkt-select').removeClass('focus');
        }
    });
    $('.user-frame .fill-prompt .i-trigger').click(function () {
        $(this).parent().toggleClass('down');
    });
}(jQuery);

/* ========================================================================
 * TRP: 日历 v1.0.0
 * Author: yzy
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response coupon compoment
 * ======================================================================== */

+function ($) {
    if ($.datepicker != undefined) {
        $.datepicker.regional['zh-CN'] = {
            closeText: '关闭',
            prevText: '<上月',
            nextText: '下月>',
            currentText: '今天',
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
            weekHeader: '周',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: '年' };
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
    }
}(jQuery);
'use strict';

/**
 * Created by Alex on 2017/7/11.
 * 页面js
 */

var jq = jQuery.noConflict();
//初始化常量对象 by zx
var options = { //首页下拉框option数值对象
    option_0: "0"
};

(function ($) {
    /**
     * flight
     */
    // cabin
    $('.cabin').on('click', function () {
        $(this).siblings('.cabin').removeClass('cabin-on');
        $(this).addClass('cabin-on');
    });

    // // order-item
    // $('.order-item').on('click', function(){
    //     var _this = $(this),
    //         _icon = $(this).children('.order-icon');
    //     _this.siblings('.order-item').removeClass('order-on');
    //     _this.siblings('.order-item-x').removeClass('order-on');
    //     _this.addClass('order-on');
    //     _this.siblings('.order-item').children('.order-icon').addClass('icon-order1').removeClass('icon-order0 icon-order');
    //     if(_icon.hasClass('icon-order0')) {
    //         _icon.removeClass('icon-order0').addClass('icon-order');
    //     }else if(_icon.hasClass('icon-order')) {
    //         _icon.removeClass('icon-order').addClass('icon-order0');
    //     }else {
    //         _icon.removeClass('icon-order1').addClass('icon-order0');
    //     }
    // });
    //
    // // order-item-x
    // $('.order-item-x').on('click', function(){
    //     var _this = $(this),
    //         _icon = $(this).children('.order-icon');
    //     _this.siblings('.order-item').removeClass('order-on');
    //     _this.addClass('order-on');
    //     _this.siblings('.order-item').children('.order-icon').addClass('icon-order1').removeClass('icon-order0 icon-order');
    // });
    //航班结果列表交互
    jq(document).on("click", ".cabins .cabins-item:not('.sell-out,.no-cabin')", function (e) {
        if ($(e.target).closest('.n-cabins_badge').hasClass('n-cabins_badge')) {
            return;
        }
        var index = jq(this).parent().find(".cabins-item").index(jq(this));
        var cabinsDetail = jq(this).closest(".flights-item").find(".cabins-detail .detail-item").get(index); //.detail-item");
        var flightTriggers = jq(this).closest(".flights-con").find(".flight-trigger");
        var flightsItemDetails = jq(this).closest(".flights-con").find(".flights-item-detail"); //航班详情
        var detailItems = jq(this).closest(".flights-con").find(".detail-item");
        var cabinsItems = jq(this).closest(".flights-con").find(".cabins-item");
        flightTriggers.removeClass("open");
        flightsItemDetails.removeClass("down");
        if (!jq(".cabins-detail").is(":visible")) {
            //telphone
            var bk;
            if (jq(this).next(".detail-item").length === 0) {
                detailItems.removeClass("active");
                cabinsItems.removeClass("cur");
                bk = jq(cabinsDetail).clone(true).addClass("active");
                jq(this).addClass("cur").after(bk);
            } else {

                // 价格是否展开
                if (!jq(this).hasClass("cur")) {
                    //未展开
                    cabinsItems.removeClass("cur");
                    jq(this).addClass("cur");
                    detailItems.removeClass("active");
                    jq(this).next(".detail-item").addClass("active");
                } else {
                    jq(this).removeClass("cur");
                    jq(this).next(".detail-item").removeClass("active");
                }
            }
        } else {

            // 价格是否展开
            if (!jq(this).hasClass("cur")) {
                //未展开
                cabinsItems.removeClass("cur");
                jq(this).addClass("cur");
                detailItems.removeClass("active");
                jq(cabinsDetail).addClass("active");
            } else {
                jq(this).removeClass("cur");
                jq(cabinsDetail).removeClass("active");
            }
        }
    }).on("click", ".flights-item .flight-trigger", function () {
        var flightsItemDetailsAll = jq(this).closest(".flights-con").find(".flights-item-detail");
        var flightsItemDetails = jq(this).closest(".flights-item").find(".flights-item-detail");
        var detailItems = jq(this).closest(".flights-con").find(".detail-item");
        var cabinsItems = jq(this).closest(".flights-con").find(".cabins-item");
        var flightTriggers = jq(this).closest(".flights-con").find(".flight-trigger");

        flightsItemDetailsAll.removeClass("down");
        cabinsItems.removeClass("cur");
        detailItems.removeClass("active");
        if (!jq(this).closest(".flights-item").find(".flights-detail-con").is(":visible")) {
            //telphone
            var bk;
            if (jq(this).closest(".flights-info").next(".flights-item-detail").length === 0) {
                jq(this).addClass("open");
                bk = flightsItemDetails.clone(true).addClass("down");
                jq(this).closest(".flights-info").after(bk);
            } else {
                if (!jq(this).hasClass("open")) {
                    // 航班详情是否展开
                    flightTriggers.removeClass("open");
                    jq(this).addClass("open");
                    flightsItemDetails.addClass("down");
                } else {
                    jq(this).removeClass("open");
                }
            }
        } else {
            if (!jq(this).hasClass("open")) {
                // 航班详情是否展开
                flightTriggers.removeClass("open");
                jq(this).addClass("open");
                flightsItemDetails.addClass("down");
            } else {
                jq(this).removeClass("open");
            }
        }
    }).on("click", ".new-route .btn-route", function () {
        var routeItem = jq(this).closest(".new-route");
        if (!routeItem.hasClass("active")) {
            routeItem.addClass("active").siblings(".new-route").removeClass("active").find(".btn-route").removeClass("selected").find(".btn-txt").text("选择");
            jq(this).addClass("selected").find(".btn-txt").text("取消");
        } else {
            routeItem.removeClass("active").find(".cabins-item.cur").removeClass("cur");
            jq(this).removeClass("selected").find(".btn-txt").text("选择");
        }
    }).on("click", ".new-route .trigger-more", function (e) {
        var changeCabin = jq(this).siblings(".change-cabine-detail").clone(true);
        //更多详情，复制html到页面 5-4-1-2
        jq(".change-cabine-modal").find(".modal-body").html(changeCabin);
        return false;
    }).on("click", ".change-route-module .change-route-t", function () {
        var parent = jq(this).closest(".change-route-module");
        parent.hasClass("close") ? parent.removeClass("close") : parent.addClass("close");
    });

    //按钮下一步操作
    jq(document).on("change", ".must-know .check-know", function () {
        if (jq(this).prop("checked")) {
            $(this).closest(".row-btns").find(".btn:first:not(.return-btn)").removeClass("disabled");
            $(this).closest(".row-btns").find(".btn.oper-btn").removeClass("disabled");
        } else {
            $(this).closest(".row-btns").find(".btn:first:not(.return-btn)").addClass("disabled");
            $(this).closest(".row-btns").find(".btn.oper-btn").addClass("disabled");
        }
    });

    // select-patch
    $('.select-patch select').on('change', function () {
        var $address = jq(".area-patchs");
        if (this.value == 0) {
            $address.addClass("hide");
        } else {
            $address.removeClass("hide");
        }
    });

    // initOption
    function _initOption(select, data) {
        var lists = select,
            str = '',
            html = '<option value="" class="hidden" selected disabled>请选择</option>',
            length = data && data.length;
        for (var i = 0; i < length; i += 1) {
            str = '<option value="' + data[i] + '">' + data[i] + '</option>';
            html += str;
        }
        lists.html('').append(html);
    }

    // resetOption
    function _resetOption(select) {
        var _select = select.prev(".select-box");
        _select.removeClass('active').children('.select-text').text();
    }

    // city province
    var json = '{"北京市":["朝阳区","海淀区","通州区","房山区","丰台区","昌平区","大兴区","顺义区","西城区","延庆县","石景山区","宣武区","怀柔区","崇文区","密云县","东城区","平谷区","门头沟区"],"上海市":["松江区","宝山区","金山区","嘉定区","南汇区","青浦区","浦东新区","奉贤区","徐汇区","静安区","闵行区","黄浦区","杨浦区","虹口区","普陀区","闸北区","长宁区","崇明县","卢湾区"],"天津市":["和平区","北辰区","河北区","河西区","西青区","津南区","东丽区","武清区","宝坻区","红桥区","大港区","汉沽区","静海县","塘沽区","宁河县","蓟县","南开区","河东区"],"重庆市":["江北区","渝北区","沙坪坝区","九龙坡区","万州区","永川市","南岸区","酉阳县","北碚区","涪陵区","秀山县","巴南区","渝中区","石柱县","忠县","合川市","大渡口区","开县","长寿区","荣昌县","云阳县","梁平县","潼南县","江津市","彭水县","綦江县","璧山县","黔江区","大足县","巫山县","巫溪县","垫江县","丰都县","武隆县","万盛区","铜梁县","南川市","奉节县","双桥区","城口县"],"黑龙江省":["哈尔滨市","齐齐哈尔市","鸡西市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区"],"吉林省":["长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州"],"辽宁省":["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"],"内蒙古自治区":["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒盟","阿拉善盟"],"河北省":["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"],"河南省":["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","安阳市","济源市"],"山东省":["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"],"山西省":["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"],"江苏省":["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"],"安徽省":["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","六安市","亳州市","池州市","宣城市"],"陕西省":["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"],"宁夏回族自治区":["银川市","石嘴山市","吴忠市","固原市","中卫市"],"甘肃省":["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"],"青海省":["西宁市","海东市","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州"],"湖北省":["武汉市","黄石市","十堰市","宜昌市","襄阳市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","仙桃市","天门市","潜江市","神农架林区","恩施土家族苗族自治州"],"湖南省":["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州"],"浙江省":["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"],"江西省":["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"],"福建省":["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"],"贵州省":["贵阳市","六盘水市","遵义市","安顺市","毕节市","铜仁市","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州"],"四川省":["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州"],"广东省":["广州市","韶关市","深圳市","珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"],"广西壮族自治区":["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"],"云南省":["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"],"海南省":["海口市","三亚市","儋州市","琼海市","文昌市","东方市","昌江县","陵水县","乐东县","保亭县","五指山市","澄迈县","万宁市","临高县","白沙县","定安县","琼中县","屯昌县"],"新疆维吾尔自治区":["乌鲁木齐市","克拉玛依市","吐鲁番市","哈密市","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","阿克苏地区","克孜勒苏柯尔克孜自治州","喀什地区","和田地区","伊犁哈萨克自治州","塔城地区","阿勒泰地区","石河子市","阿拉尔市","五家渠市","图木舒克市"],"西藏自治区":["拉萨市","日喀则市","昌都市","林芝市","山南市","那曲地区","阿里地区"]}';
    var obj = $.parseJSON(json),
        state = $('.select-state .select-ops'),
        city = $('.select-city .select-ops');

    // init state
    var state_list = [],
        city_list = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key) === true) {
            state_list.push(key);
            //city_list.push(obj[key]);
        }
    }
    _initOption(state, state_list);

    // change city
    state.on('change', function () {
        var state_name = this.value;
        city_list = obj[state_name];
        _initOption(city, city_list);
        _resetOption(city);
    });

    // 选座控制
    $(".choose-set-ul input[type = 'radio']").change(function () {
        $(this).parents('.choose-set-ul').find('li.active').removeClass('active');
        $(this).parents('li').addClass('active');
    });

    jQuery.fn.slide = function (options) {
        jQuery.fn.slide.defaults = {
            effect: "fade",
            autoPlay: false,
            delayTime: 500,
            interTime: 3000,
            triggerTime: 150,
            defaultIndex: 0,
            titCell: ".tab-li",
            mainCell: ".tab-con",
            targetCell: null,
            trigger: "click",
            scroll: 1,
            vis: 1,
            titOnClassName: "tab-li-on",
            autoPage: false,
            prevCell: ".prev",
            nextCell: ".next",
            pageStateCell: ".pageState",
            opp: false,
            pnLoop: true,
            easing: "linear",
            startFun: null,
            endFun: null,
            switchLoad: null
        };
        return this.each(function () {
            var opts = jQuery.extend({}, jQuery.fn.slide.defaults, options),
                effect = opts.effect,
                prevBtn = jQuery(opts.prevCell, jQuery(this)),
                nextBtn = jQuery(opts.nextCell, jQuery(this)),
                pageState = jQuery(opts.pageStateCell, jQuery(this)),
                navObj = jQuery(opts.titCell, jQuery(this)),
                navObjSize = navObj.size(),
                conBox = jQuery(opts.mainCell, jQuery(this)),
                conBoxSize = conBox.children().size(),
                sLoad = opts.switchLoad;
            if (opts.targetCell != null) {
                var tarObj = jQuery(opts.targetCell, jQuery(this));
            }

            // 字符串转换为数字
            var index = parseInt(opts.defaultIndex),
                delayTime = parseInt(opts.delayTime),
                interTime = parseInt(opts.interTime),
                triggerTime = parseInt(opts.triggerTime),
                scroll = parseInt(opts.scroll),
                vis = parseInt(opts.vis),
                autoPlay = !(opts.autoPlay == "false" || opts.autoPlay == false),
                opp = !(opts.opp == "false" || opts.opp == false),
                autoPage = !(opts.autoPage == "false" || opts.autoPage == false),
                loop = !(opts.pnLoop == "false" || opts.pnLoop == false);

            var slideH = 0,
                slideW = 0,
                selfW = 0,
                selfH = 0,
                easing = opts.easing,
                inter = null,
                oldIndex = index;

            // 处理分页
            if (navObjSize == 0) navObjSize = conBoxSize;
            if (autoPage) {
                var tempS = conBoxSize - vis;
                navObjSize = 1 + parseInt(tempS % scroll != 0 ? tempS / scroll + 1 : tempS / scroll);
                if (navObjSize <= 0) navObjSize = 1;
                navObj.html("");
                for (var i = 0; i < navObjSize; i++) {
                    navObj.append("<li>" + (i + 1) + "</li>");
                }
                navObj = jQuery("li", navObj); //重置导航子元素对象
            }

            conBox.children().each(function () {
                //取最大值
                if (jQuery(this).width() > selfW) {
                    selfW = jQuery(this).width();slideW = jQuery(this).outerWidth(true);
                }
                if (jQuery(this).height() > selfH) {
                    selfH = jQuery(this).height();slideH = jQuery(this).outerHeight(true);
                }
            });

            if (conBoxSize >= vis) {
                //当内容个数少于可视个数，不执行效果。
                switch (effect) {
                    case "fold":
                        conBox.css({ "position": "relative", "width": slideW, "height": slideH }).children().css({ "position": "absolute", "width": selfW, "left": 0, "top": 0, "display": "none" });break;
                    case "top":
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + vis * slideH + 'px"></div>').css({ "position": "relative", "padding": "0", "margin": "0" }).children().css({ "height": selfH });break;
                    case "left":
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + vis * slideW + 'px"></div>').css({ "width": conBoxSize * slideW, "position": "relative", "overflow": "hidden", "padding": "0", "margin": "0" }).children().css({ "float": "left", "width": selfW });break;
                    case "leftLoop":
                    case "leftMarquee":
                        conBox.children().clone().appendTo(conBox).clone().prependTo(conBox);
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + vis * slideW + 'px"></div>').css({ "width": conBoxSize * slideW * 3, "position": "relative", "overflow": "hidden", "padding": "0", "margin": "0", "left": -conBoxSize * slideW }).children().css({ "float": "left", "width": selfW });break;
                    case "topLoop":
                    case "topMarquee":
                        conBox.children().clone().appendTo(conBox).clone().prependTo(conBox);
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + vis * slideH + 'px"></div>').css({ "height": conBoxSize * slideH * 3, "position": "relative", "padding": "0", "margin": "0", "top": -conBoxSize * slideH }).children().css({ "height": selfH });break;
                }
            }

            var doStartFun = function doStartFun() {
                if (jQuery.isFunction(opts.startFun)) {
                    opts.startFun(index, navObjSize);
                }
            };
            var doEndFun = function doEndFun() {
                if (jQuery.isFunction(opts.endFun)) {
                    opts.endFun(index, navObjSize);
                }
            };
            var doSwitchLoad = function doSwitchLoad(objs) {
                objs.eq(index).find("img").each(function () {
                    if (typeof jQuery(this).attr(sLoad) != "undefined") {
                        jQuery(this).attr("src", jQuery(this).attr(sLoad)).removeAttr(sLoad);
                    }
                });
            };

            //效果函数
            var doPlay = function doPlay(isFirst) {
                if (oldIndex == index && !isFirst && effect != "leftMarquee" && effect != "topMarquee") return; // 当前页状态不触发效果
                switch (effect) {
                    case "fade":case "fold":case "top":case "left":
                        if (index >= navObjSize) {
                            index = 0;
                        } else if (index < 0) {
                            index = navObjSize - 1;
                        }break;
                    case "leftMarquee":case "topMarquee":
                        if (index >= 1) {
                            index = 1;
                        } else if (index <= 0) {
                            index = 0;
                        }break;
                    case "leftLoop":case "topLoop":
                        var tempNum = index - oldIndex;
                        if (navObjSize > 2 && tempNum == -(navObjSize - 1)) tempNum = 1;
                        if (navObjSize > 2 && tempNum == navObjSize - 1) tempNum = -1;
                        var scrollNum = Math.abs(tempNum * scroll);
                        if (index >= navObjSize) {
                            index = 0;
                        } else if (index < 0) {
                            index = navObjSize - 1;
                        }
                        break;
                }
                doStartFun();

                //处理切换加载
                if (sLoad != null) {
                    doSwitchLoad(conBox.children());
                }

                //处理targetCell
                if (tarObj) {
                    if (sLoad != null) {
                        doSwitchLoad(tarObj);
                    }
                    tarObj.hide().eq(index).animate({ opacity: "show" }, delayTime, function () {
                        if (!conBox[0]) doEndFun();
                    });
                }

                if (conBoxSize >= vis) {
                    //当内容个数少于可视个数，不执行效果。
                    switch (effect) {
                        case "fade":
                            conBox.children().stop(true, true).eq(index).animate({ opacity: "show" }, delayTime, easing, function () {
                                doEndFun();
                            }).siblings().hide();break;
                        case "fold":
                            conBox.children().stop(true, true).eq(index).animate({ opacity: "show" }, delayTime, easing, function () {
                                doEndFun();
                            }).siblings().animate({ opacity: "hide" }, delayTime, easing);break;
                        case "top":
                            conBox.stop(true, false).animate({ "top": -index * scroll * slideH }, delayTime, easing, function () {
                                doEndFun();
                            });break;
                        case "left":
                            conBox.stop(true, false).animate({ "left": -index * scroll * slideW }, delayTime, easing, function () {
                                doEndFun();
                            });break;
                        case "leftLoop":
                            if (tempNum < 0) {
                                conBox.stop(true, true).animate({ "left": -(conBoxSize - scrollNum) * slideW }, delayTime, easing, function () {
                                    for (var i = 0; i < scrollNum; i++) {
                                        conBox.children().last().prependTo(conBox);
                                    }
                                    conBox.css("left", -conBoxSize * slideW);
                                    doEndFun();
                                });
                            } else {
                                conBox.stop(true, true).animate({ "left": -(conBoxSize + scrollNum) * slideW }, delayTime, easing, function () {
                                    for (var i = 0; i < scrollNum; i++) {
                                        conBox.children().first().appendTo(conBox);
                                    }
                                    conBox.css("left", -conBoxSize * slideW);
                                    doEndFun();
                                });
                            }break; // leftLoop end
                        case "topLoop":
                            if (tempNum < 0) {
                                conBox.stop(true, true).animate({ "top": -(conBoxSize - scrollNum) * slideH }, delayTime, easing, function () {
                                    for (var i = 0; i < scrollNum; i++) {
                                        conBox.children().last().prependTo(conBox);
                                    }
                                    conBox.css("top", -conBoxSize * slideH);
                                    doEndFun();
                                });
                            } else {
                                conBox.stop(true, true).animate({ "top": -(conBoxSize + scrollNum) * slideH }, delayTime, easing, function () {
                                    for (var i = 0; i < scrollNum; i++) {
                                        conBox.children().first().appendTo(conBox);
                                    }
                                    conBox.css("top", -conBoxSize * slideH);
                                    doEndFun();
                                });
                            }break; //topLoop end
                        case "leftMarquee":
                            var tempLeft = conBox.css("left").replace("px", "");
                            if (index == 0) {
                                conBox.animate({ "left": ++tempLeft }, 0, function () {
                                    if (conBox.css("left").replace("px", "") >= 0) {
                                        for (var i = 0; i < conBoxSize; i++) {
                                            conBox.children().last().prependTo(conBox);
                                        }conBox.css("left", -conBoxSize * slideW);
                                    }
                                });
                            } else {
                                conBox.animate({ "left": --tempLeft }, 0, function () {
                                    if (conBox.css("left").replace("px", "") <= -conBoxSize * slideW * 2) {
                                        for (var i = 0; i < conBoxSize; i++) {
                                            conBox.children().first().appendTo(conBox);
                                        }conBox.css("left", -conBoxSize * slideW);
                                    }
                                });
                            }break; // leftMarquee end
                        case "topMarquee":
                            var tempTop = conBox.css("top").replace("px", "");
                            if (index == 0) {
                                conBox.animate({ "top": ++tempTop }, 0, function () {
                                    if (conBox.css("top").replace("px", "") >= 0) {
                                        for (var i = 0; i < conBoxSize; i++) {
                                            conBox.children().last().prependTo(conBox);
                                        }conBox.css("top", -conBoxSize * slideH);
                                    }
                                });
                            } else {
                                conBox.animate({ "top": --tempTop }, 0, function () {
                                    if (conBox.css("top").replace("px", "") <= -conBoxSize * slideH * 2) {
                                        for (var i = 0; i < conBoxSize; i++) {
                                            conBox.children().first().appendTo(conBox);
                                        }conBox.css("top", -conBoxSize * slideH);
                                    }
                                });
                            }break; // topMarquee end
                    } //switch end
                }
                navObj.removeClass(opts.titOnClassName).eq(index).addClass(opts.titOnClassName);
                oldIndex = index;
                if (loop == false) {
                    //loop控制是否继续循环
                    nextBtn.removeClass("nextStop");prevBtn.removeClass("prevStop");
                    if (index == 0) {
                        prevBtn.addClass("prevStop");
                    } else if (index == navObjSize - 1) {
                        nextBtn.addClass("nextStop");
                    }
                }
                pageState.html("<span>" + (index + 1) + "</span>/" + navObjSize);
            };
            //初始化执行
            doPlay(true);
            //自动播放
            if (autoPlay) {
                if (effect == "leftMarquee" || effect == "topMarquee") {
                    if (opp) {
                        index--;
                    } else {
                        index++;
                    }inter = setInterval(doPlay, interTime);
                    conBox.hover(function () {
                        if (autoPlay) {
                            clearInterval(inter);
                        }
                    }, function () {
                        if (autoPlay) {
                            clearInterval(inter);inter = setInterval(doPlay, interTime);
                        }
                    });
                } else {
                    inter = setInterval(function () {
                        if (opp) {
                            index--;
                        } else {
                            index++;
                        }doPlay();
                    }, interTime);
                    jQuery(this).hover(function () {
                        if (autoPlay) {
                            clearInterval(inter);
                        }
                    }, function () {
                        if (autoPlay) {
                            clearInterval(inter);inter = setInterval(function () {
                                if (opp) {
                                    index--;
                                } else {
                                    index++;
                                }doPlay();
                            }, interTime);
                        }
                    });
                }
            }
            //鼠标事件
            var mst;
            if (opts.trigger == "mouseover") {
                navObj.hover(function () {
                    index = navObj.index(this);mst = window.setTimeout(doPlay, opts.triggerTime);
                }, function () {
                    clearTimeout(mst);
                });
            } else {
                navObj.click(function () {
                    index = navObj.index(this);doPlay();
                });
            }
            nextBtn.click(function () {
                if (loop == true || index != navObjSize - 1) {
                    index++;doPlay();
                }
            });
            prevBtn.click(function () {
                if (loop == true || index != 0) {
                    index--;doPlay();
                }
            });
        });
    };

    //4-4-1特殊info
    $('.fills-box .icon-noticeInfo').click(function () {
        $(this).parent().toggleClass('open');
    });
    //9-2加的通用头部点击事件 2017-12-20 by alex
    $('.layer-text').click(function () {
        $(this).parent().toggleClass('active');
    });
    $('.layer-li a').click(function () {
        $(this).parent().find('.active').removeClass('active');
        $(this).toggleClass('active');
    });

    $(".wcm-nav-list").on("click", ".nav-hre-f", function () {
        if (!$(this).find("i").length) {
            $(this).closest(".wcm-nav-list").find(".nav-hre-t").removeClass("active");
            $(this).addClass("active").closest("li").addClass("active").siblings(".active").removeClass("active").find(".active").removeClass("active");
        }
        $(this).closest("li").hasClass("active") ? $(this).find("i").attr("class", "icon-arrowdown").closest("li").removeClass("active").find(".wcm-nav-sub").slideUp() : $(this).find("i").attr("class", "icon-arrowup").closest("li").addClass("active").find(".wcm-nav-sub").slideDown();
    }).on("click", ".nav-hre-t", function () {
        $(this).closest(".wcm-nav-list").find(".nav-hre-t").removeClass("active");
        $(this).closest(".wcm-nav-list").find(".nav-hre-f").removeClass("active");
        $(this).addClass("active");
    });

    //首页nav 二级底部
    $(".nav-li").mouseover(function () {
        var h = $(this).find(".nav-sub").height();
        if (!h) {
            //hover首页 ，返回
            return;
        }
        $(".nav-bg").height(h);
        $(".nav-bg").show();
    });
    $(".nav-li").mouseout(function () {
        $(".nav-bg").height(0);
        $(".nav-bg").hide();
    });

    //预值机服务单选框
    $("#chk-yes").bind("click", function () {
        $("#chk-p-yes").show();
        $("#chk-p-no").hide();
    });
    $("#chk-no").bind("click", function () {
        $("#chk-p-yes").hide();
        $("#chk-p-no").show();
    });
})(jQuery);
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function warn(msg) {
    console.error('[Trp 警告]: ' + msg);
}
var targetStack = [];

function pushStack(fn) {
    targetStack.push(fn);
}

function documentState(cb, trp) {
    document.onreadystatechange = completeFun;
    var state = {
        interactive: function interactive() {
            trp._isinteractive = true;
        },
        complete: function complete() {
            trp._iscomplete = true;
        }
    };
    function completeFun() {
        state[document.readyState]();
        cb(document.readyState);
    }
}

function noop(a, b, c) {}
function polyfillBind(fn, ctx) {
    function boundFn(a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    boundFn._length = fn.length;
    return boundFn;
}
function nativeBind(fn, ctx) {
    return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 *
 * @param {*} obj
 * @param {*} key
 * @decr 检查对象适合有指定的健
 */
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
/**
 *
 * @param {*} str
 * @decr 检查是否以 $ or _开头
 */
function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5f;
}
/**
 *
 * @param {*} to
 * @param {*} _from
 * @decr 浅拷贝一个对象的属性
 */
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}
/**
 *
 * @param {*} data
 * @param {*} trp
 * @decr 获取data返回的对象
 */
function getData(data, trp) {
    try {
        return data.call(trp, trp);
    } catch (e) {
        warn(e, trp, 'data()');
        return {};
    }
}

var _toString = Object.prototype.toString;
/**
 * 针对普通对象的严格对象类型检查
 * 检查是否是对象.
 */
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
function mergeOption(target, varArgs) {
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}
function initMethods(trp, methods) {
    var data = getData(trp.$options.data, trp);
    for (var key in methods) {
        {
            //如果在methods里面写的方法不是一个函数的话
            if (typeof methods[key] !== 'function') {
                warn('"在方法名定义中方法 "' + key + '" 的类型是"' + (0, _typeof3.default)(methods[key]) + '你正确地引用了这个函数吗?', trp);
            }
            //如果在methods里面写的方法名与data中的方法名重复的话
            if (data && hasOwn(data, key)) {
                warn('methods中定义的 "' + key + '" 已经定义在data里面了.', trp);
            }
            //如果在methods里面写的方法名与trp实例的方法重复的话
            if (key in trp && isReserved(key)) {
                warn('方法 "' + key + '" 与现有的trp实例方法冲突. ' + '避免以_或者$符号开头');
            }
        }
        trp[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], trp);
    }
}
function initData(trp, data) {
    var data = trp.$options.data;
    data = trp._data = typeof data === 'function' ? getData(data, trp) : data || {};
    if (!isPlainObject(data)) {
        data = {};
        warn('data 函数应该返回一个对象', trp);
    }
    // proxy data on instance
    var keys = (0, _keys2.default)(data);
    var methods = trp.$options.methods;
    var i = keys.length;
    while (i--) {
        var key = keys[i];
        {
            if (methods && hasOwn(methods, key)) {
                warn('data中定义的属性 "' + key + '" 已经定义在methods里面了.', trp);
            }
        }
        trp[key] = data[key];
    }
}
function initInteractive(trp, interactive) {
    var interactive = trp.$options.interactive;
    if (typeof interactive !== 'function') {
        warn(' interactive 必须是个函数', trp);
    } else {
        bind(trp.$options.interactive, trp)();
    }
}
function initComplete(trp, complete) {
    var complete = trp.$options.complete;
    if (typeof complete !== 'function') {
        warn(' complete 必须是个函数', trp);
    } else {
        pushStack(bind(trp.$options.complete, trp));
    }
}
function initEvent(trp, bindEvent) {
    var bindEvent = trp.$options.bindEvent;
    if (typeof bindEvent !== 'function') {
        warn(' bindEvent 必须是个函数', trp);
    } else {
        pushStack(bind(bindEvent, trp));
    }
}
function callHook(trp) {
    documentState(function (hook) {
        var handlers = trp.$options[hook];
        if (hook === 'interactive') {
            console.log('这里写interactive的一些逻辑');
        } else if (hook === 'complete') {
            for (var i = 0; i < targetStack.length; i++) {
                targetStack[i]();
            }
        }
    }, trp);
}
function getRoute(trp) {
    var route = trp.$options.route;
    var id = document.getElementsByTagName('body')[0].getAttribute('id');
    if (!route) {
        warn('你可能忘了需要在定义一个route', trp);
        return false;
    }
    if (typeof route !== 'string') {
        warn(' route 必须是个字符串', trp);
        return false;
    }
    if (!id) {
        //warn('你可能忘了需要在页面的body上加上唯一的id值,最好是页面的编号', trp);
        return false;
    }
    return route === document.getElementsByTagName('body')[0].getAttribute('id');
}
function Trp(options) {
    if (!(this instanceof Trp)) {
        warn('Trp 是个构造函数，应该以new来创建实例使用');
    }
    this._init(options);
}

Trp.prototype = {
    _init: function _init(options) {
        var trp = this;
        trp.$options = options || {}; //这里可以用函数处理options，得到处理后的$options

        if (getRoute(trp)) {
            this.initLifecycle(trp);
            this.initState(trp);
            callHook(trp);
        }
    },

    initLifecycle: function initLifecycle(trp) {
        var opts = trp.$options;
        trp._isinteractive = false; //页面可交互
        trp._iscomplete = false; //页面加载完成

        if (opts.complete) {
            initComplete(trp, opts.complete);
        }
        if (opts.interactive) {
            initInteractive(trp, opts.interactive);
        }
    },
    initState: function initState(trp) {
        trp._watchers = [];
        var opts = trp.$options;

        if (opts.methods) {
            initMethods(trp, opts.methods);
        }
        if (opts.data) {
            initData(trp, opts.data);
        }
        if (opts.bindEvent) {
            initEvent(trp, opts.bindEvent);
        }
    }
};
"use strict";

//新增工具函数 关于构造函数属性的设置 by ggx
function editOpts(Constr) {
    var storedInstance = null;
    return function (opts) {
        function getter() {
            // 获取侧边栏函数实例
            if (storedInstance == null) {
                storedInstance = new Constr();
            }
            return storedInstance;
        }
        function setter(opts) {
            var instance = getter(); // 获取Sider函数的实例
            for (var i in opts) {
                if (instance.hasOwnProperty(i)) {
                    // 方式跟原型链上的属性冲突
                    instance[i] = opts[i];
                }
            }
            return instance;
        }
        return setter(opts);
    };
}
//继承公共方法函数Mixin receivingClass继承givingClass
function augment(receivingClass, givingClass) {
    // 只提供特定的方法

    for (var methodName in givingClass.__proto__) {
        // 确保接受类不包含所处理方法的同名方法
        if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
            receivingClass.prototype[methodName] = givingClass.__proto__[methodName];
        }
    }
    return receivingClass;
}
function debounce(action, idle) {
    var last;
    return function () {
        var ctx = this,
            args = arguments;
        clearTimeout(last);
        last = setTimeout(function () {
            action.apply(ctx, args);
        }, idle);
    };
}
'use strict';

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Created by zx on 2018/10/8.
 * 西藏航 js
 */
window.jq = jQuery.noConflict();

(function ($) {
    // select-cert
    $('.select-cert select').on('change', function () {
        var $address = jq('.area-certs');
        if (this.value == 0) {
            $address.eq(1).addClass('hide');
            $address.eq(0).removeClass('hide');
        } else {
            $address.eq(0).addClass('hide');
            $address.eq(1).removeClass('hide');
        }
    });

    //支付页面 选择支付方式 by mjg
    jq('.pay-discount-detail').hide();
    $('.pay-li').on('click', '.radio', function () {
        jq('.pay-discount-detail').empty();
        if (jq(this).nextAll().siblings('.pay-discount').length > 0) {
            var til = jq(this).parent().attr('discount-data');
            if (til) {
                var tilHtml = '<span>' + til + '</span>';
                jq('.pay-discount-detail').append(til);
                jq('.pay-discount-detail').show();
            } else {
                jq('.pay-discount-detail').hide();
            }
        } else {
            jq('.pay-discount-detail').hide();
        }
    });

    jq('.server-items').on('click', '.item-text', function () {
        jq(this).parent().find('.item-text').each(function () {
            if (jq(this).hasClass('cur')) {
                jq(this).removeClass('cur');
            }
        });
        jq(this).addClass('cur');
        var num = 0;
        jq(this).parent().find('.item-text').each(function (index) {
            if (jq(this).hasClass('cur')) {
                num = index;
            }
        });
        jq(this).parent().next().find('.item-box').each(function () {
            if (jq(this).hasClass('cur')) {
                jq(this).removeClass('cur');
            }
        });
        jq(this).parent().next().find('.item-box').eq(num).addClass('cur');
    });
    jq('.item-con .item-box').on('click', '.item-link', function () {
        var flag = jq(this).closest('.item-box').hasClass('cur');
        // jq(this).closest(".item-con").find(".item-box").each(function () {
        //    if(jq(this).hasClass("cur")){
        //        jq(this).removeClass("cur");
        //    }
        // });
        if (!flag) {
            jq(this).closest('.item-box').addClass('cur');
        } else {
            jq(this).closest('.item-box').removeClass('cur');
        }
    });
})(jQuery);
//藏航乘客选择js逻辑
+function ($) {
    var seleObjPassenger = {};
    var seleObjArmy = {};
    var passengerSelect = {
        // 初始化-默认
        passengerObj: { adult: 1, child: 0, baby: 0 },
        armyObj: { soldier: 0, police: 0 },
        check: null,
        init: function init(thi) {
            var _thi = this;
            var add = thi ? thi.find('.icon-add') : $('.psg-num .icon-add');
            var cut = thi ? thi.find('.icon-cut') : $('.psg-num .icon-cut');
            add.each(function (el) {
                var $this = $(this);
                var tktSelect = $this.parents('.tkt-select');
                var psgNum = tktSelect.find('.psg-number');
                var index = $this.parents('.select-li').data('index');
                var $input = $this.siblings('.psg-input');
                switch ($this.data('type')) {
                    case 'adult':
                        $input.text(_thi.passengerObj.adult);
                        for (var i = 0; i < psgNum.length; i++) {
                            if (index == $(psgNum[i]).data('index')) {
                                $(psgNum[i]).text(_thi.passengerObj.adult);
                            }
                        }
                        break;
                    case 'child':
                        $input.text(_thi.passengerObj.child);
                        for (var i = 0; i < psgNum.length; i++) {
                            if (index == $(psgNum[i]).data('index')) {
                                $(psgNum[i]).text(_thi.passengerObj.child);
                            }
                        }
                        break;
                    case 'baby':
                        $input.text(_thi.passengerObj.baby);
                        for (var i = 0; i < psgNum.length; i++) {
                            if (index == $(psgNum[i]).data('index')) {
                                $(psgNum[i]).text(_thi.passengerObj.baby);
                            }
                        }
                        break;
                    case 'soldier':
                        $input.text(_thi.armyObj.soldier);
                        for (var i = 0; i < psgNum.length; i++) {
                            if (index == $(psgNum[i]).data('index')) {
                                $(psgNum[i]).text(_thi.armyObj.soldier);
                            }
                        }
                        break;
                    case 'police':
                        $input.text(_thi.armyObj.police);
                        for (var i = 0; i < psgNum.length; i++) {
                            if (index == $(psgNum[i]).data('index')) {
                                $(psgNum[i]).text(_thi.armyObj.police);
                            }
                        }
                        break;
                }
            });
            cut.each(function (el) {
                var $this = $(this),
                    $input = $this.siblings('.psg-input'),
                    num = parseInt($input.text());
                if (num === 0) {
                    $this.addClass('disabled');
                } else {
                    $this.removeClass('disabled');
                }
            });
            var $totalNum = thi ? thi.parents('.tkt-select').find('.total-num') : $('.tkt-select').find('.total-num');

            for (var i = 0; i < $totalNum.length; i++) {
                if ($($totalNum[i]).data('type') === 'psg') {
                    $($totalNum[i]).text(_thi.passengerObj.adult + _thi.passengerObj.child + _thi.passengerObj.baby);
                } else {
                    $($totalNum[i]).text(_thi.armyObj.soldier + _thi.armyObj.police);
                }
            }
            var info = {};
            if (_thi.check) {
                info = _thi.check(thi);
            } else {
                info.res = false;
            }
            if (info.res) {
                add.each(function (el) {
                    var $el = $(this);
                    if ($el.data('type') === 'adult') {
                        if (info.adult) {
                            $el.removeClass('disabled');
                        } else {
                            $el.addClass('disabled');
                        }
                    }
                    if ($el.data('type') === 'child') {
                        if (info.child) {
                            $el.removeClass('disabled');
                        } else {
                            $el.addClass('disabled');
                        }
                    }
                    if ($el.data('type') === 'baby') {
                        if (info.baby) {
                            $el.removeClass('disabled');
                        } else {
                            $el.addClass('disabled');
                        }
                    }
                    if ($el.data('type') === 'soldier') {
                        if (info.soldier) {
                            $el.removeClass('disabled');
                        } else {
                            $el.addClass('disabled');
                        }
                    }
                    if ($el.data('type') === 'police') {
                        if (info.police) {
                            $el.removeClass('disabled');
                        } else {
                            $el.addClass('disabled');
                        }
                    }
                });
            }
            return this;
        },
        // 初始化-填充值
        reset: function reset(adult, child, baby, soldier, police) {
            this.passengerObj = { adult: adult, child: child, baby: baby };
            this.armyObj = { soldier: soldier, police: police };

            this.init();
        },
        initial: function initial(el, type) {
            var thi = this;
            // thi.init(el);

            if (type === 'ticket') {
                thi.check = thi.checkPsgNum;
            }
            if (type === 'machinewine') {
                thi.check = thi.checkPsgNumMW;
            }

            //加
            $(el).find('.icon-add').off('click').on('click', function () {
                var $this = $(this);
                if ($this.data('type') === 'soldier' || $this.data('type') === 'police') {
                    thi.passengerObj = { adult: 0, child: 0, baby: 0 };
                    //police solider不同时存在
                    if ($this.data('type') === 'soldier') {
                        thi.armyObj.police = 0;
                    } else {
                        thi.armyObj.soldier = 0;
                    }
                } else {
                    thi.armyObj = { soldier: 0, police: 0 };
                }
                // thi.init(el);
                var $input = $this.siblings('.psg-input'),
                    num = parseInt($input.text()),
                    index = $this.parents('.select-li').data('index'),
                    tktSelect = $this.parents('.tkt-select'),
                    psgNum = tktSelect.find('.psg-number');
                if ($this.hasClass('disabled')) {
                    return;
                }
                num = num + 1;
                thi.editPagArmy($this, num);
                var info = thi.check($this);

                if (!info.res) {
                    thi.editPagArmy($this, num - 1);
                    return;
                } else {
                    thi.init(el);
                }
                $input.text(num);
                if (num > 0) {
                    $this.siblings('.icon-cut').removeClass('disabled');
                }
                for (var i = 0; i < psgNum.length; i++) {
                    if (index == $(psgNum[i]).data('index')) {
                        $(psgNum[i]).text(num);
                    }
                }
                $(el).trigger('reset', [thi.passengerObj, thi.armyObj, $this.data('type')]);
            });
            //减
            $(el).find('.icon-cut').off('click').on('click', function () {
                var $this = $(this),
                    $input = $this.siblings('.psg-input'),
                    num = parseInt($input.text()),
                    index = $this.parents('.select-li').data('index'),
                    tktSelect = $this.parents('.tkt-select'),
                    numT = parseInt(tktSelect.find('.total-num').text()),
                    psgNum = tktSelect.find('.psg-number');
                if (num > 0) {
                    num--;
                    numT--;
                }
                thi.editPagArmy($this, num);
                if ($this.data('type') === 'adult') {
                    if (thi.passengerObj.child > thi.passengerObj.adult + 1) {
                        if (thi.passengerObj.adult == 1) {
                            if (thi.passengerObj.baby > 0) {
                                thi.passengerObj.child = 2;
                            } else {
                                thi.passengerObj.child = 3;
                            }
                        }
                    }
                    if (thi.passengerObj.adult == 0) {
                        thi.passengerObj.child = 0;
                    }
                    if (thi.passengerObj.baby > thi.passengerObj.adult) {
                        thi.passengerObj.baby = thi.passengerObj.adult;
                    }
                }
                var info = thi.check($this);
                if (!info.res) {
                    thi.editPagArmy($this, num + 1);
                    return;
                } else {
                    thi.init(el);
                }
                for (var i = 0; i < psgNum.length; i++) {
                    if (index == $(psgNum[i]).data('index')) {
                        $(psgNum[i]).text(num);
                    }
                }
                //减到0时 减号disable
                if (num <= 0) {
                    $this.addClass('disabled');
                }
                $(el).trigger('reset', [thi.passengerObj, thi.armyObj, $this.data('type')]);
            });
            //问号按钮的展开隐藏
            $('.fill-prompt-module .i-trigger').click(function () {
                $(this).parent().toggleClass('down');
            });

            return this;
        },
        //乘客数量校验（机票）
        checkPsgNum: function checkPsgNum(el) {
            var obj = {
                res: true,
                adult: true,
                child: true,
                baby: true,
                soldier: true,
                police: true
            };
            if (this.passengerObj.adult > 5 || this.passengerObj.child > 3) {
                obj.res = false;
            } else if (this.passengerObj.baby > this.passengerObj.adult) {
                obj.res = false;
            } else if (this.passengerObj.adult + this.passengerObj.child > 5) {
                obj.res = false;
            } else {
                obj.res = true;
            }
            //儿童+成人 小于5
            if (this.passengerObj.child + this.passengerObj.adult >= 5 || this.passengerObj.adult === 5) {
                obj.adult = false;
            }
            //成人=0 ，儿童+成人 >= 5
            if (this.passengerObj.adult === 0 || this.passengerObj.child + this.passengerObj.adult >= 5 || this.passengerObj.child >= 3) {
                obj.child = false;
            }
            //成人=1 ，儿童+婴儿 >= 4
            if (this.passengerObj.adult === 1) {
                if (this.passengerObj.baby === 1 && this.passengerObj.child > this.passengerObj.adult) {
                    this.passengerObj.child = 1;
                } else if (this.passengerObj.baby === 0 && this.passengerObj.child > 2) {
                    this.passengerObj.child = 2;
                    obj.baby = true;
                }
                if (this.passengerObj.child + this.passengerObj.baby >= 2 || this.passengerObj.child > 2) {
                    obj.child = false;
                    // obj.baby = false;
                }
            }
            if (this.passengerObj.baby === 2) {
                if (this.passengerObj.child >= this.passengerObj.adult) {
                    obj.child = false;
                    this.passengerObj.child = 2;
                }
            }
            //婴儿数<=成人
            // if (this.passengerObj.baby === 0 && this.passengerObj.child >= 2) {
            // 	obj.child = false;
            // }
            if (this.passengerObj.adult === 0 || this.passengerObj.baby >= this.passengerObj.adult || this.passengerObj.baby >= 2) {
                obj.baby = false;
            }
            //soldier>1
            if (this.armyObj.soldier >= 1) {
                obj.soldier = false;
            }
            //soldier>1
            if (this.armyObj.police >= 1) {
                obj.police = false;
            }
            return obj;
        },
        // 乘客数量校验（机酒）
        checkPsgNumMW: function checkPsgNumMW(el) {
            var obj = {
                res: true,
                adult: true,
                child: true,
                baby: true,
                soldier: true,
                police: true
            };

            if (this.passengerObj.child + this.passengerObj.adult >= 5) {
                obj.adult = false;
                obj.child = false;
            }
            if (this.passengerObj.child >= this.passengerObj.adult) {
                obj.child = false;
                this.editPagArmy($(el).parents('.select-li ').siblings().find('.icon-cut'), this.passengerObj.adult);
            }

            return obj;
        },
        //修改input参数
        editPagArmy: function editPagArmy(el, num) {
            switch (el.data('type')) {
                case 'adult':
                    this.passengerObj.adult = num;
                    break;
                case 'child':
                    this.passengerObj.child = num;
                    break;
                case 'baby':
                    this.passengerObj.baby = num;
                    break;
                case 'soldier':
                    this.armyObj.soldier = num;
                    break;
                case 'police':
                    this.armyObj.police = num;
                    break;
            }
        }
    };
    $.fn.extend({
        passengerNumSelect: function passengerNumSelect(cb) {
            $(this).one('click', function () {
                var sele = {};
                $.extend(true, sele, passengerSelect);
                sele.initial($(this).siblings('.select-grps'), $(this).siblings('.select-grps').data('type'));
                cb($(this).siblings('.select-grps'), sele);
            });
        }
    });
    window.passengerRset = (0, _create2.default)(passengerSelect); //暴露一个全局对象给开发
    $('.select-box').passengerNumSelect(function (dom, seleObj) {
        var siblDom = dom.parents('div').siblings('div').find('.select-grps');
        var typ = dom.siblings('.select-box').find('.total-num').data('type');
        if (typ === 'army') {
            seleObjPassenger = seleObj;
        } else {
            seleObjArmy = seleObj;
        }
        dom.on('reset', function (event, passengerObj, armyObj, type) {
            if (type === 'police' || type === 'soldier') {
                if (!seleObjPassenger.passengerObj) {
                    return;
                }
                seleObjPassenger.passengerObj = passengerObj;
                seleObjPassenger.init(siblDom);
            } else {
                if (!seleObjArmy.armyObj) {
                    return;
                }
                seleObjArmy.armyObj = armyObj;
                seleObjArmy.init(siblDom);
            }
        });
    });
}(jQuery);

//10-5-1页面的逻辑代码
+function ($) {
    $('.invoice-apply_type .btn-select .select-ops').on('change', function () {
        selectInvoiceType();
    });
    function selectInvoiceType() {
        var $selectedText = $('.invoice-apply_type .btn-select .select-ops').find('option:selected').text();
        if ($selectedText === '电子发票') {
            $('.con-titSub_ask').show().siblings('.con-titSub_post').hide();
            $('.invoice-apply_ask').show().siblings('.invoice-apply_post').hide();
        } else {
            $('.con-titSub_post').show().siblings('.con-titSub_ask').hide();
            $('.invoice-apply_post').show().siblings('.invoice-apply_ask').hide();
        }
    }
    selectInvoiceType();

    function selectInvoiceVBRK() {
        var $selectedText = $('.invoice-apply_vbrk .btn-select .select-ops').find('option:selected').text();
        if ($selectedText === '个人') {
            $('.invoice-apply_person').show().siblings('.invoice-apply_compa').hide();
        } else {
            $('.invoice-apply_compa').show().siblings('.invoice-apply_person').hide();
        }
    }
    $('.invoice-apply_vbrk .btn-select .select-ops').on('change', function () {
        selectInvoiceVBRK();
    });
    selectInvoiceVBRK();
}(jQuery);

//3-5-1页面的逻辑代码
+function ($) {
    $('span[data-trigger="modal-meals"]').on('click', function (e) {
        e.stopPropagation();
        $('#modal-meals').modal();
    });
}(jQuery);
'use strict';

/* ========================================================================
 * TRP: cart  v1.0.0  购物车
 * Author: Alex
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response cart compoment
 * ======================================================================== */
+function ($) {
    'use strict';

    $('.cart-btn').click(function () {
        $(this).parents('.cart').toggleClass('active');
    });
}(jQuery);
'use strict';

/* ========================================================================
 * TRP: input.js v1.0.0  header导航组件
 * Author: Alex
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response input compoment
 * ======================================================================== */
+function ($) {
    'use strict';

    $('.menu-btn').click(function () {
        var x;
        if ($(this).hasClass('open-nav')) {
            //打开左侧菜单
            if ($('body').hasClass('show-menu')) {
                $('body').removeClass('show-menu').removeClass('show-user').removeClass('show-nav');
                //nav导航高度设置
                $('.nav .mobile-menu-con').height(0);
            } else {
                //nav导航高度获取
                x = $('.content').height() - $('.nav .mobile-menu').height();
                $('body').addClass('show-nav').addClass('show-menu');
                //nav导航高度设置
                $('.nav .mobile-menu-con').height(x);
            }
        } else {
            //打开右侧个人中心
            if ($('body').hasClass('show-user')) {
                $('body').removeClass('show-menu').removeClass('show-user').removeClass('show-nav');
                $('.mobile-menu.user').css('width', '0');
                //user导航高度设置
                $('.user .mobile-menu-con').height(0);
            } else {
                //user导航高度获取
                x = $('.content').height() - $('.user .mobile-menu').height();
                $('body').addClass('show-user').addClass('show-menu');
                $('.mobile-menu.user').css('width', '80%');
                //user导航高度设置
                $('.user .mobile-menu-con').height(x);
            }
        }
    });
}(jQuery);
(function ($) {
    // todo touch end close
    // head > 1000
    // calculate border-b position
    $('.nav-sub').each(function (i, e) {
        var nav = $(this).parent('.nav-li'),
            w = nav.width(),
            l = nav.position().left + w / 2 - 10;
        $(this).children('.border-b').css('left', l + 'px');
    });

    $('.nav-li .nav-link').on({
        'click': function click() {
            if ($(this).parent().hasClass('li-on')) {
                $(this).parent().removeClass('li-on');
                $(this).parent().unbind('mouseenter').unbind('mouseleave');
                return;
            }
            $(this).parent().parent().find('.li-on').removeClass('li-on');
            $(this).parent().addClass('li-on');
            //$('.hd-nav').addClass('nav-on');
        }
    });

    $('.nav-li .nav-link').on('touch', function () {
        $(this).parent().toggleClass('li-on');
    });

    $('.select-lang .select-ops, .select-user .select-ops').on('change', function () {
        if (this.value == 'logout') {
            $('.modal-confirm').modal('show');
        }
        // else {
        //     if(this.selectedIndex && this.selectedIndex != 0){
        //         window.open(this.value, '_self');
        //     }
        // }
        this.value = -1;
    });

    // head < 1000
    // test vh
    function applyStyleTest(style_block, style) {
        var new_style, test_style;
        new_style = "#vminpolyTests { " + style + "; }";
        if (style_block.styleSheet) {
            return style_block.styleSheet.cssText = new_style;
        } else {
            test_style = document.createTextNode(new_style);
            return style_block.appendChild(test_style);
        }
    }

    function clearStyleTests(style_block) {
        if (style_block.styleSheet) {
            return style_block.styleSheet.cssText = '';
        } else {
            return style_block.innerHTML = '';
        }
    }

    function testElementStyle(element) {
        if (window.getComputedStyle) {
            return getComputedStyle(element, null);
        } else {
            return element.currentStyle;
        }
    }

    function testVHSupport(element, style_block) {
        var comp_style, height;
        applyStyleTest(style_block, 'height: 50vh');
        height = parseInt(window.innerHeight / 2, 10);
        comp_style = parseInt(testElementStyle(element).height, 10);
        clearStyleTests(style_block);
        return comp_style === height;
    }

    //if(!testVHSupport()){
    //$('.user-list, .nav-list').css('min-height', window.outerHeight + 'px');
    //}

    var isOpen = false;
    $('.btn-nav').on('click', function (e) {
        if (!isOpen) {
            // e.stopPropagation();
            isOpen = true;
            $('body').addClass('nav-show');
        } else {
            isOpen = false;
            $('body').removeClass('nav-show');
        }
    });
    $('.btn-user').on('click', function (e) {
        if (!isOpen) {
            //e.stopPropagation();
            isOpen = true;
            $('body').addClass('user-show');
        } else {
            isOpen = false;
            $('body').removeClass('user-show');
        }
    });
    $('.head').on('click', function (e) {

        if ($(e.target).hasClass('btn-nav') || $(e.target).hasClass('btn-user')) {
            return;
        }
        if (isOpen && $(e.target).closest('.nav-list').length == 0 && $(e.target).closest('.user-list').length == 0) {
            isOpen = false;
            $('body').removeClass('nav-show user-show');
        }
    });

    // test Media Query watch
    if (window.matchMedia) {
        var handleOrientationChange = function handleOrientationChange(mql) {
            //if (mql.matches) {
            //    console.log('<999');
            //}else {
            //    console.log('>999');
            //}
        };

        var mql = window.matchMedia("(max-width: 999px)");
        mql.addListener(handleOrientationChange);
        handleOrientationChange(mql);
    }

    // detect Translate3d
    function hasTranslate3d() {
        if (!window.getComputedStyle) {
            return false;
        }

        var el = document.createElement('p'),
            has3d,
            transforms = {
            'webkitTransform': '-webkit-transform',
            'OTransform': '-o-transform',
            'msTransform': '-ms-transform',
            'MozTransform': '-moz-transform',
            'transform': 'transform'
        };

        document.body.insertBefore(el, null);

        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return has3d !== undefined && has3d.length > 0 && has3d !== "none";
    }
    if (!hasTranslate3d()) {
        $('html').addClass('no-transform');
    }

    // foot < 999
    $('.foot dl').on('click', function () {
        $(this).toggleClass('dl-on');
    });
})(jQuery);
'use strict';

/* ========================================================================
 * TRP: input.js v1.0.0 input输入框组件
 * Author: Alex
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * response input compoment
 * ======================================================================== */
+function ($) {
    'use strict';

    //获取焦点

    $('.input-group .text').focus(function () {
        if ($(this).hasClass('disabled')) {
            return;
        }
        var obj = $(this);
        //错误输入框，focus后，还原
        if (obj.hasClass('has-error')) {
            obj.removeClass('has-error');
        }
        //placeholder处理
        obj.attr('placeholder', '');
        //判断是否已输入
        if (obj.hasClass('input-filled')) {
            return;
        } else {
            obj.addClass('input-filled');
            obj.next('.input-info').addClass('input-filled');
        }
        obj.addClass("focus");
    });
    $('.input-group .text').blur(function () {

        var obj = $(this);
        obj.attr('placeholder', obj.attr('placeholder-data'));
        //输入值判断
        if (javaTrim(obj.val().replace(/\n/g, '')) == '') {
            obj.removeClass('input-filled');
            obj.next('.input-info').removeClass('input-filled');
            return;
        } else {
            obj.addClass('input-filled');
            obj.next('.input-info').addClass('input-filled');
        }
        obj.removeClass("focus");
    });
    //2017.10.19 author yzy 修改原有blur方法，处理input修改问题及填充bug
    $('.input-group .text').change(function () {
        var obj = $(this);
        // 判断是否已输入
        if (javaTrim(obj.val().replace(/\n/g, '')) == '') {
            //placeholder处理
            if (!obj.hasClass("focus")) {
                obj.attr('placeholder', obj.attr('placeholder-data'));
                obj.removeClass('input-filled');
                obj.next('.input-info').removeClass('input-filled');
            }
            return;
        } else {
            //placeholder处理
            // obj.attr('placeholder',obj.attr('placeholder-data'));

            obj.addClass('input-filled');
            obj.next('.input-info').addClass('input-filled');
        }
    });

    function javaTrim(str) {
        for (var i = 0; str.charAt(i) == ' ' && i < str.length; i++) {}
        if (i == str.length) return ''; //whole string is space
        var newstr = str.substr(i);
        for (var i = newstr.length - 1; newstr.charAt(i) == ' ' && i >= 0; i--) {}
        newstr = newstr.substr(0, i + 1);
        return newstr;
    }
}(jQuery);
'use strict';

+function ($) {
    $('.meals_add').on('click', function () {
        var val = $(this).prev().html();
        $(this).siblings('.meals_cut').removeClass('disabled');
        var num = parseInt(val) + 1;
        $(this).prev().html(num);
    });

    $('.meals_cut').on('click', function () {
        var val = $(this).next().html();
        if (val > 0) {
            var num = parseInt(val) - 1;
            $(this).next().html(num);
        }
        if (num === 0) {
            $(this).addClass('disabled');
        }
    });
}(jQuery);
'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/* ========================================================================
 * Bootstrap: modal.js v3.3.7 模态框
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function Modal(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find('.modal-dialog');
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;

        if (this.options.remote) {
            this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
                this.$element.trigger('loaded.bs.modal');
            }, this));
        }
    };

    Modal.VERSION = '3.3.7';

    Modal.TRANSITION_DURATION = 300;
    Modal.BACKDROP_TRANSITION_DURATION = 150;

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    };

    Modal.prototype.show = function (_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) return;

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('modal-open');

        this.escape();
        this.resize();

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

        this.$dialog.on('mousedown.dismiss.bs.modal', function () {
            that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            });
        });

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade');

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body); // don't move modals dom position
            }

            that.$element.show().scrollTop(0);

            that.adjustDialog();

            if (transition) {
                that.$element[0].offsetWidth; // force reflow
            }

            that.$element.addClass('in');

            that.enforceFocus();

            var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });

            transition ? that.$dialog // wait for modal to slide in
            .one('bsTransitionEnd', function () {
                that.$element.trigger('focus').trigger(e);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
        });
    };

    Modal.prototype.hide = function (e) {
        if (e) e.preventDefault();

        e = $.Event('hide.bs.modal');

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented()) return;

        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.bs.modal');

        this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

        this.$dialog.off('mousedown.dismiss.bs.modal');

        $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
    };

    Modal.prototype.enforceFocus = function () {
        $(document).off('focusin.bs.modal') // guard against infinite focus loop
        .on('focusin.bs.modal', $.proxy(function (e) {
            if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.trigger('focus');
            }
        }, this));
    };

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this));
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal');
        }
    };

    Modal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
        } else {
            $(window).off('resize.bs.modal');
        }
    };

    Modal.prototype.hideModal = function () {
        var that = this;
        this.$element.hide();
        this.backdrop(function () {
            that.$body.removeClass('modal-open');
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger('hidden.bs.modal');
        });
    };

    Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    Modal.prototype.backdrop = function (callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;

            this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);

            this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return;
                }
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
            }, this));

            if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

            this.$backdrop.addClass('in');

            if (!callback) return;

            doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            var callbackRemove = function callbackRemove() {
                that.removeBackdrop();
                callback && callback();
            };
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else if (callback) {
            callback();
        }
    };

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog();
    };

    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
    };

    Modal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        });
    };

    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
    };

    Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad);
    };

    Modal.prototype.measureScrollbar = function () {
        // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) == 'object' && option);

            if (!data) $this.data('bs.modal', data = new Modal(this, options));
            if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
        });
    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;

    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return this;
    };

    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

        if ($this.is('a')) e.preventDefault();

        $target.one('show.bs.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function () {
                $this.is(':visible') && $this.trigger('focus');
            });
        });
        Plugin.call($target, option, this);
    });
}(jQuery);
"use strict";
'use strict';

(function ($) {
    $(document).on('change', '.file-input', function (e) {
        var curTarget = e.currentTarget;
        var $curTarget = $(curTarget);
        var files = curTarget.files;
        var len = files.length;
        var filenameList = '';
        if (len === 1) {
            $curTarget.siblings('.files-name').text(files[0].name);
        } else if (len === 0) {
            $curTarget.siblings('.files-name').text('未选择任何文件');
        } else {
            for (var i = 0; i < len; i++) {
                filenameList += '<li class="file-name_item">' + files[i].name + '</li>';
            }
            $curTarget.siblings('.files-name').text('选择了' + len + '个文件');
            $curTarget.parents('.upload-files').find('.upload-files_namelist').html(filenameList);
        }
    });

    $(document).on('click', '.upload-files_cancel', function (e) {
        var $curTarget = $(e.currentTarget);
        $curTarget.parents('.upload-files').find('.file-input').val('');
        $curTarget.parents('.upload-files').find('.files-name').text('未选择任何文件');
        $curTarget.parents('.upload-files').find('.upload-files_namelist').html('');
    });

    $(document).on('click', '.upload-files_confirm', function () {
        console.log($('#upload').get(0).files);
    });

    //问号按钮的展开隐藏
    $('.upload-files_prompt .i-trigger').click(function () {
        $(this).parent().toggleClass('down');
    });
})(jQuery);
'use strict';

/* ========================================================================
 * Name: 搜索结果展示选择——业务模块
 * Page:03-1-1-国内机票预订-搜索结果-单程
 * Author: Alex
 * ========================================================================
 * Copyright 2017-~ Travelsky ICED
 * 搜索结果展示选择——业务模块
 * ======================================================================== */

+function ($) {
    'use strict';

    //cabin

    $('.cabin').on('click', function () {
        $(this).siblings('.cabin').removeClass('cabin-on');
        $(this).addClass('cabin-on');
    });

    // order-item
    $('.order-item').on('click', function () {
        var _this = $(this),
            _icon = $(this).children('.order-icon'),
            isStarLevel = _this.hasClass("star-level");
        _this.siblings('.order-item').removeClass('order-on');
        _this.siblings('.order-item-x').removeClass('order-on');
        _this.addClass('order-on');
        _this.siblings('.order-item').children('.order-icon').addClass('icon-order1').removeClass('icon-order0 icon-order');
        if (_icon.hasClass('icon-order0')) {
            _icon.removeClass('icon-order0').addClass('icon-order');
        } else if (_icon.hasClass('icon-order')) {
            _icon.removeClass('icon-order').addClass('icon-order0');
        } else {
            isStarLevel ? _icon.removeClass('icon-order1').addClass('icon-order') : _icon.removeClass('icon-order1').addClass('icon-order0');
        }
    });
    // order-item-x
    $('.order-item-x').on('click', function () {
        var _this = $(this),
            _icon = $(this).children('.order-icon');
        _this.siblings('.order-item').removeClass('order-on');
        _this.addClass('order-on');
        _this.siblings('.order-item').children('.order-icon').addClass('icon-order1').removeClass('icon-order0 icon-order');
    });
}(jQuery);
'use strict';

/* ========================================================================
 * Bootstrap: modal.js v3.3.7 品牌逻辑优化
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2019 ggx.
 * ======================================================================== */
+function ($) {
    var newFlightModel = function ($) {
        // 机票行程类
        'use strict';

        var FlightModel = function FlightModel() {
            /** ******需要公共调用的变量写这里**********/
            this.callBack = function () {};
        };
        FlightModel.prototype = {
            // 私有变量写这里
            hoverState: 'out',
            modelTemp: '<div id="flight-model" class= "modal fade" tabindex="-1" role="dialog" >\
            <div class="modal-dialog modal-md" role="document">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <a class="close" data-dismiss="modal" aria-label="Close" href="javascript:;">\
                            <span class="h2" aria-hidden="true">×</span>\
                        </a>\
                        <h4 class="modal-title"></h4>\
                    </div>\
                    <div class="modal-body"></div>\
                </div>\
            </div></div>',
            // 公共函数和私有函数写这里
            modelInit: function modelInit() {
                var _thi = this;

                if ($('.n-cabins__click').length > 0) {
                    $('.n-cabins__click').off('mouseenter');
                    $('.n-cabins__click').off('mouseleave');
                    return;
                }
                $('.n-cabins__hover').off('mouseenter').on('mouseenter', function (e) {
                    var target = $(e.currentTarget).children(':last');

                    if (!target.hasClass('n-flight-model')) {
                        return;
                    }
                    _thi.modelIn(target);
                });
                $('.n-cabins__hover').off('mouseleave').on('mouseleave', function (e) {
                    var target = $(e.currentTarget).children(':last');

                    if (!target.hasClass('n-flight-model')) {
                        return;
                    }
                    _thi.modelOut(target);
                });
            },
            modelIn: function modelIn(target) {
                target.addClass('n-flight-model__in');
                this.hoverState = 'in';
            },
            modelOut: function modelOut(target) {
                target.removeClass('n-flight-model__in');
                this.hoverState = 'out';
            }
        };
        return editOpts(FlightModel);
    }(jQuery);

    /** **********js模板写法享元模式************ */
    var newFlight = function ($) {
        // 机票行程类
        'use strict';

        var Flight = function Flight() {
            /** ******需要公共调用的变量写这里**********/
            this.callBack = function () {};
        };
        Flight.prototype = {
            // 私有变量写这里
            // 公共函数和私有函数写这里
            init: function init() {
                // 初始化函数，公共函数这样写
                var _thi = this;
                $('body').append(_thi.modelTemp);
                this.onResize();
                this.modelInit();
                this.initModel();
                this.initTabModel(); //初始化退改签和价格明细的tabs选项卡事件
                $(window).resize(debounce(function () {
                    _thi.onResize();
                    _thi.modelInit();
                    _thi.initModel();
                }, 220));

                $('.n-flight-tabs').on('click', function (e) {
                    var target = $(e.target);
                    var index = target.closest('li').index();
                    if (target.closest('li').hasClass('n-flight-tabs__sellout')) {
                        return;
                    }
                    //console.log(target.closest('.n-flight-tabs__round').children('ul').children('li'))
                    if (target.closest('.n-flight-tabs__round').children('ul').children('li').length === 1) {
                        return;
                    }
                    if (target.closest('li').hasClass('cur')) {
                        target.closest('li').removeClass('cur');
                        target.closest('.n-flight-tabs').siblings('.n-cabins').hide();
                    } else {
                        target.closest('li').addClass('cur').siblings().removeClass('cur');
                        target.closest('.n-flight-tabs').siblings('.n-cabins').show();
                        target.closest('.n-flight-tabs').siblings('.n-cabins').children('.n-cabins_list').eq(index).removeClass('n-cabins_list__hide').siblings().addClass('n-cabins_list__hide');
                    }
                });
            },
            showFlightDetail: function showFlightDetail(target) {
                target.addClass('down');
            },
            hideFlightDetail: function hideFlightDetail(target) {
                target.removeClass('down');
            },
            onResize: function onResize() {
                var window_width = $(window).width(); //获取浏览器窗口宽度

                if (window_width >= 1040) {
                    this.detailTrigger();
                    if ($('.n-cabins__click').length > 0) {
                        $('.n-cabins__click').removeClass('n-cabins__click').addClass('n-cabins__hover');
                    }
                }
                if (window_width < 1040) {
                    this.detailTrigger();
                    if ($('.n-cabins__hover').length > 0) {
                        $('.n-cabins__hover').removeClass('n-cabins__hover').addClass('n-cabins__click');
                    }
                }

                if (window_width <= 750) {
                    $('.n-flight-info_trigger').off('click').on('click', function (e) {
                        var target = $(e.currentTarget);
                        var body = target.parents('.n-flight-info').siblings('.n-flight-detail').find('.flights-item-detail').html();
                        var title = target.text();
                        $('#flight-model').find('.modal-title').html(title).css('fontSize', '1rem');
                        $('#flight-model').find('.modal-body').html(body);
                        $('#flight-model').modal(options);
                    });
                }
            },
            initModel: function initModel() {
                //退改签和价格明细的点击事件
                var _thi = this;
                if ($('.n-cabins__hover').length > 0) {
                    $('.n-cabins__hover').off('click');
                    return;
                }
                $('.n-cabins__click').off('click').on('click', function (e) {
                    var target = $(e.currentTarget);
                    var title = target[0].childNodes[1].innerHTML;

                    var body = target.find('.n-flight-model_inner').html();
                    $('#flight-model').find('.modal-title').html(title).css('fontSize', '1rem');
                    $('#flight-model').find('.modal-body').html(body);
                    _thi.initTabModel(); //初始化退改签和价格明细的tabs选项卡事件
                    $('#flight-model').modal(options);
                });
            },
            initTabModel: function initTabModel() {
                $('.n-flight-model_tabs li').off('hover').on('hover', function (e) {
                    var target = $(e.currentTarget);
                    var con = target.parents('.n-flight-model_tabs').next().children('.n-flight-model_con');
                    target.addClass('cur').siblings().removeClass('cur');
                    var index = target.index();
                    $(con[index]).show().siblings().hide();
                });
            },
            detailTrigger: function detailTrigger() {
                //航班详情按钮点击事件绑定
                var _thi = this;
                $('.n-flight-info_trigger').off('click').on('click', function (e) {
                    var target = $(e.currentTarget);
                    var targetDown = target.parents('.n-flight-info').siblings('.n-flight-detail').find('.flights-item-detail');
                    if (targetDown.hasClass('down')) {
                        target.removeClass('open');
                        _thi.hideFlightDetail(targetDown);
                    } else {
                        target.addClass('open');
                        _thi.showFlightDetail(targetDown);
                    }
                });
            }
        };
        augment(Flight, new newFlightModel()); // Sider继承公共方法函数Mixin
        return editOpts(Flight);
    }(jQuery);

    window.newfl = new newFlight({});

    window.onload = function () {
        newfl.init();
    };
}(jQuery);
'use strict';

!function ($) {
    new Trp({
        route: '01-1',
        //Object是引用数据类型,如果不用function 返回,每个组件的data 都是内存的同一个地址,一个数据改变了其他也改变了
        data: function data() {
            return {
                obj: { a: 1, b: 2, c: 3 },
                str: '这是a页面',
                num: 12345678
            };
        },
        methods: {
            init: function init() {
                this.show();
                this.hide();
            },
            show: function show() {
                console.log('show', this.str);
            },
            hide: function hide() {
                console.log('hide', this.str);
            }
        },
        //页面加载完执行该函数
        bindEvent: function bindEvent() {
            var _thi = this;
            $(document).on('click', '.hide', function () {
                _thi.hide();
                console.log('隐藏了');
            }).on('click', '.show', function () {
                _thi.show();
                console.log('显示了');
            });
        },
        ////DOM元素可以被访问。但是像图像，样式表和框架等资源依然还在加载
        interactive: function interactive() {
            console.log('a页面可交互', this);
        },
        //页面加载完执行该函数
        complete: function complete() {
            this.init();
            console.log('a页面加载完毕', this);
        }
    });
}(jQuery);

},{"babel-runtime/core-js/object/create":2,"babel-runtime/core-js/object/keys":3,"babel-runtime/helpers/typeof":6}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":7}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":8}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":9}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":10}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":4,"../core-js/symbol/iterator":5}],7:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};

},{"../../modules/_core":16,"../../modules/es6.object.create":68}],8:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":16,"../../modules/es6.object.keys":69}],9:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":16,"../../modules/es6.object.to-string":70,"../../modules/es6.symbol":72,"../../modules/es7.symbol.async-iterator":73,"../../modules/es7.symbol.observable":74}],10:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":65,"../../modules/es6.string.iterator":71,"../../modules/web.dom.iterable":75}],11:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],12:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],13:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":32}],14:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":57,"./_to-iobject":59,"./_to-length":60}],15:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],16:[function(require,module,exports){
var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],17:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":11}],18:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],19:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":24}],20:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":25,"./_is-object":32}],21:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],22:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":45,"./_object-keys":48,"./_object-pie":49}],23:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":16,"./_ctx":17,"./_global":25,"./_has":26,"./_hide":27}],24:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],25:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],26:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],27:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":19,"./_object-dp":40,"./_property-desc":51}],28:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":25}],29:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":19,"./_dom-create":20,"./_fails":24}],30:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":15}],31:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":15}],32:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],33:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":27,"./_object-create":39,"./_property-desc":51,"./_set-to-string-tag":53,"./_wks":66}],34:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":23,"./_hide":27,"./_iter-create":33,"./_iterators":36,"./_library":37,"./_object-gpo":46,"./_redefine":52,"./_set-to-string-tag":53,"./_wks":66}],35:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],36:[function(require,module,exports){
module.exports = {};

},{}],37:[function(require,module,exports){
module.exports = true;

},{}],38:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":24,"./_has":26,"./_is-object":32,"./_object-dp":40,"./_uid":63}],39:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":13,"./_dom-create":20,"./_enum-bug-keys":21,"./_html":28,"./_object-dps":41,"./_shared-key":54}],40:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":13,"./_descriptors":19,"./_ie8-dom-define":29,"./_to-primitive":62}],41:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":13,"./_descriptors":19,"./_object-dp":40,"./_object-keys":48}],42:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":19,"./_has":26,"./_ie8-dom-define":29,"./_object-pie":49,"./_property-desc":51,"./_to-iobject":59,"./_to-primitive":62}],43:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":44,"./_to-iobject":59}],44:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":21,"./_object-keys-internal":47}],45:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],46:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":26,"./_shared-key":54,"./_to-object":61}],47:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":14,"./_has":26,"./_shared-key":54,"./_to-iobject":59}],48:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":21,"./_object-keys-internal":47}],49:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],50:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":16,"./_export":23,"./_fails":24}],51:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],52:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":27}],53:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":26,"./_object-dp":40,"./_wks":66}],54:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":55,"./_uid":63}],55:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":16,"./_global":25,"./_library":37}],56:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":18,"./_to-integer":58}],57:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":58}],58:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],59:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":18,"./_iobject":30}],60:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":58}],61:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":18}],62:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":32}],63:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],64:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":16,"./_global":25,"./_library":37,"./_object-dp":40,"./_wks-ext":65}],65:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":66}],66:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":25,"./_shared":55,"./_uid":63}],67:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":12,"./_iter-define":34,"./_iter-step":35,"./_iterators":36,"./_to-iobject":59}],68:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":23,"./_object-create":39}],69:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":48,"./_object-sap":50,"./_to-object":61}],70:[function(require,module,exports){

},{}],71:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":34,"./_string-at":56}],72:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":13,"./_descriptors":19,"./_enum-keys":22,"./_export":23,"./_fails":24,"./_global":25,"./_has":26,"./_hide":27,"./_is-array":31,"./_is-object":32,"./_library":37,"./_meta":38,"./_object-create":39,"./_object-dp":40,"./_object-gopd":42,"./_object-gopn":44,"./_object-gopn-ext":43,"./_object-gops":45,"./_object-keys":48,"./_object-pie":49,"./_property-desc":51,"./_redefine":52,"./_set-to-string-tag":53,"./_shared":55,"./_to-iobject":59,"./_to-object":61,"./_to-primitive":62,"./_uid":63,"./_wks":66,"./_wks-define":64,"./_wks-ext":65}],73:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":64}],74:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":64}],75:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":25,"./_hide":27,"./_iterators":36,"./_wks":66,"./es6.array.iterator":67}]},{},[1]);
