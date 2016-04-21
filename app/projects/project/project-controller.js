'use strict';

angular.module('issueTrackingSystem.projects.project', ['issueTrackingSystem.projects.projects-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projects/project/project-view.html',
            controller: 'ProjectCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', function($scope, $route, projects, issues, $cookies) {
        var projectId = $route.current.params.id;

        projects.getProjectById(projectId)
            .then(function(project) {
                $scope.project = project;
                $scope.projectLeaderId = project.Lead.Id;
            });

        issues.getProjectIssuesById(projectId)
            .then(function(issues) {
                $scope.issues = issues;
            });

        $scope.userId = $cookies.get('id');
    }]);