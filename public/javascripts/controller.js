var app = angular.module('altizonApp',['ngRoute','ngAnimate']);

app.controller('altizonAppCtrl',[
  '$scope',
'$http',
'$location',

  function($scope,$http,$location) {
  console.log("hello @4");

  $scope.credentialsSubmitted=function(){
    $scope.showLoginFailed=false;

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
          if (data["error"] !== undefined) {
            $scope.showLoginFailed=true;
          }
          else {
            console.log("in else part");
            $location.path('/dashboards');
          }
        });
      }
  }
}]);




app.controller('dashboardsCtrl',[
  '$scope',
  '$http',
  '$location',

  function($scope,$http) {

}]);
