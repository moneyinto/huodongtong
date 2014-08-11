'use strict';

angular.module('partyBidApp')
    .controller('CreateSignUpCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.back_to_list = function () {
            $location.path('/create_list')
        };
        var activities = JSON.parse(localStorage.getItem('activities')) || [];
        var activityName = JSON.parse(localStorage.getItem('activityName'));
        var bidList = JSON.parse(localStorage.getItem('bidList')) || [];
        if(bidList.length){
            $scope.colorStatus = bidList[0].colorStatus;
        }
        else{
            $scope.colorStatus = 1;
        }

        if (!activityName) {
            $scope.status = 1;
        }
        else {
            for (var i = 0; i < activities.length; i++) {
                if (activities[i].name == activityName) {
                    $scope.status = activities[i].status;
                    break;
                }
            }
        }

        for (var j = 0; j < activities.length;j++) {
            if (activities[j].status == 0) {
                $scope.check = 1;
                break;
            }
            else {
                $scope.check = 0;
            }
        }
        $scope.start = function () {
            for (var i = 0; i < activities.length; i++) {
                if (activities[i].name == activityName) {
                    $scope.status = activities[i].status = 0;
                    var startActivity = {'startActivity': activityName};
                    localStorage.setItem('startActivity', JSON.stringify(startActivity));
                    localStorage.setItem('activities', JSON.stringify(activities));
                    break;
                }
            }
        };


//        $scope.bidding = function () {
//            $scope.start = 0;
//            $location.path('/bidding_list');
//        };

        $scope.refresh = function () {
//            console.log('1111');
            var activities = JSON.parse(localStorage.getItem('activities'));
            var activityName = JSON.parse(localStorage.getItem('activityName'));
            for (var i = 0; i < activities.length; i++) {
                if (activities[i].name == activityName) {
                    var peopleList = activities[i].peopleList || [];
                    $scope.peopleList = activities[i].peopleList;
                    if (peopleList.length) {
                        $scope.peopleCount = peopleList.length;
                    }
                    else {
                        $scope.peopleCount = 0;
                    }
                    break;
                }
            }
        };
        $scope.refresh();
        localStorage.setItem('activities', JSON.stringify(activities));
        $scope.end = function () {
            var activities = JSON.parse(localStorage.getItem('activities'));
            if (confirm("确认要结束本次报名吗？")) {
                $scope.check = 0;
                for (var i = 0; i < activities.length; i++) {
                    if (activities[i].name == activityName) {
                        console.log(activities[i]);
                        $scope.status = activities[i].status = 1;
                        localStorage.removeItem('startActivity');
                        console.log(activities[i]);
                        localStorage.setItem('activities', JSON.stringify(activities));
                        $location.path('/bidding_list');
                        break;
                    }
                }
            }

        };
    });