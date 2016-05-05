'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
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
    'issueTrackingSystem.projects.project.addIssue',
    'issueTrackingSystem.issues.issue',
    'issueTrackingSystem.issues.issue.edit',
    'issueTrackingSystem.profile.password'
])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.interceptors.push(['$q','toastr', function($q, toastr) {
            return {
                'responseError': function(rejection) {
                    if (rejection.statusText) {
                        toastr.error(rejection.statusText);
                    }

                    return $q.reject(rejection);
                }
            }
        }]);
    }])

    .run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('/');
            }
        });

        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('authoToken');
    }])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('toastr', toastr);