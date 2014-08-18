function Bidding(name, colorStatus, activityName) {
    this.name = name;
    this.colorStatus = colorStatus;
    this.activityName = activityName;
}

Bidding.prototype.save=function(){
    var username = localStorage.getItem('username');
    var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
    var bidList = BidList[username] || [];
    bidList.unshift(this);
    BidList[username] = bidList;
    setData('BidList',BidList);
};

Bidding.bidding_in_activity = function (bidList, activityName) {
    return _.filter(bidList, function (bidList) {
        return  bidList.activityName == activityName
    });
};

Bidding.bidding_start_status = function (bidList) {
    return _.find(bidList, function (num) {
        return num.colorStatus == 0
    })
};

Bidding.bidding_create = function (bidList,activityName) {
    var bid = new Bidding(Bidding.bidding_in_activity(bidList, activityName).length + 1,0,activityName);
    setData('bidName', Bidding.bidding_in_activity(bidList, activityName).length + 1);
    bid.save(this);
};

Bidding.bidding_sign_up_end_status = function (bidList, bid_name, activityName) {
    return _.find(bidList, function (num) {
        return num.name == bid_name && num.activityName == activityName
    }).colorStatus;
};

Bidding.end_success = function (bidList) {
    var username = localStorage.getItem('username');
    var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
    bidList[0].colorStatus = 1;
    localStorage.removeItem('bidName');
    BidList[username] = bidList;
    setData('BidList',BidList);
};

Bidding.bidName_equal_activityName = function () {
    var username = localStorage.getItem('username');
    var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
    var bidList = BidList[username] || [];
    var activityName = getData('activityName');
    var bid_name = getData('bidName');
    return _.find(bidList, function (num) {
        return num.name == bid_name && num.activityName == activityName
    })
};

Bidding.get_bidPrice = function(bidList, activityName, bid_name,peopleList,bidPeople){
    _.map(Bidding.bidName_equal_activityName(bidList, activityName, bid_name).bidInformation, function (infor) {
        var bidPhone = infor.bidPhone;
        var personInformation = _.find(peopleList, function (num) {
            return num.personPhone == bidPhone;
        });
        bidPeople.push(personInformation);
    });
};

Bidding.get_bidPeople = function () {
    var username = localStorage.getItem('username');
    var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
    var bidList = BidList[username] || [];
    var activityName = getData('activityName');
    var bid_name = getData('bidName');
    var Activities = JSON.parse(localStorage.getItem('Activities')) || {};
    var activities = Activities[username] || [];
    var peopleList = Activity.activity_equal_activityName(activities).peopleList;
    var bidPeople = [];
    Bidding.get_bidPrice(bidList, activityName, bid_name,peopleList,bidPeople);
    return bidPeople;
};

Bidding.bidPrice_sort = function (bidInformation) {
    return _.sortBy(bidInformation, function (num) {
        return num.bidPrice
    })
};

Bidding.bidPhone_equal_peoplePhone = function (bidInformation, activities, activityName, people_list) {
    _.map(Bidding.bidPrice_sort(bidInformation), function (infor) {
        var list = _.find(Activity.activity_equal_activityName(activities, activityName).peopleList, function (num) {
            return num.personPhone == infor.bidPhone
        });
        people_list.push({'name': list.personName, 'phone': list.personPhone, 'price': infor.bidPrice});
    });
};

Bidding.bidPrice_count = function (bidInformation) {
    return _.countBy(Bidding.bidPrice_sort(bidInformation), function (num) {
        return num.bidPrice
    })
};

Bidding.price_count_array = function (bidInformation) {
    return _.map(Bidding.bidPrice_count(bidInformation), function (value, key) {
        return {'bidPrice': key, 'count': value}
    })
};

Bidding.bidding_success = function (bidInformation) {
    return _.find(Bidding.price_count_array(bidInformation), function (price) {
        return price.count == 1
    })
};

Bidding.bidding_success_people_message = function (people_list, bidInformation) {
    return _.find(people_list, function (num) {
        return num.price == Bidding.bidding_success(bidInformation).bidPrice
    })
};

Bidding.bidding_pop = function(success,$scope){
    if (success) {
        $('#alert').modal('show');
        $scope.bidResult1 = "竞价结果：" + success.name + "电话：" + success.phone + "竞价：￥" + success.price;
        Bidding.bidding_pop_hide($scope);
        Bidding.bidding_information($scope,success);
    }
};

Bidding.bidding_pop_hide = function($scope){
    setTimeout(function () {
        $scope.$apply(function () {
            $('#alert').modal('hide');
        });
    }, 3000);
};

Bidding.bidding_information = function($scope,success){
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.bidResult = "竞价结果：" + success.name + "电话：" + success.phone + "竞价：￥" + success.price;
        });
    }, 3000);
};

Bidding.bidding_sign_up_end = function($location,$http){
    var username = localStorage.getItem('username');
    var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
    var bidList = BidList[username] || [];
    if(confirm("确定要结束本次竞价？")){
        localStorage.removeItem('bid');
        $http.post('/end.json');
        Bidding.end_success(bidList);
        $location.path('bidding_result');
    }
};

Bidding.get_bidList = function (bidMessage,username,bid,activities){
    var bid_list = bid.bidInformation;
    var activity = _.find(activities,function(activity){ return activity.name == bid.activityName});
    var list = activity.peopleList || [];
    _.map(bid_list,function(num){
        var name = _.find(list,function(l){ return num.bidPhone == l.personPhone}).personName;
        bidMessage.push({"username":username,"activityname":bid.activityName,"bidname":bid.name,"name":name,"phone":num.bidPhone,"price": JSON.parse(num.bidPrice)})
    });
};

Bidding.get_price_count = function(priceCount,bidMessage,bid,username){
    var evens = _.filter(bidMessage,function(num){ return num.activityname == bid.activityName && num.bidname == bid.name});
    var even = _.countBy(evens, function (num) {
        return num.price
    });
    var eve = _.map(even, function (value, key) {
        return {'price': key, 'count': value}
    });
    _.map(eve,function(num){
        priceCount.push({"username":username,"activityname":bid.activityName,"bidname":bid.name,"price": num.price, "count": num.count})
    });
};