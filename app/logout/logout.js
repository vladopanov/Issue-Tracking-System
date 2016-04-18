'use strict';

angular.module('issueTrackingSystem.logout', ['issueTrackingSystem.users.users-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'logout/logout.html',
            controller: 'LogoutCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('LogoutCtrl', ['$scope', 'users', '$cookies', '$location', function($scope, users, $cookies, $location) {
        $scope.logout = function () {
            users.logoutUser($cookies.get('Id'))
                .then(function () {
                    $location.url('/');
                });
        }
    }]);