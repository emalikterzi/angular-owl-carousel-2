# Angular Owl Carousel - 2

Impl for [OwlCarousel2]


### Installation

```ssh
npm install angular-owl-carousel2
```

```ssh
bower install angular-owl-carousel2
```


### Usage

```js
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

```

```html
<ng-owl-carousel class="owl-theme" owl-items="items" owl-properties="properties" owl-ready="ready($api)">
    <div class="item"><h4>Free Item</h4></div>
    <div class="item" data-ng-repeat="item in items"><h4>{{$index}}</h4></div>
</ng-owl-carousel>
```
   [OwlCarousel2]: <https://github.com/OwlCarousel2/OwlCarousel2>
