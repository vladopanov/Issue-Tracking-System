'use strict';

angular.module('issueTrackingSystem.dashboard', [
    'issueTrackingSystem.projects.projects-service',
    'issueTrackingSystem.issues.issues-service'
    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'dashboard/dashboard-view.html',
            controller: 'DashboardCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('DashboardCtrl', ['$scope', 'projects', 'issues',  function($scope, projects, issues) {
        projects.getAllProjects()
            .then(function(allProjects) {
                $scope.allProjects = allProjects;
        });

        projects.getProjectsByCurrentUserLeadId()
            .then(function(projectsByCurrentUserId) {
                $scope.projectsByCurrentUserId = projectsByCurrentUserId;
            });

        issues.getMyIssues()
            .then(function(myIssues) {
                $scope.myIssues = myIssues;
            });
    }]);