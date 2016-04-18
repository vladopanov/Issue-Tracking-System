'use strict';

angular.module('issueTrackingSystem.projects.add', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'projects/add/projects-add.html',
            controller: 'ProjectsAddCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectsAddCtrl', ['$scope', function($scope) {

    }]);