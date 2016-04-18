'use strict';

angular.module('issueTrackingSystem.dashboard', ['issueTrackingSystem.users.users-service', 'issueTrackingSystem.logout'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('DashboardCtrl', ['$scope', function($scope) {

    }]);