'use strict';

angular.module('partyBidApp')
    .controller('BiddingSignUpCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var username = localStorage.getItem('username');
//        var Activities = JSON.parse(localStorage.getItem('Activities')) || {};
//        var activities = Activities[username] || [];
        var activityName = JSON.parse(localStorage.getItem('activityName'));
        var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
        var bidList = BidList[username] || [];
        var bid_name = JSON.parse(localStorage.getItem('bidName'));
        $scope.colorStatus = _.find(bidList,function(num){ return num.name == bid_name && num.activityName == activityName}).colorStatus;
        $scope.back_to_bidding_list = function(){
            $location.path('bidding_list');
        };
        $scope.end = function(){
            var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
            var bidList = BidList[username] || [];
            if(confirm("确定要结束本次竞价？")){
                bidList[0].colorStatus = 1;
                localStorage.removeItem('bidName');
                BidList[username] = bidList;
                localStorage.setItem('BidList',JSON.stringify(BidList));
                $location.path('bidding_result');
            }
        };
        $scope.fresh = function () {
            var Activities = JSON.parse(localStorage.getItem('Activities')) || {};
            var activities = Activities[username] || [];
            var activityName = JSON.parse(localStorage.getItem('activityName'));
            var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
            var bidList = BidList[username] || [];
            var bid_name = JSON.parse(localStorage.getItem('bidName'));
            var bid_list = _.find(bidList,function(num){ return num.name == bid_name && num.activityName == activityName});
            var bidInformation = bid_list.bidInformation || [];
            $scope.bidName = bid_list.name;
            if(bidInformation){
                $scope.bidCount = bidInformation.length;
            }
            else{
                $scope.bidCount = 0;
            }
            var even = _.find(activities, function(activity){ return activity.name == activityName; });
            var peopleList = even.peopleList;
            var bidPeople = [];
            for (var i = 0;i < bidInformation.length;i++){
                var bidPhone = bidInformation[i].bidPhone;
                var personInformation = _.find(peopleList, function(num){ return num.personPhone == bidPhone });
                bidPeople.push(personInformation);
            }
            $scope.bidPeople = bidPeople;
        };
        $scope.fresh();



    });