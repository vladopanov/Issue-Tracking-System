'use strict';

angular.module('issueTrackingSystem.issues.issue', ['issueTrackingSystem.issues.issues-service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/issue/issue-view.html',
            controller: 'IssueCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])

    .controller('IssueCtrl', ['$scope', '$route', 'projects', 'issues', '$cookies', function($scope, $route, projects, issues, $cookies) {

    }]);