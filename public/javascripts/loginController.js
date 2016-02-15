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

  factory.attemptSignup = function (data) {
  	return $http.post(baseURL + "user/create", data);
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
		disableButton(".btn-login");
		loginFactory.attemptLogin($scope.loginData)
			.success(function(user) {
				$scope.loading = 0;
				$location.path('/dash');
				enableButton(".btn-login");
			})
			.error(function(err) {
				$scope.loading = 0;
				$scope.failedAuth = true;
				console.log(err);
				enableButton(".btn-login");
			});
	}

	$scope.attemptSignup = function() {
		$scope.loading = 1;
		disableButton(".btn-signup");
		loginFactory.attemptSignup($scope.signup)
			.success(function(user) {
				$scope.loading = 0;
				$location.path('/dash');
				enableButton(".btn-signup");
			})
			.error(function(err) {
				console.log(err);
				$scope.loading = 0;
				$scope.failedAuth = true;
				enableButton(".btn-signup");
			});
	}

	var disableButton = function (btn_class_name) {
		$(btn_class_name)
			.addClass('disabled')
			.find('span')
			.not('.spin')
			.hide();
	}

	var enableButton = function (btn_class_name) {
		$(btn_class_name)
			.removeClass('disabled')
			.find('span')
			.not('.spin')
			.show();;
	}

});