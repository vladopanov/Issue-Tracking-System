'use strict';

angular.module('issueTrackingSystem.welcome', ['issueTrackingSystem.users.users-service'])

    .controller('HomeCtrl', ['$scope', '$location', 'users', '$cookies', '$route', function($scope, $location, users, $cookies, $route) {
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
                .then(function() {
                    users.getCurrentUser();
                })
                    .then(function () {
                        $route.reload();
                    });
        };

        $scope.isLoggedIn = function() {
            return $cookies.get('authoToken');
        }
}])

    .directive('welcomeDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'welcome/welcome-view.html',
            controller: 'HomeCtrl'
        }
    });