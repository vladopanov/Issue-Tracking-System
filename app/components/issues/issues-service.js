'use strict';

angular.module('issueTrackingSystem.issues.issues-service', [])

    .factory('issues', ['$http', '$q', '$cookies', 'BASE_URL', function ($http, $q, $cookies, BASE_URL) {
        function getMyIssues() {
            var deferred = $q.defer(),
                id = $cookies.get('id');

            $http({
                method: 'GET',
                url: BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=100&pageNumber=1'
            })
                //headers: {
                //    'Authorization': 'Bearer ' + $cookies.get('authoToken')
                //}})
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getProjectIssuesById(id) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + 'projects/' + id + '/Issues'
            })
                //headers: {
                //    'Authorization': 'Bearer ' + $cookies.get('authoToken')
                //}})
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssueById(id) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + 'issues/' + id
            })
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getMyIssues: getMyIssues,
            getProjectIssuesById: getProjectIssuesById,
            getIssueById: getIssueById
        }
    }]);