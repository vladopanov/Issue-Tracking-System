'use strict';

angular.module('issueTrackingSystem.dashboard', ['issueTrackingSystem.users.users-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$cookies', 'users', function($cookies, users) {
        
    }]);