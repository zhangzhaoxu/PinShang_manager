var app = angular.module('myApp', []);

app.factory('Service', function ($http) {
    var MemberData;
    var TRe
    return {text:MemberData};
});

app.controller('SelectController', function($scope, Service) {
    $scope.service = Service;
    alert($scope.service.text);
});

app.controller('GraphController', function($scope, Service) {
    $scope.service = Service;

});

