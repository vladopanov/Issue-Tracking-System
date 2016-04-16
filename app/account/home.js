'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'account/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.login = function (user) {
    console.log(user)
  };

  $scope.register = function (user) {
    console.log(user)
  };
}]);