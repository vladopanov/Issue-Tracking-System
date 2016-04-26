'use strict';

angular.module('issueTrackingSystem.issues.issue', ['issueTrackingSystem.issues.issues-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/issue/issue-view.html',
            controller: 'IssueCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('IssueCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', function($scope, $route, projects, issues, $cookies) {
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