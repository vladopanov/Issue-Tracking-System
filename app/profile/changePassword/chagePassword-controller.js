'use strict';

angular.module('issueTrackingSystem.profile.password', ['issueTrackingSystem.users.users-service'])

    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', '$cookies', function($q, $cookies) {
                if ($cookies.get('authoToken')) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/profile/password', {
            templateUrl: 'profile/changePassword/changePassword-view.html',
            controller: 'ChangePasswordCtrl',
            resolve: routeChecks.authenticated
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ChangePasswordCtrl', ['$scope', 'users', '$location', function($scope, users, $location) {
        $scope.changePassword = function (password) {
            users.changePassword(password)
                .then(function () {
                    $location.path('/');
                });
        };


    }]);