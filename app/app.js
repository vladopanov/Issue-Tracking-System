'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngCookies',
  'issueTrackingSystem.home',
  'issueTrackingSystem.dashboard'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])

.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');