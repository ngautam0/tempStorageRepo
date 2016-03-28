var application=angular.module('altizonApp', ['ngRoute']);
console.log("1 in route provider");

application.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log("2 in route provider");
    $routeProvider.
      when('/', {
        templateUrl: './login.html',
        controller: 'altizonAppCtrl'
      })
      // .when('/dashboards',{
      //   templateUrl: './dashboards.html',
      //   controller: 'altizonAppCtrl'
      // })
      .otherwise({redirectTo: '/'});
  }]);
console.log("3 in route provider");
