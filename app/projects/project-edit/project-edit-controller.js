'use strict';

angular.module('issueTrackingSystem.projects.project.edit', [
    'issueTrackingSystem.projects.projects-service',
    'issueTrackingSystem.users.users-service'
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

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'projects/project-edit/project-edit-view.html',
            controller: 'ProjectEditCtrl',
            resolve: routeChecks.authenticated
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectEditCtrl', ['$scope', '$route', 'projects', 'users', '$location', '$cookies', function($scope, $route, projects, users, $location, $cookies) {
        var projectId = $route.current.params.id;
        var labels = [];
        var priorities = [];

        $scope.isAdmin = $cookies.get('isAdmin');

        projects.getProjectById(projectId)
            .then(function(project) {
                $scope.project = project;

                project.Labels.forEach(function(label) {
                    labels.push(label.Name);
                });
                $scope.labels = labels.join(', ');

                project.Priorities.forEach(function(priority) {
                    priorities.push(priority.Name);
                });
                $scope.priorities = priorities.join(', ');
            });

        $scope.editProject = function(projectToEdit, labels, priorities) {
            var editedProject = {};
            users.getUserByUsername(projectToEdit.Lead.Username)
                .then(function(user) {
                    editedProject.Name = projectToEdit.Name;
                    editedProject.Description = projectToEdit.Description;
                    editedProject.LeadId = user.Id;

                    var editedLabels = [];
                    labels.split(', ').forEach(function(label) {
                        editedLabels.push({Name: label});
                    });
                    editedProject.labels = editedLabels;

                    var editedPriorities = [];
                    priorities.split(', ').forEach(function(priority) {
                        editedPriorities.push({Name: priority});
                    });
                    editedProject.priorities = editedPriorities;

                    projects.editProject(projectId, editedProject)
                        .then(function() {
                            $location.path('/projects/' + projectId);
                        });
                });
        }
    }]);