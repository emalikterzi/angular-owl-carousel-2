/**
 * Created by emt on 24.12.2016.
 */
var app = angular.module('app', ['angular-owl-carousel-2']);

app.controller('TestController', function ($scope, $timeout) {

    $scope.items = [1, 2, 3, 4, 5, 6, 7, 8];

    $timeout(function () {
        $scope.properties = {items: 2}
    }, 1000)


});