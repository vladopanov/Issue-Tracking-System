'use strict';

angular.module('issueTrackingSystem.dashboard', ['issueTrackingSystem.users.users-service', 'issueTrackingSystem.logout'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'DashboardCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('DashboardCtrl', ['$scope', '$cookies', function($scope, $cookies) {
        $scope.isLoggedIn = function() {
            return $cookies.get('authoToken');
        }
    }])

    .directive('dashboardDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        }
    });