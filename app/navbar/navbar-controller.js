'use strict';

angular.module('issueTrackingSystem.navbar', ['issueTrackingSystem.users.users-service', 'issueTrackingSystem.logout'])

    .controller('NavbarCtrl', ['$scope', '$cookies', function($scope, $cookies) {
        $scope.isLoggedIn = function() {
            return $cookies.get('authoToken');
        };
    }])

    .directive('navbarDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'navbar/navbar-view.html'
        }
    });