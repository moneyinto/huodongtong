'use strict';

angular.module('partyBidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var activities = JSON.parse(localStorage.getItem('activities')) || [];

        var bidList = JSON.parse(localStorage.getItem('bidList')) || [] ;
        for(var i = 0;i < activities.length;i++){
            var evens = _.filter(bidList, function(activity){ return  activity.activityName == activities[i].name; });
            console.log(evens.length);
            if(evens.length){
                activities[i].colorStatus = evens[0].colorStatus;
            }
            else{
                activities[i].colorStatus = 1;
            }

        }
        console.log(activities);
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
        console.log(activities);
    });