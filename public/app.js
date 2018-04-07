const app = angular.module('app', ['angular-clipboard']);

app.controller('mainController', ($scope, $http) => {
    $scope.domain = "";
    $scope.long = "";
    $scope.short = "";
    $scope.copied = false;

    $http.get('/api/domain')
        .then((response) => {
            $scope.domain = response.data.domain;
        }, (err) => {
            // Intentionally blank
        });

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