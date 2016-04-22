(function (angular) {
  'use strict';

  var app = angular.module('app', ['ui.router', 'ngStorage']);

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");

    $stateProvider
      .state('main', {
        url: "/main",
        templateUrl: "templates/main.html"
      })
      .state('activities', {
        url: "/activities",
        templateUrl: "templates/activities.html"
      })
      .state('light-moving', {
        url: "/light-moving",
        templateUrl: "templates/light-moving.html"
      })
  });

  app.run(['$rootScope', '$sessionStorage',
    function ($rootScope, $sessionStorage) {
      $rootScope.$storage = $sessionStorage;

      $rootScope.$storage.movements = $rootScope.$storage.movements || [];
      $rootScope.$storage.orders = $rootScope.$storage.orders || [];
    }]);

  app.controller('CalculateController',
    ['$scope', '$rootScope', function ($scope, $rootScope) {

      $scope.movement = {};

      $scope.onSubmit = function (form) {
        if(form.$invalid) return;

        $rootScope.$storage.movements.push(angular.copy($scope.movement));
        $scope.movement = {};
      }

    }]);

  app.controller('OrderController',
    ['$scope', '$rootScope', function ($scope, $rootScope) {

      $scope.order = {};

      $scope.onSubmit = function (form) {
        if(form.$invalid) return;

        $rootScope.$storage.orders.push(angular.copy($scope.order));
        $scope.order = {};
      }
      
    }]);

  app.directive('scrollbox', [function () {
    
    function link(scope, element, attrs) {

    }
    
    return {
      restrict: 'E',
      link: link,
      template: [
        '<div class="uk-slidenav-position" data-uk-slider>',
          '<div class="uk-slider-container">',
            '<ul class="uk-slider uk-grid-width-small-1-2 uk-grid-width-medium-1-4 uk-grid-width-large-1-4">',
              '<li><div class="slider-image image-help"></div><div class="slider-image-title">поможем с переездом</div></li>',
              '<li><div class="slider-image image-weight"></div><div class="slider-image-title">перевезем груз</div></li>',
              '<li><div class="slider-image image-shop"></div><div class="slider-image-title">заберем вас с грузом у магазина</div></li>',
              '<li><div class="slider-image image-loading"></div><div class="slider-image-title">загрузим и разгрузим</div></li>',
            '</ul>',
          '</div>',
          '<a href="" class="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slider-item="previous"></a>',
          '<a href="" class="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slider-item="next"></a>',
        '</div>',
      ].join('')
    }
  }]);

  angular.bootstrap(document, [app.name]);

})(angular);
