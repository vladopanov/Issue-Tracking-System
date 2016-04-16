'use strict';

angular.module('issueTrackingSystem.home', ['issueTrackingSystem.authentication'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'authentication', function($scope, authentication) {
  $scope.register = function (user) {
    authentication.registerUser(user);
  };

  $scope.login = function (user) {
    console.log(user);
  };
}]);