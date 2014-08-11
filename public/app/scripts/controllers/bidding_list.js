'use strict';

angular.module('partyBidApp')
    .controller('BiddingListCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.status = 1;
        var activities = JSON.parse(localStorage.getItem('activities'));
        var activityName = JSON.parse(localStorage.getItem('activityName'));
        var bidList = JSON.parse(localStorage.getItem('bidList')) || [] ;
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
//        if(evens.length){
//            $scope.colorStatus = evens[0].colorStatus;
//        }
//        else{
//            $scope.colorStatus = 1;
//        }

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
            localStorage.setItem('bidList',JSON.stringify(bidList));
            $location.path('/bidding_sign_up');
        };

        $scope.evens = evens;


    });