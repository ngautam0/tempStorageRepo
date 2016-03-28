var app = angular.module('altizonApp');

app.controller('altizonAppCtrl',[
  '$scope',
'$http',
'$location',

  function($scope,$http,$location) {
  console.log("hello @4");
  $scope.showLoginScreen=true;
  $scope.showDashboardsList=false;
  $scope.showLoginFailed=false;


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
          if (data["error"] !== undefined) {
            $scope.showLoginFailed=true;
          }
          else {
            // $location.path('/dashboards');
            $scope.showLoginScreen=false;
            $scope.showDashboardsList=true;
            $scope.things=data["things"];
            console.log($scope.things);
            console.log("in else part");

          }
        });
      }
  }
  $scope.logout=function(){
    window.location.reload();

  }
}]);
