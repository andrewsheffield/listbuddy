app.factory('loginFactory', function($http){
  var factory = {};

  var baseURL = '/api/v1/user/';

  factory.attemptLogin = function(data){
  	return $http.post(baseURL+"login", data);
  };

  return factory;
});


app.controller('loginController', function($scope, $location, loginFactory) {
	
	$scope.failedAuth = false;
	$scope.loginData = {};



	$scope.attemptLogin = function() {
		loginFactory.attemptLogin($scope.loginData)
			.success(function(user) {
				$location.path('/dash');
			})
			.error(function(err) {
				$scope.failedAuth = true;
				console.log(err);
			});
	}

});