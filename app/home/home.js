'use strict';

angular.module('issueTrackingSystem.home', ['issueTrackingSystem.authentication'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {
  $scope.register = function (user) {
    authentication.registerUser(user)
        .then(function () {
          authentication.loginUser({Username: user.Email, Password: user.ConfirmPassword})
              .then(function () {
                $location.url('/dashboard');
              });
        });
  };

  $scope.login = function (user) {
    authentication.loginUser(user)
        .then(function () {
          $location.url('/dashboard');
        });
  };
}]);