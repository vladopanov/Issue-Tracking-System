'use strict';

angular.module('issueTrackingSystem.projects.projects-service', [])

    .factory('projects', ['$http', '$q', '$cookies', 'BASE_URL', function ($http, $q, $cookies, BASE_URL) {
        function getProjectsByCurrentUserLeadId() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + 'projects?filter=Lead.Id="' + $cookies.get('id') + '"&pageSize=100&pageNumber=1'
            })
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllProjects() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + 'projects'
            })
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getProjectById(id) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + 'projects/' + id
            })
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function editProject(id, project) {
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: BASE_URL + 'Projects/' + id,
                data: project
            })
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getProjectsByCurrentUserLeadId: getProjectsByCurrentUserLeadId,
            getAllProjects: getAllProjects,
            getProjectById: getProjectById,
            editProject: editProject
        }
    }]);