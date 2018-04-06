const app = angular.module('app', []);

app.controller('mainController', ($scope, $http) => {
    $scope.formData = {
        url: ''
    };
    $scope.urlObj = {};

    $scope.shortenUrl = () => {
        $http({
            url: '/api/urls',
            method: 'POST',
            data: $scope.formData
        })
            .then((response) => {
                $scope.urlObj = response.data;
            }, (err) => {
                // Intentionally blank
            });
    };
});