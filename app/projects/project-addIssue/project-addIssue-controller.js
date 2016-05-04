'use strict';

angular.module('issueTrackingSystem.projects.project.addIssue', [
        'issueTrackingSystem.projects.projects-service',
        'issueTrackingSystem.users.users-service'
    ])

    .controller('ProjectAddIssueCtrl', ['$scope', '$route', 'projects', 'users', '$location', '$uibModalInstance', function($scope, $route, projects, users, $location, $uibModalInstance) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.create = function (issue) {
            $uibModalInstance.close(console.log(issue));
        };
    }]);