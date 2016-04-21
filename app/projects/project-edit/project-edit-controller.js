'use strict';

angular.module('issueTrackingSystem.projects.project.edit', ['issueTrackingSystem.projects.projects-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'projects/project-edit/project-edit-view.html',
            controller: 'ProjectEditCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectEditCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', function($scope, $route, projects, issues, $cookies) {
        var projectId = $route.current.params.id;
    }]);