'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
    'ngRoute',
    'ngCookies',
    'issueTrackingSystem.welcome',
    'issueTrackingSystem.navbar',
    'issueTrackingSystem.projects',
    'issueTrackingSystem.projects.add',
    'issueTrackingSystem.users.users-service',
    'issueTrackingSystem.projects.projects-service',
    'issueTrackingSystem.issues.issues-service',
    'issueTrackingSystem.logout',
    'issueTrackingSystem.dashboard',
    'issueTrackingSystem.projects.project',
    'issueTrackingSystem.projects.project.edit',
    'issueTrackingSystem.issues.issue',
    'issueTrackingSystem.issues.issue.edit',
    'issueTrackingSystem.profile.password'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('/');
            }
        });

        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('authoToken');
    }])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');