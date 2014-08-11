'use strict';

angular.module('partyBidApp')
    .controller('BiddingSignUpCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var username = localStorage.getItem('username');

        var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;

        var bidList = BidList[username] || [];
        var activityName = getData('activityName');
        var bid_name = getData('bidName');

        $scope.colorStatus = Bidding.bidding_sign_up_end_status(bidList,bid_name,activityName);

        $scope.back_to_bidding_list = function(){
            $location.path('bidding_list');
        };

        $scope.end = function(){
            Bidding.bidding_sign_up_end($location);
        };

        $scope.fresh = function () {
            $scope.bidName = Bidding.bidName_equal_activityName().name;
            var bidInformation = Bidding.bidName_equal_activityName().bidInformation || [];
            $scope.bidCount = bidInformation.length;
            $scope.bidPeople = Bidding.get_bidPeople();
        };

        $scope.fresh();
    });