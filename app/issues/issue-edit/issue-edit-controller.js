'use strict';

angular.module('issueTrackingSystem.issues.issue.edit', ['issueTrackingSystem.issues.issues-service'])

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

    .controller('IssueEditCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', function($scope, $route, projects, issues, $cookies) {
        var issueId = $route.current.params.id;
        var projectId = null;

        issues.getIssueById(issueId)
            .then(function(issue) {
                $scope.issue = issue;

                var labels = [];
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

        //projects.getProjectById(projectId)
        //    .then(function(project) {
        //        $scope.projectLeadId = project.Lead.Id;
        //    });

        $scope.userId = $cookies.get('id');
    }]);