'use strict';

angular.module('issueTrackingSystem.dashboard', [
    'issueTrackingSystem.projects.projects-service',
    'issueTrackingSystem.issues.issues-service',
    'issueTrackingSystem.users.users-service'
    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'dashboard/dashboard-view.html',
            controller: 'DashboardCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('DashboardCtrl', ['$scope', 'users', 'projects', 'issues', '$cookies',  function($scope, users, projects, issues, $cookies) {
        $scope.isAdmin = $cookies.get('isAdmin');

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