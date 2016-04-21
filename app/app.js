'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
    'ngRoute',
    'ngCookies',
    'issueTrackingSystem.welcome',
    'issueTrackingSystem.navbar',
    'issueTrackingSystem.projects.add',
    'issueTrackingSystem.users.users-service',
    'issueTrackingSystem.projects.projects-service',
    'issueTrackingSystem.issues.issues-service',
    'issueTrackingSystem.logout',
    'issueTrackingSystem.dashboard',
    'issueTrackingSystem.projects.project',
    'issueTrackingSystem.projects.project.edit'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');