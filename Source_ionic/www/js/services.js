angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('RegisterService', function($q, $http) {
  return {
    RegisterUser: function(user_name,email,password,user_viral_coeff,refered_user,checkout_points) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/tutorial8/collections/Barcode_Scanner_MVP?apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
        data: JSON.stringify({
          user_name: user_name,
          user_email:email,
          password:password,
          user_viral_coeff:user_viral_coeff,
          referred_user:refered_user,
          checkout_points:checkout_points,
        }),
        contentType:"application/json"

      }).success(function(data){

        deferred.resolve('Welcome!');
      })
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;

    }
  }
})

.service('LoginService', function($q, $http) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
          
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/tutorial8/collections/Barcode_Scanner_MVP?q={user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            
          if (name == data[0].user_name && pw == data[0].password) {
            
            localStorage.setItem("referal_id", data[0]._id.$oid);
            localStorage.setItem("user_name", data[0].user_name); 
            deferred.resolve('Welcome ' + data[0].user_name + '!');
          } else {
              alert('wrong credentials!!');
            deferred.reject('Wrong credentials.');
          }

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }

    }})


.service('Fetch_service', function($q, $http) {
    return {
        //fetching number of users with your referal ID.
      fetch_no_of_referals: function(referral_id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
          
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/tutorial8/collections/Barcode_Scanner_MVP?q={ referred_user: \''+referral_id+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            console.log('no of users installed with reference' +data.length); 
             localStorage.setItem("no_of_referrals", data.length);
        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      },
        
      //fetching number of users in db
        Total_no_of_users: function() {
        var deferred = $q.defer();
        var promise = deferred.promise;
          
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/tutorial8/collections/Barcode_Scanner_MVP?q={}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            
             localStorage.setItem("tot_no_of_users", data.length);
            
        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      },
        
      //fetching number of users registered with referal code.
        no_of_users_with_referal_id: function() {
        var deferred = $q.defer();
        var promise = deferred.promise;
          
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/tutorial8/collections/Barcode_Scanner_MVP?q={ referred_user: { $exists: true }}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            console.log("no_of_joiners_on_referal" +data.length); 
             localStorage.setItem("no_of_joiners_on_referal", data.length);
        })
        
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/tutorial8/collections/Barcode_scan_prev_referal_users?q={}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            console.log("no_of_prev_referals" +data[0].prev_referal_users + data); 
             localStorage.setItem("no_of_prev_referals", data[0].prev_referal_users);
            console.log('local valuse:' + localStorage.getItem("no_of_prev_referals"));
        })
        
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      } ,
        //update_prev_referal_users
      
        update_prev_referal_users: function(prev_referal_value) {
        var deferred = $q.defer();
        var promise = deferred.promise;
          
        $http({
          method: 'PUT',
          url: 'https://api.mongolab.com/api/1/databases/tutorial8/collections/Barcode_scan_prev_referal_users?q={}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
            data: JSON.stringify( { "$set" : { "prev_referal_users": prev_referal_value } } ),
          contentType:"application/json"

        }).success(function(data){
            console.log("updated prev user referal value::" +prev_referal_value ); 
        })
        /**
        $http({
          method: 'PUT' ,
          url: 'https://mlab.com/databases/firstdb/collections/ASEProject/'+data.id+'?apiKey=cv-INXkZDmTZy3pCX4NFTNhe3wjSfL_h',
          data: JSON.stringify( { "$set" : { "firstname": data.firstname,
            "lastname": data.lastname,
            "username": data.username,
            "password": data.password } } ),

          contentType: "application/json"
        }).success(function (data) {
        })
        */
        
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      } 
    }})
;