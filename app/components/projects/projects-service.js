'use strict';

angular.module('issueTrackingSystem.projects.projects-service', [])

    .factory('projects', ['$http', '$q', '$cookies', 'BASE_URL', function ($http, $q, $cookies, BASE_URL) {
        function getProjectsByCurrentUserLeadId() {
            var deferred = $q.defer(),
                id = $cookies.get('id');

            $http({
                method: 'GET',
                url: BASE_URL + 'projects?filter=Lead.Id="' + id + '"&pageSize=100&pageNumber=1',
                headers: {
                    'Authorization': 'Bearer ' + $cookies.get('authoToken')
                }})
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllProjects() {
            var deferred = $q.defer(),
                data = [];

            $http({
                method: 'GET',
                url: BASE_URL + 'projects',
                headers: {
                    'Authorization': 'Bearer ' + $cookies.get('authoToken')
                }})
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getProjectsByCurrentUserLeadId: getProjectsByCurrentUserLeadId,
            getAllProjects: getAllProjects
        }
    }]);