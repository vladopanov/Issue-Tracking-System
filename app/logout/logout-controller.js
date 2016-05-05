'use strict';

angular.module('issueTrackingSystem.logout', ['issueTrackingSystem.users.users-service'])

    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', '$cookies', function($q, $cookies) {
                if ($cookies.get('authoToken')) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/logout', {
            templateUrl: 'logout/logout-view.html',
            controller: 'LogoutCtrl',
            resolve: routeChecks.authenticated
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('LogoutCtrl', ['$scope', 'users', '$location', function($scope, users, $location) {
        $scope.logout = function () {
            users.logoutUser()
                .then(function () {
                    toastr.success('Successful Logout');
                    $location.path('/');
                });
        }
    }]);