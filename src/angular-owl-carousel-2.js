/**
 * Created by emt on 24.12.2016.
 */

var angularApp = angular.module('angular-owl-carousel-2', []);

(function (app) {

    function OwlController() {
        this.owlApi = {};
    }

    OwlController.prototype.init = function () {
        this.owlApi = arguments[0];
    };

    OwlController.prototype.getApi = function () {
        var self = this;
        return {
            trigger: function () {
                self.owlApi.trigger.apply(self.owlApi, arguments);
            }
        }
    };

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
        'autoHeight', //see https://github.com/emalikterzi/angular-owl-carousel-2/issues/4
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

    app.directive('ngOwlCarousel', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            link: link,
            scope: {
                owlItems: '=',
                owlProperties: '=',
                owlReady: '&'
            },
            controller: OwlController,
            transclude: true,
            template: '<div class="owl-carousel" data-ng-transclude></div>'
        };
        function link($scope, $element, $attr, owlCtrl) {
            var options = {},
                initial = true,
                owlCarouselClassName = '.owl-carousel',
                owlCarousel = null,
                propertyName = $attr.owlItems;

            if (!propertyName)
                throw 'owl-items attribute cannot be null';

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
                    owlCtrl.init(owlCarousel);
                    if (angular.isDefined($scope.owlReady)) {
                        $scope.owlReady({$api: owlCtrl.getApi()});
                    }
                });
            }

            function destroyOwl() {
                owlCarousel.owlCarousel('destroy');
            }
        }
    }]);
})(angularApp);
