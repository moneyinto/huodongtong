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

        var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;

        var bidList = BidList[username] || [];

        $scope.colorStatus = bidList.length ? bidList[0].colorStatus : 1;

        $scope.status = Activity.activity_equal_activityName(activities).status;

        $scope.check = activity_start_status() ? 1 : 0;

        $scope.start = function () {
            var username = localStorage.getItem('username');

            var Activities = JSON.parse(localStorage.getItem('Activities')) || {};

            var activities = Activities[username] || [];
            $scope.status = Activity.activity_equal_activityName(activities).status = 0;
            Activities[username] = activities;
            setData('Activities', Activities);
        };

        $scope.refresh = function () {
            var Activities = JSON.parse(localStorage.getItem('Activities')) || {};
            var activities = Activities[username] || [];
            var peopleList = Activity.activity_equal_activityName(activities).peopleList || [];
            $scope.peopleList = peopleList;
            $scope.peopleCount = peopleList.length;
        };

        $scope.refresh();

        Activities[username] = activities;
        setData('Activities', Activities);

        $scope.end = function () {
            Activity.activity_sign_up_end($scope,$location);
        };
    });
