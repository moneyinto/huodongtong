angular.module('partyBidApp')
    .controller('UserLoginCtrl', function ($scope, $location, $http) {
        $scope.login_party_bid = function () {
            var name = $scope.name;
            var password = $scope.password;
            $http.post( '/login_activity.json', {"userName": name, "userPassword": password}).success(function (back) {
                if (back.data == 'true') {
                    $location.path('/activity_list');
                    localStorage.setItem('username',name);
                }
                else {
                    $scope.flash = "alert alert-danger";
                    $scope.error = "帐号或密码不正确，请重新输入";
                    $location.path('/');
                }
            });
        }
    });
