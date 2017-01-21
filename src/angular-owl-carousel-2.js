/**
 * Created by emt on 24.12.2016.
 */

var angularApp = angular.module('angular-owl-carousel-2', []);

(function (app) {
    var owlProperties = [
        //OPTIONS
        'items',
        'margin',
        'loop',
        'center',
        'mouseDrag',
        'touchDrag',
        'pullDrag',
        'freeDrag',
        'stagePadding',
        'merge',
        'mergeFit',
        'autoWidth',
        'startPosition',
        'URLhashListener',
        'nav',
        'rewind',
        'navText',
        'navElement',
        'slideBy',
        'dots',
        'dotsEach',
        'dotData',
        'lazyLoad',
        'lazyContent',
        'autoplay',
        'autoplayTimeout',
        'autoplayHoverPause',
        'smartSpeed',
        'fluidSpeed',
        'autoplaySpeed',
        'navSpeed',
        'dotsSpeed',
        'dragEndSpeed',
        'callbacks',
        'responsive',
        'responsiveRefreshRate',
        'responsiveBaseElement',
        'video',
        'videoHeight',
        'videoWidth',
        'animateOut',
        'animateInClass',
        'fallbackEasing',
        'info',
        'nestedItemSelector',
        'itemElement',
        'stageElement',
        'navContainer',
        'dotsContainer',

        //CLASSES
        'refreshClass',
        'loadingClass',
        'loadedClass',
        'rtlClass',
        'dragClass',
        'grabClass',
        'stageClass',
        'stageOuterClass',
        'navContainerClass',
        'navClass',
        'controlsClass',
        'dotClass',
        'dotsClass',
        'autoHeightClass',
        'responsiveClass',

        //CALLBACKS
        'onInitialize',
        'onInitialized',
        'onResize',
        'onResized',
        'onRefresh',
        'onRefreshed',
        'onDrag',
        'onDragged',
        'onTranslate',
        'onTranslated',
        'onChange',
        'onChanged',
        'onLoadLazy',
        'onLoadedLazy',
        'onStopVideo',
        'onPlayVideo'
    ];

    // ONLY TRIGGERABLE EVENTS
    var owlEvents = [
        'refresh.owl.carousel',
        'next.owl.carousel',
        'prev.owl.carousel',
        'to.owl.carousel',
        'destroy.owl.carousel',
        'replace.owl.carousel',
        'add.owl.carousel',
        'remove.owl.carousel',
        'play.owl.autoplay',
        'stop.owl.autoplay'
    ];

    app.directive('ngOwlCarousel', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            link: link,
            scope: {
                owlItems: '=',
                owlProperties: '=',
                owlCtrl: '='
            },
            transclude: true,
            template: '<div class="owl-carousel" data-ng-transclude></div>'
        };
        function link($scope, $element, $attr) {
            var options = {},
                initial = true,
                owlCarouselClassName = '.owl-carousel',
                owlCarousel = null,
                propertyName = $attr.owlItems;

            if (!propertyName)
                throw 'owl-items attribute cannot be null';

            $scope.owlCtrl = new OwlCtrl();

            $scope.$watch('[owlItems,owlProperties]', function (arr) {
                var items = arr[0];
                var props = arr[1];

                if ((items && items.length > 0 && !initial)) {
                    buildProperties(props);
                    destroyOwl();
                    initOwl();
                }
                else if ((items && items.length > 0 && initial)) {
                    buildProperties(props);
                    init();
                }

            }, true);

            function init() {
                initial = false;
                initOwl();
            }

            function buildProperties(props) {
                if (props) {
                    options = {};
                    owlProperties.forEach(function (each) {
                        if (angular.isDefined(props[each])) {
                            options[each] = props[each];
                        }
                    })
                }
            }

            function initOwl() {
                $timeout(function () {
                    owlCarousel = $element.find(owlCarouselClassName).owlCarousel(options);
                });
            }

            function destroyOwl() {
                owlCarousel.owlCarousel('destroy');
            }

            function OwlCtrl() {
                this.isOwlCtrl = true;
            }

            OwlCtrl.prototype.triggerEvent = function triggerEvent(event) {
                if (owlEvents.indexOf(event) > -1) {
                    owlCarousel.trigger(event);
                }
            };
            OwlCtrl.prototype.getOwl = function returnOwl() {
                return owlCarousel;
            };
        }
    }]);
})(angularApp);
