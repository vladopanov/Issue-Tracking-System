'use strict';

angular.module('issueTrackingSystem.logout', ['issueTrackingSystem.users.users-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'logout/logout-view.html',
            controller: 'LogoutCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('LogoutCtrl', ['$scope', 'users', '$location', function($scope, users, $location) {
        $scope.logout = function () {
            users.logoutUser()
                .then(function () {
                    $location.url('/');
                });
        }
    }]);