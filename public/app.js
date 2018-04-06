const app = angular.module('app', []);

app.controller('mainController', ($scope, $http) => {
    $scope.long = "";
    $scope.short = "";

    $scope.shortenUrl = () => {
        $http.post(
            '/api/urls',
            {
                long: $scope.long
            } 
        ).then((response) => {
                $scope.short = response.data.short;
            }, (err) => {
                // Intentionally blank
            });
    };
});