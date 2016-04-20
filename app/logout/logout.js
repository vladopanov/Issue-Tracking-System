'use strict';

angular.module('issueTrackingSystem.logout', ['issueTrackingSystem.users.users-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'logout/logout.html',
            controller: 'LogoutCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('LogoutCtrl', ['$scope', 'users', '$window', '$location', function($scope, users, $window, $location) {
        var id = $window.sessionStorage.Id;
        console.log(id);
        $scope.logout = function () {
            users.logoutUser(id)
                .then(function () {
                    $location.url('/');
                });
        }
    }]);