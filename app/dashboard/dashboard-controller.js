'use strict';

angular.module('issueTrackingSystem.dashboard', ['issueTrackingSystem.projects.projects-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'dashboard/dashboard-view.html',
            controller: 'DashboardCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('DashboardCtrl', ['$scope', 'projects',  function($scope, projects) {
        projects.getAllProjects()
            .then(function(allProjects) {
                $scope.allProjects = allProjects;
        });

        projects.getProjectsByCurrentUserLeadId()
            .then(function(projectsByCurrentUserId) {
                $scope.projectsByCurrentUserId = projectsByCurrentUserId;
            });
    }]);