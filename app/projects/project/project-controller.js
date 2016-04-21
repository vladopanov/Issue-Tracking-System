'use strict';

angular.module('issueTrackingSystem.projects.project', ['issueTrackingSystem.projects.projects-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projects/project/project-view.html',
            controller: 'ProjectCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectCtrl', ['$scope', '$route', 'projects', function($scope, $route, projects) {
        var projectId = $route.current.params.id;

        projects.getProjectById(projectId)
            .then(function(project) {
                $scope.project = project;
            });
    }]);