'use strict';

angular.module('issueTrackingSystem.projects.project.addIssue', [
        'issueTrackingSystem.projects.projects-service',
        'issueTrackingSystem.users.users-service'
    ])

    .controller('ProjectAddIssueCtrl', ['$scope', '$route', 'projects', 'users', '$location', '$uibModalInstance', function($scope, $route, projects, users, $location, $uibModalInstance) {

    }]);