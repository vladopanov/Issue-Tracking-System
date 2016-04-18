'use strict';

angular.module('issueTrackingSystem.home', ['issueTrackingSystem.users.users-service'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
    });
}])

    .controller('HomeCtrl', ['$scope', '$location', 'users', '$cookies', function($scope, $location, users, $cookies) {
        if ($cookies.get('authoToken')) {
            $location.url('/dashboard');
        }

        $scope.register = function (user) {
            users.registerUser(user)
                .then(function () {
                    users.loginUser({Username: user.Email, Password: user.ConfirmPassword})
                        .then(function () {
                            $location.url('/dashboard');
                        });
            });
        };

        $scope.login = function (user) {
            users.loginUser(user)
                .then(function () {
                    $location.url('/dashboard');
                })
              .then(function () {
                  users.getCurrentUser();
              });
        };
}]);