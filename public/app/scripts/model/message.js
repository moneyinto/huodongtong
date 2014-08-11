


bid_sign_up_refresh = function(){
    var bidSignUp = document.getElementById("bidSignUp");
    if (bidSignUp) {
        var scopeOne = angular.element(bidSignUp).scope();
        scopeOne.$apply(function () {
            scopeOne.fresh();
        });
    }
};

activity_sign_up_refresh = function(){
    var signUp = document.getElementById("signUp");
    if (signUp) {
        var scope = angular.element(signUp).scope();
        scope.$apply(function () {
            scope.refresh();
        });
    }
};

activity_start_status = function(activities){
    return _.find(activities, function (activity) {
        return activity.status == 0
    });
};

activity_phone_repeat = function(peopleList,person_phone){

    return _.find(peopleList, function (list) {
        return list.personPhone == person_phone
    })
};

activity_sign_up_success = function(peopleList,activities,person_name,person_phone,json_message){
    var username = localStorage.getItem('username');
    var Activities = JSON.parse(localStorage.getItem('Activities')) || {};
    if (!activity_phone_repeat(peopleList, person_phone)) {
        peopleList.unshift({'personName': person_name, 'personPhone': person_phone});
        activity_start_status(activities).peopleList = peopleList;
        Activities[username] = activities;
        setData('Activities', Activities);
        native_accessor.send_sms(json_message.messages[0].phone, "恭喜报名成功！");
    }
};

activity_sign_up_repeat = function(peopleList, person_phone,json_message){
    if (activity_phone_repeat(peopleList, person_phone)) {
        native_accessor.send_sms(json_message.messages[0].phone, "您已报名成功，请勿重复报名");
    }
};

activity_sign_up_fail = function(activities,json_message){
    if (!activity_start_status(activities)) {
        native_accessor.send_sms(json_message.messages[0].phone, "活动尚未开始或已经结束！");
    }
};

bid_phone_equal_people_phone = function(activities,bidList,bid_phone){
    return _.find(bid_name_equal_activity_name(activities,bidList).peopleList, function (person_phone) {
        return person_phone.personPhone == bid_phone
    })
};

bid_name_equal_activity_name = function(activities,bidList){
    return _.find(activities,function(activity){return activity.name == bidList[0].activityName})
};

bid_phone_repeat = function(bidInformation,bid_phone){
    return _.find(bidInformation,function(infor){ return infor.bidPhone == bid_phone})
};

bid_success = function(bidInformation,bid_price,bid_phone,bidList){
    var username = localStorage.getItem('username');
    var BidList = JSON.parse(localStorage.getItem('BidList')) || {} ;
    bidInformation.unshift({'bidPrice': bid_price, 'bidPhone': bid_phone});
    bidList[0].bidInformation = bidInformation;
    BidList[username] = bidList;
    setData('BidList',BidList);
};