var mainapp = angular.module('MainApp', ['ngxUtils']);

mainapp.controller('MainCtrl', function($scope) {
    
    $scope.doSomething = function() {
        return alert('you confirmed!');
    }
    
    $scope.doOnCancel = function() {
        return alert('cancel-click called');
    }
    
    $scope.format = 'dd.MM.yyyy hh:mm:ss';
    
});