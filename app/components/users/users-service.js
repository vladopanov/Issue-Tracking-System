'use strict';

angular.module('issueTrackingSystem.users.users-service', [])

.factory('users', ['$http', '$q', '$cookies', 'BASE_URL', function ($http, $q, $cookies, BASE_URL) {
    function registerUser(user) {
        var deferred = $q.defer();

        $http.post(BASE_URL + 'api/Account/Register', user)
            .then(function (success) {
                deferred.resolve(success.data);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function loginUser(user) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: BASE_URL + 'api/Token',
            data: 'Username=' + user.Username + '&Password=' + user.Password + '&grant_type=password',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(function (success) {
            $cookies.put('authoToken', success.data.access_token);
            deferred.resolve(success.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getCurrentUser() {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: BASE_URL + 'Users/me',
            headers: {
                'Authorization': 'Bearer ' + $cookies.get('authoToken')
            }})
            .then(function (success) {
                $cookies.put('id', success.data.Id);
                deferred.resolve(success.data);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function logoutUser() {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: BASE_URL + 'api/Account/Logout',
            headers: {
                'Authorization': 'Bearer ' + $cookies.get('authoToken')
            }})
            .then(function (success) {
                $cookies.remove('authoToken');
                $cookies.remove('id');
                deferred.resolve(success);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;

    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        getCurrentUser: getCurrentUser,
        logoutUser: logoutUser
    }
}]);