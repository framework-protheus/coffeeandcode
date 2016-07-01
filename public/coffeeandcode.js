angular
    .module('CoffeeAndCodeApp', [])
    .controller('CoffeeAndCodeController', ['$scope', '$http', function ($scope, $http) {
        $scope.topics = [];

        // $http.get('topics').then(function(response) {
        //     if (typeof response.data === "object") {
        //         for (key in response.data) {
        //             $scope.topics.push(response.data[key]);
        //         }
        //     }
        // });
    }]);