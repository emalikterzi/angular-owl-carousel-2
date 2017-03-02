/**
 * Created by emt on 24.12.2016.
 */
var app = angular.module('app', ['angular-owl-carousel-2']);

app.controller('TestController', function ($scope, $timeout) {
    var owlAPi;
    $scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 10];

    $scope.properties = {
        // autoHeight:true,
        animateIn: 'fadeIn',
        lazyLoad: true,
        items: 5,
        margin: 10

    };

    $scope.ready = function ($api) {
        owlAPi = $api;
    };

});