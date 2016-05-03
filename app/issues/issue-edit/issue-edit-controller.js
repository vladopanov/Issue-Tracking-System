'use strict';

angular.module('issueTrackingSystem.issues.issue.edit', [
    'issueTrackingSystem.issues.issues-service',
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

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'issues/issue-edit/issue-edit-view.html',
            controller: 'IssueEditCtrl',
            resolve: routeChecks.authenticated
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('IssueEditCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', 'users', '$location', function($scope, $route, projects, issues, $cookies, users, $location) {
        var issueId = $route.current.params.id;
        var projectId = null;
        var labels = [];

        issues.getIssueById(issueId)
            .then(function(issue) {
                $scope.issue = issue;

                issue.Labels.forEach(function(label) {
                    labels.push(label.Name);
                });
                $scope.labels = labels.join(', ');

                projectId = issue.Project.Id;
            })
            .then(function() {
                projects.getProjectById(projectId)
                    .then(function(project) {
                        $scope.projectLeadId = project.Lead.Id;
                    });
            });

        $scope.editIssue = function(issue) {
            var editedIssue = {};

            users.getUserByUsername(issue.Assignee.Username)
                .then(function(user) {
                    editedIssue.Title = issue.Title;
                    editedIssue.Description = issue.Description;
                    editedIssue.DueDate = issue.DueDate;
                    editedIssue.AssigneeId = user.Id;
                    editedIssue.PriorityId = issue.Priority.Id;

                    var editedLabels = [];
                    labels.forEach(function(label) {
                        editedLabels.push({Name: label});
                    });
                    editedIssue.Labels = editedLabels;

                    issues.editIssue(issueId, editedIssue)
                        .then(function() {
                            $location.path('/issues/' + issueId);
                        });
                });
        };

        //projects.getProjectById(projectId)
        //    .then(function(project) {
        //        $scope.projectLeadId = project.Lead.Id;
        //    });

        $scope.userId = $cookies.get('id');
    }]);