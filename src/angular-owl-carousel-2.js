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

        //EVENTS
        'initialize.owl.carousel',
        'initialized.owl.carousel',
        'resize.owl.carousel',
        'resized.owl.carousel',
        'refresh.owl.carousel',
        'refreshed.owl.carousel',
        'drag.owl.carousel',
        'dragged.owl.carousel',
        'translate.owl.carousel',
        'translated.owl.carousel',
        'change.owl.carousel',
        'changed.owl.carousel',
        'next.owl.carousel',
        'prev.owl.carousel',
        'to.owl.carousel',
        'destroy.owl.carousel',
        'replace.owl.carousel',
        'add.owl.carousel',
        'remove.owl.carousel',
        'load.owl.lazy',
        'loaded.owl.lazy',
        'play.owl.autoplay',
        'stop.owl.autoplay',
        'stop.owl.video',
        'play.owl.video',
		
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

    app.directive('ngOwlCarousel',['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            link: link,
            scope: {
                owlItems: '=',
                owlProperties: '='
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
                    owlCarousel
                        = $element.find(owlCarouselClassName).owlCarousel(options);
                });
            }

            function destroyOwl() {
                $element.find(owlCarouselClassName)
                    .owlCarousel('destroy');
            }
        }
    }])

})(angularApp);

