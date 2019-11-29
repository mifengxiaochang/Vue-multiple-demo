!function($) {
    function Lotties() {}
    Lotties.prototype = {
        render: function(params) {
            this.container = params.container;
            this.defaultProps = params.defaultProps;
            this.segments = params.segments;
            this.stopSegment = params.stopSegment;
            this.time = params.time;
            this.callback = params.callback
        },
        bindEvent: function() {
            var that = this;
            var container = that.container;
            var animation = lottie.loadAnimation(that.defaultProps);
            animation.addEventListener('DOMLoaded', function() {
                mouseEnter();
                monseLeave();
            })

            function mouseEnter() {
                container.on('mouseenter', function() {
                    animation.setSpeed(that.time);
                    that.callback(animation,'enter')
                    //animation.play()
                    //animation.playSegments(that.segments, true);
                })
            }
            function monseLeave() {
                container.on('mouseleave', function() {
                    animation.setSpeed(that.time);
                    that.callback(animation,'leave')
                    //animation.stop()
                    //animation.playSegments(that.stopSegment, true);
                })
            }
        },
        init: function(options) {
            this.render(options);
            this.bindEvent()
        }
    }

    $.lotties = function(options) {
        var defaults = {
            container: 'element',
            defaultProps: {
                container: 'element',
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: {}
            },
            segments: [0, 20],
            stopSegment: [20, 0],
            time: 2
        }
        options = $.extend(true, defaults, options);
        return new Lotties().init(options);
    }
}(jQuery);