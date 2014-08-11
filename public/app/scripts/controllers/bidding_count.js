'use strict';

angular.module('partyBidApp')
    .controller('BiddingCountCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.back_to_bidding_list = function () {
            localStorage.removeItem('priceCount');
            localStorage.removeItem('sucess');
            $location.path('bidding_list');
        };


        var username = localStorage.getItem('username');
        var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
        var bidList = BidList[username] || [];
        var bidInformation = bidList[0].bidInformation;

        var priceCount = JSON.parse(localStorage.getItem('priceCount'));
        var sucess = JSON.parse(localStorage.getItem('sucess'));

            $scope.priceCount = priceCount;
            $scope.bidResult = "竞价结果：";
            $scope.phone = "电话：";
            $scope.price = "竞价：￥";
            $scope.sucessName = sucess.name;
            $scope.sucessPhone = sucess.phone;
            $scope.sucessPrice = sucess.price;


        $scope.bidName = bidList[0].name;
        if (bidInformation) {
            $scope.bidCount = bidInformation.length;
            $scope.a = "#/bidding_count";
        }
        else {
            $scope.a = "";
            $scope.bidCount = 0;
        }

    });