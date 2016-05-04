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

        function editIssue(id, issue) {
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: BASE_URL + 'issues/' + id,
                data: issue
            })
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function changeIssueStatus(id, status) {
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: BASE_URL + 'issues/' + id + '/changestatus?statusid=' + status
            })
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function createIssue(issue) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: BASE_URL + 'issues',
                data: issue
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
            getIssueById: getIssueById,
            editIssue: editIssue,
            changeIssueStatus: changeIssueStatus,
            createIssue: createIssue
        }
    }]);