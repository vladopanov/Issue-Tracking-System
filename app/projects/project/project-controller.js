'use strict';

angular.module('issueTrackingSystem.projects.project', [
    'issueTrackingSystem.projects.projects-service',
    'issueTrackingSystem.projects.project.addIssue'
    ])

    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', '$cookies', function($q, $cookies) {
                if ($cookies.get('authoToken')) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects/:id', {
            templateUrl: 'projects/project/project-view.html',
            controller: 'ProjectCtrl',
            resolve: routeChecks.authenticated
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', '$uibModal', function($scope, $route, projects, issues, $cookies, $uibModal) {
        var projectId = $route.current.params.id;

        projects.getProjectById(projectId)
            .then(function(project) {
                $scope.project = project;
                $scope.projectLeaderId = project.Lead.Id;

                var labels = [];
                project.Labels.forEach(function(label) {
                    labels.push(label.Name);
                });
                $scope.labels = labels.join(', ');

                var priorities = [];
                project.Priorities.forEach(function(priority) {
                    priorities.push(priority.Name);
                });
                $scope.priorities = priorities.join(', ');
            });

        issues.getProjectIssuesById(projectId)
            .then(function(issues) {
                $scope.issues = issues;
            });

        $scope.userId = $cookies.get('id');

        $scope.openModal = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'projects/project-addIssue/project-addIssue-view.html',
                controller: 'ProjectAddIssueCtrl'
            });
        }
    }]);