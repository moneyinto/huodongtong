'use strict';

angular.module('partyBidApp')
    .controller('BiddingListCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.status = 1;
        var username = localStorage.getItem('username');
        var Activities = JSON.parse(localStorage.getItem('Activities')) || {};
        var activities = Activities[username] || [];
        var activityName = JSON.parse(localStorage.getItem('activityName'));
        var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
        var bidList = BidList[username] || [];
        var evens = _.filter(bidList, function(activity){ return  activity.activityName == activityName });
        var even = _.find(bidList,function(num){ return num.colorStatus == 0});
        if(even){
            $scope.colorStatus = 0;
        }
        else{
            $scope.colorStatus = 1;
        }
        for (var i = 0;i < activities.length;i++){
            if(activities[i].status == 0){
                $scope.status = 0;
            }
        }

        $scope.back_to_activity_list = function(){
            $location.path('/activity_list');
        };
        $scope.go_to_bidding_sign_up = function(bid){
            localStorage.setItem('bidName',JSON.stringify(bid.name))
        };
        $scope.start = function(){
            var bid = evens.length + 1;
            localStorage.setItem('bidName',JSON.stringify(bid));
            var list = {'name': bid,'colorStatus':0,'activityName':activityName};
            bidList.unshift(list);
            BidList[username] = bidList;
            localStorage.setItem('BidList',JSON.stringify(BidList));
            $location.path('/bidding_sign_up');
        };

        $scope.evens = evens;


    });