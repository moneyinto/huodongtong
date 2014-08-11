angular.module('partyBidApp')
    .controller('UserLoginCtrl', function ($scope, $location, $http) {
        $scope.login_party_bid = function () {
            var name = $scope.name;
            var password = $scope.password;
            $http.post('/login_activity.json', {"userName": name, "userPassword": password}).success(function (back) {
                if (back.data == 'true') {
                    $location.path('/activity_list');
                }
                else {
                    $location.path('/');
                }
            });
        }
    });

//        $scope.login_in = function () {
//
//            var name = $scope.input_user;
//            var pwd = $scope.input_password;
//
//            $http.post('/phone_login', {"userName": name, "userPwd": pwd})
//                .success(function (back) {
//                    console.log("test", back)
//                    if (back.data == 'true') {
//                        localStorage.current_user = $scope.input_user;
//                        $scope.list_is_null = false;
//                        $navigate.go('/');
//                    }
//                    else {
//                        $scope.list_is_null = true;
//                    }
//                });
//        }