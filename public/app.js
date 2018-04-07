const app = angular.module('app', ['angular-clipboard']);

app.controller('mainController', ($scope, $http, $location) => {
    $scope.domain = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    $scope.long = "";
    $scope.short = "";
    $scope.copied = false;

    $scope.shortenUrl = () => {
        $scope.copied = false;

        if ($scope.long === "") {
            $scope.short = "";
            return;
        }

        $http.post('/api/urls', { long: $scope.long })
            .then((response) => {
                $scope.short = $scope.domain + "/" + response.data.short;
            }, (err) => {
                // Intentionally blank
            });
    };

    $scope.copySuccess = function () {
        $scope.copied = true;
    };

    $scope.copyErr = function (err) {
        // Intentionally blank
    };
});