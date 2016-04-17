'use strict';

angular.module('issueTrackingSystem.authentication', [])

.factory('authentication', ['$http', '$q', '$cookies', 'BASE_URL', function ($http, $q, $cookies, BASE_URL) {
    function registerUser(user) {
        var deferred = $q.defer();

        $http.post(BASE_URL + 'Account/Register', user)
            .then(function (success) {
                deferred.resolve(success.data)
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function loginUser(user) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: BASE_URL + 'Token',
            data: 'Username=' + user.Username + '&Password=' + user.Password + '&grant_type=password',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
            $cookies.put('authoToken', response.data.access_token);
        }, function errorCallback(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser
    }
}]);