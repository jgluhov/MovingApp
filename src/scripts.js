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
  });

  app.run(['$rootScope', '$sessionStorage',
    function ($rootScope, $sessionStorage) {
      $rootScope.$storage = $sessionStorage;
    }]);

  app.controller('CalculateController',
    ['$scope', '$rootScope', function ($scope, $rootScope) {

      $rootScope.$storage.movements = $rootScope.$storage.movements || [];

      $scope.movement = {};

      $scope.onSubmit = function () {
        $rootScope.$storage.movements.push(angular.copy($scope.movement));
        $scope.movement = {};
      }

    }]);

  app.controller('OrderController',
    ['$scope', '$rootScope', function ($scope, $rootScope) {
      
      $rootScope.$storage.orders = $rootScope.$storage.orders || [];
      
      $scope.order = {};

      $scope.onSubmit = function (form) {
        if(form.$invalid) return;

        $rootScope.$storage.orders.push(angular.copy($scope.order));
        $scope.order = {};
      }
      
    }]);

  angular.bootstrap(document, [app.name]);

})(angular);
