// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var hack_a_thon=angular.module('app', ['ionic','ngCordova', 'app.controllers', 'app.routes', 'app.directives','app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    

});

//unit testing karma

    //barcode scanner controller to scan
//
    hack_a_thon.controller("profile_user", function($scope, Fetch_service) {
 
    $scope.profile_details = function() {
            console.log('login user is:' + localStorage.getItem("user_name"));
            var prev_referal_users=0;
            var total_no_of_users=0;
            var no_of_users_with_referal_ID =0;
            //$scope.viral_coeff=0;
            $scope.profile_referal_id=localStorage.getItem("referal_id");
             //localStorage.removeItem("referal_id");
            $scope.profile_user_name=localStorage.getItem("user_name");
             //localStorage.removeItem("user_name");
            //$scope.profile_user_credit='50';  implementation.
            
            // finding number of people registered with your referral ID.
        
            Fetch_service.fetch_no_of_referals($scope.profile_referal_id).success(function(data) {
           
                            }).error(function(data) {
                                            alert("!!Please check your network connection!");
                                            });
            
             $scope.profile_number_of_referals= localStorage.getItem("no_of_referrals");
             prev_referal_users= localStorage.getItem("no_of_prev_referals");
             console.log('previous referred users controller:' + prev_referal_users);
     
              console.log($scope.profile_number_of_referals + 'and' + localStorage.getItem("no_of_referrals"));
              //localStorage.removeItem("no_of_referrals");
            
            //calculating viral coefficient.
            Fetch_service.Total_no_of_users().success(function(data) {
                
            }).error(function(data) {
                                           alert("!!Please check your network connection!");
                                           });
        
            total_no_of_users=localStorage.getItem("tot_no_of_users");
            //localStorage.removeItem("tot_no_of_users");
            console.log('total_no_of_users in aop.js' + total_no_of_users);
            
            
            Fetch_service.no_of_users_with_referal_id().success(function(data) {
            }).error(function(data) {
                                            alert("!!Please check your network connection!");
                                            });
            no_of_users_with_referal_ID =localStorage.getItem("no_of_joiners_on_referal");
            //localStorage.removeItem("no_of_joiners_on_referal");
            console.log(no_of_users_with_referal_ID +'/'+total_no_of_users);
            $scope.viral_coeff = ((no_of_users_with_referal_ID - prev_referal_users) / total_no_of_users);
            
            //updating previous user referal values
            Fetch_service.update_prev_referal_users(no_of_users_with_referal_ID).success(function(data) {
           
                            }).error(function(data) {
                                            alert("!!Please check your network connection!");
                                            });
            
        }
        
    
 });
    

 hack_a_thon.controller("BarCodeController", function($scope, $cordovaBarcodeScanner) {
 
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert("Scanned BarCode is:" +imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
 
})

    
hack_a_thon.controller('social_Sharing', function($scope, $cordovaSocialSharing) {

    $scope.social_sharing = function(){
    $scope.user_referal_code = localStorage.getItem("referal_id");
    window.plugins.socialsharing.share('Have you seen the Barcode app? Try it using my code and you will get $5 when you Signup:' + $scope.user_referal_code, 'Barcode Scanner', null, 'https://github.com/SaiTejaMakani/Hack-a-thon-2016-fall/blob/master/android-debug.apk')
};

});








  
