'use strict';

angular.module('issueTrackingSystem.projects.project.edit', ['issueTrackingSystem.projects.projects-service'])

    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', '$cookies', function($q, $cookies) {
                if ($cookies.get('authoToken')) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'projects/project-edit/project-edit-view.html',
            controller: 'ProjectEditCtrl',
            resolve: routeChecks.authenticated
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectEditCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', function($scope, $route, projects, issues, $cookies) {
        var projectId = $route.current.params.id;
    }]);