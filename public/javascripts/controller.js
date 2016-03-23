var app = angular.module('altizonApp',[]);

app.controller('altizonAppCtrl',[
  '$scope',
  '$http',
  '$parse',

  function($scope,$http) {
  console.log("hello @4");

  $scope.credentialsSubmitted=function(){

      if (!$scope.username || $scope.username === ''|| !$scope.password || $scope.password === '' ) {
        return;
      }
      else{
        // alert($scope.username);
        // alert($scope.password);
        var userAndPass={
          "user":$scope.username,
          "password":$scope.password
        }
        $scope.showLoadingScreen=true;
        $http({method: 'Post', url: '/loginIntoAltizon', data: {user: $scope.username,password:$scope.password}}).
        success(function(data, status, headers, config) {
          console.log(data);
          $scope.showLoadingScreen=false;
        });
      }
  }
}]);
