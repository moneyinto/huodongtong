'use strict';

angular.module('partyBidApp')
    .controller('BiddingListCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.status = 1;

        var activityName = getData('activityName');
        var username = localStorage.getItem('username');

        var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;

        var bidList = BidList[username] || [];

        $scope.colorStatus = Bidding.bidding_start_status(bidList) ? 0 : 1;

        if (activity_start_status()) {
            $scope.status = 0;
        }

        $scope.back_to_activity_list = function () {
            $location.path('/activity_list');
        };

        $scope.go_to_bidding_sign_up = function (bid) {
            setData('bidName', bid.name);
        };

        $scope.start = function () {
            Bidding.bidding_create(bidList,activityName);
            $location.path('/bidding_sign_up');
        };

        $scope.evens = Bidding.bidding_in_activity(bidList,activityName);


    });