app.factory('loginFactory', function($http){
  var factory = {};

  var baseURL = '/api/v1/';

  factory.attemptLogin = function(data){
  	return $http.post(baseURL+"user/login", data);
  };

  return factory;
});


app.controller('loginController', function($scope, $location, loginFactory, DashFactory) {
	
	$scope.failedAuth = false;
	$scope.loginData = {};

	$scope.loading = 0;


	$scope.attemptLogin = function() {
		$scope.loading = 1;
		loginFactory.attemptLogin($scope.loginData)
			.success(function(user) {
				$scope.loading = 0;
				DashFactory.user = user;
				console.log(user);
				$location.path('/dash');
			})
			.error(function(err) {
				$scope.loading = 0;
				$scope.failedAuth = true;
				console.log(err);
			});
	}

});