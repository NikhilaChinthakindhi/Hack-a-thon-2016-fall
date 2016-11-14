angular.module('app.controllers', [])
  


.controller('mainpageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('login_Ctrl', function ($scope, LoginService, $stateParams, $state) {

    $scope.user_login =  function(){
        console.log('in login controller' );
        LoginService.loginUser($scope.login_user, $scope.login_password).success(function(data) {
                console.log("in controller" + data[0])
                $state.go('home');
                }).error(function(data) {
                                            alert("Log in failed!! please check your credentials and Network connection!");
                                            });                                    
    }

})
   
.controller('signupCtrl', function ($scope, RegisterService, $stateParams, $ionicPopup, $state) {
    
    $scope.data={};
    $scope.register = function(){
        console.log($scope.password);
        console.log($scope.cnf_password);
        if($scope.password === $scope.cnf_password){ 
           // if($scope.password.length > 5 ){
                var user_viral_coeff = 0.25;
                var checkout_points = 0;
                console.log('refered user::'+ $scope.user_refered) ;  
                RegisterService.RegisterUser($scope.user_name, $scope.user_email,$scope.password,user_viral_coeff,$scope.user_refered,checkout_points ).success(function(data) {
                $state.go('login');
                }).error(function(data) {
                                            var alertPopup = $ionicPopup.alert({
                                            title: 'registration failed!',
                                            template: 'Please check your network connection!'
                                            });
                                        });
                }else{
                        alert("passwords doesnt match.");}
       //}
        //    else{alert("Passwords doesnt match");}
    
        
    }

})


.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 