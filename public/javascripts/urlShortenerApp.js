const app = angular.module('urlShortener', ['angular-clipboard']);

app.controller('mainController', ($scope, $http, $location) => {
    $scope.long = "";
    $scope.short = "";
    $scope.copied = false;

    $scope.shortenUrl = () => {
        $scope.copied = false;

        if ($scope.long === "") {
            $scope.short = "";
            return;
        }

        $http.post('api/urls', { long: $scope.long })
            .then((response) => {
                $scope.short = $location.absUrl() + response.data.short;
            }, (err) => {
                // Intentionally blank
            });
    };

    $scope.copySuccess = () => {
        $scope.copied = true;
    };

    $scope.copyErr = (err) => {
        // Intentionally blank
    };
});