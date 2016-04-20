'use strict';

angular.module('issueTrackingSystem.users.users-service', [])

.factory('users', ['$http', '$q', '$window', 'BASE_URL', function ($http, $q, $window, BASE_URL) {
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
            $window.sessionStorage['authoToken'] = success.data.access_token;
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
                var userInfo  = {
                    Id: success.data.Id,
                    Username: success.data.Username,
                    isAdmin: success.data.isAdmin
                };
                $window.sessionStorage['Id'] = success.data.Id;

                //$cookies.put('Id', success.data.Id);
                //$cookies.put('Username', success.data.Username);
                //$cookies.put('isAdmin', success.data.isAdmin);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function logoutUser(id) {
        var deferred = $q.defer();
        $http.defaults.headers.common.Authorization = 'Bearer ' + $window.sessionStorage['authoToken'];

        $http.post(BASE_URL + 'api/Account/Logout', id)
            .then(function (success) {
                window.sessionStorage.clear();
                $http.defaults.headers.common.Authorization = null;
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