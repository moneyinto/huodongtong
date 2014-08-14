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
            var bid_list = [];
            var bidMessage = [];
            var priceCount = [];
            _.map(activities,function(num){
                activity.unshift({"username": username,"activityname": num.name});
                Activity.get_peopleList(peopleList,username,num);
            });
            _.map(bidList,function(bid){
                bid_list.unshift({"username": username,"activityname": bid.activityName,"bidname": bid.name,"status": bid.colorStatus});
                Bidding.get_bidList(bidMessage,username,bid,activities);
                Bidding.get_price_count(priceCount,bidMessage,bid,username);
            });
            bidMessage = _.sortBy(bidMessage, function (num) {
                return num.price
            });
            $http.post('http://192.168.1.116/synchronization.json', {"username":username,"activity":activity,"peopleList": peopleList,"bidList": bid_list,"bidMessage":bidMessage,"priceCount":priceCount}).success(function (back) {
                if (back.data == 'true') {
                    alert("同步成功!");
                }
            });
        };
    });
