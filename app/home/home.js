'use strict';

angular.module('issueTrackingSystem.home', ['issueTrackingSystem.users.users-service'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeCtrl'
    });
}])

    .controller('HomeCtrl', ['$scope', '$location', 'users', '$window', '$route', function($scope, $location, users, $window, $route) {
        $scope.register = function (user) {
            users.registerUser(user)
                .then(function () {
                    users.loginUser({Username: user.Email, Password: user.ConfirmPassword})
                        .then(function () {
                            $route.reload();
                        });
            });
        };

        $scope.login = function (user) {
            users.loginUser(user)
                .then(function () {
                    users.getCurrentUser();
                })
                    .then(function () {
                        $route.reload();
                    });
        };

        $scope.isLoggedIn = function() {
            return $window.sessionStorage.authoToken;
        }
}])

    .directive('homeDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        }
    });