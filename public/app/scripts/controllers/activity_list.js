'use strict';

angular.module('partyBidApp')
    .controller('ActivityListCtrl', function ($scope, $location,$http) {
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

        if(Activity.go_to_create_activity(activities)){
            $location.path('/create_activity');
        }

        $scope.activities = Activity.yellow_when_bidding_start(activities,bidList);

        $scope.go_to_activity = function () {
            $location.path('/create_activity')
        };

        $scope.go_to_sign_up = function (activity) {
            var activityName = activity.name;
            setData('activityName',activityName);
        };

        $scope.Synchronization = function(){
            var username = localStorage.getItem('username');
            var Activities = JSON.parse(localStorage.getItem('Activities')) || {};
            var activities = Activities[username] || [];
            var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
            var bidList = BidList[username] || [];
            var activity = [];
            var peopleList = [];
            _.map(activities,function(num){
                activity.unshift({"username": username,"activityname": num.name});
                Activity.get_peopleList(peopleList,username,num);
            });
            console.log(peopleList);
            $http.post( '/synchronization.json', {"username":username,"activity":activity,"peopleList": peopleList})

        };
    });
