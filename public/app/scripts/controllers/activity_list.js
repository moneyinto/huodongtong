'use strict';

angular.module('partyBidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var username = localStorage.getItem('username');

        var Activities = JSON.parse(localStorage.getItem('Activities')) || {};

        var activities = Activities[username] || [];

        var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;

        var bidList = BidList[username] || [];
        for(var i = 0;i < activities.length;i++){
            var evens = _.filter(bidList, function(activity){ return  activity.activityName == activities[i].name; });
            if(evens.length){
                activities[i].colorStatus = evens[0].colorStatus;
            }
            else{
                activities[i].colorStatus = 1;
            }

        }
        $scope.activities = activities;

        if (activities.length) {
            $location.path('/activity_list')
        }
        else {
            $location.path('/create_activity')
        }
        $scope.go_to_activity = function () {
            $location.path('/create_activity')
        };
        $scope.go_to_sign_up = function (activity) {
            var activityName = activity.name;
            localStorage.setItem('activityName' , JSON.stringify(activityName))
        };
    });