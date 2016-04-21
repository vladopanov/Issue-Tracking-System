'use strict';

angular.module('issueTrackingSystem.projects.project', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projects/project/project-view.html',
            controller: 'ProjectCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('ProjectCtrl', ['$scope', function($scope) {

    }]);