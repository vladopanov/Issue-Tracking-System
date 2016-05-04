'use strict';

angular.module('issueTrackingSystem.projects.project.addIssue', [
        'issueTrackingSystem.projects.projects-service',
        'issueTrackingSystem.users.users-service',
        'issueTrackingSystem.issues.issues-service'
    ])

    .controller('ProjectAddIssueCtrl', ['$scope', '$route', 'projects', 'users', 'issues', '$location', '$uibModalInstance', function($scope, $route, projects, users, issues, $location, $uibModalInstance) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        projects.getAllProjects()
            .then(function(projects) {
                $scope.projects = projects;
            });

        users.getAllUsers()
            .then(function(users) {
                $scope.users = users;
            });

        var projectId = $route.current.params.id;
        projects.getProjectById(projectId)
            .then(function(project) {
                $scope.priorities = project.Priorities;
            });

        $scope.create = function (issue) {
            var labels = [];
            issue.Labels.forEach(function(label) {
                labels.push({Name: label});
            });
            issue.Labels = labels;
            $uibModalInstance.close(issues.createIssue(issue)
                .then(function() {
                    $route.reload();
                })
            );
        };
    }]);