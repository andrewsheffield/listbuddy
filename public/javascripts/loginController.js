app.factory('loginFactory', function($http){
  var factory = {};

  var baseURL = '/api/v1/';

  factory.attemptLogin = function(data){
  	return $http.post(baseURL+"user/login", data);
  };

  factory.checkForAuth = function() {
    var url = baseURL + "user/auth";
    return $http.get(url);
  }

  return factory;
});


app.controller('loginController', function($scope, $location, loginFactory) {
	
	$scope.failedAuth = false;
	$scope.loginData = {};

	$scope.loading = 0;

	$scope.checkForAuth = function() {
		$scope.loading = 1;
    loginFactory.checkForAuth()
      .success(function(user) {
      	$scope.loading = 0;
        $location.path('/dash');
      })
      .error(function(err) {
      	$scope.loading = 0;
        console.log(err);
      });
  }();


	$scope.attemptLogin = function() {
		$scope.loading = 1;
		loginFactory.attemptLogin($scope.loginData)
			.success(function(user) {
				$scope.loading = 0;
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