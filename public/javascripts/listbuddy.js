var app = angular.module('ListBuddyApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/login.html"})
    .when("/dash", {templateUrl: "partials/dash.html"});
});