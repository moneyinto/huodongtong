'use strict';

angular.module('partyBidApp')
    .controller('CreateSignUpCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.back_to_list = function () {
            $location.path('/activity_list')
        };

        var username = localStorage.getItem('username');

        var Activities = JSON.parse(localStorage.getItem('Activities')) || {};

        var activities = Activities[username] || [];

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
                    Activities[username] = activities;
                    localStorage.setItem('Activities', JSON.stringify(Activities));
                    break;
                }
            }
        };

        $scope.refresh = function () {
            var username = localStorage.getItem('username');

            var Activities = JSON.parse(localStorage.getItem('Activities')) || {};

            var activities = Activities[username] || [];

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
        Activities[username] = activities;
        localStorage.setItem('Activities', JSON.stringify(Activities));

        $scope.end = function () {
            var username = localStorage.getItem('username');

            var Activities = JSON.parse(localStorage.getItem('Activities')) || {};

            var activities = Activities[username] || [];

            if (confirm("确认要结束本次报名吗？")) {
                $scope.check = 0;
                for (var i = 0; i < activities.length; i++) {
                    if (activities[i].name == activityName) {
                        $scope.status = activities[i].status = 1;
                        localStorage.removeItem('startActivity');
                        Activities[username] = activities;
                        localStorage.setItem('Activities', JSON.stringify(Activities));
                        $location.path('/bidding_list');
                        break;
                    }
                }
            }

        };
    });