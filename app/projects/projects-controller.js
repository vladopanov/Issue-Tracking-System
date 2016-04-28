'use strict';

angular.module('issueTrackingSystem.projects', ['issueTrackingSystem.projects.projects-service'])

    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', '$cookies', function($q, $cookies) {
                if ($cookies.get('authoToken')) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects', {
            templateUrl: 'projects/projects-view.html',
            controller: 'ProjectsCtrl',
            resolve: routeChecks.authenticated
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectsCtrl', ['$scope', '$route', 'projects', '$cookies', function($scope, $route, projects, $cookies) {
        projects.getAllProjects()
            .then(function(allProjects) {
                $scope.allProjects = allProjects;
            });

        $scope.userId = $cookies.get('id');
    }]);