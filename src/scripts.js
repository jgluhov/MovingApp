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

  angular.bootstrap(document, [app.name]);

})(angular);
