/**
 * Created by emt on 24.12.2016.
 */
var app = angular.module('app', ['angular-owl-carousel-2']);

app.controller('TestController', function ($scope, $timeout) {
    var owlAPi;
    $scope.items = [1, 2, 3, 4, 5, 6, 7, 8];

    $scope.properties = {
        items: 2,
        onChange: function () {
            console.dir(arguments);
        }
    };

    $scope.ready = function ($api) {
        owlAPi = $api;
    };

    $timeout(function () {
        console.dir(owlAPi);
        owlAPi.trigger('next.owl.carousel',[2000]);
    }, 2000)

});