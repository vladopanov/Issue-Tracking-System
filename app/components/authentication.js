'use strict';

angular.module('issueTrackingSystem.authentication', [])

.factory('authentication', ['$http', '$q', 'BASE_URL', function ($http, $q, BASE_URL) {
    function registerUser(user) {
        var deferred = $q.defer();

        $http.post(BASE_URL + 'Account/Register', user)
            .then(function (success) {
                deferred.resolve(success.data);
            }, function (error) {
                console.log(error.data.Message);
            });

        return deferred.promise;
    }

    function loginUser(user) {

    }

    return {
        registerUser: registerUser,
        loginUser: loginUser
    }
}]);