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
            }
        }).then(function (success) {
            deferred.resolve(success.data);
            $cookies.put('authoToken', success.data.access_token);
            console.log($cookies.get('authoToken'));
            $http.defaults.headers.common.Authorization = 'Bearer ' + success.data.access_token;
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getCurrentUser() {
        var deferred = $q.defer();

        $http.get(BASE_URL + 'Users/me')
            .then(function (success) {
                deferred.resolve(success.data);
                $cookies.put('Id', success.data.Id);
                $cookies.put('Username', success.data.Username);
                $cookies.put('isAdmin', success.data.isAdmin);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function logoutUser(id) {
        var deferred = $q.defer();

        $http.post(BASE_URL + 'api/Account/Logout', id)
            .then(function (success) {
                deferred.resolve(success);
                $cookies.remove('Id');
                $cookies.remove('Username');
                $cookies.remove('isAdmin');
                $cookies.remove('authoToken');
                $http.defaults.headers.common.Authorization = undefined;
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