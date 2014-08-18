//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})
var native_accessor = {
    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
        console.log(phone, message);
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },

    process_received_message: function (json_message) {
        var username = localStorage.getItem('username');

        var Activities = JSON.parse(localStorage.getItem('Activities')) || {};

        var activities = Activities[username] || [];

        var BidList = JSON.parse(localStorage.getItem('BidList')) || {};

        var bidList = BidList[username] || [];
        var message = json_message.messages[0].message.replace(/\s/g, "");
        if (message.search(/jj/i) == 0) {
            var bid_price = message.substr(2);
            var bid_phone = json_message.messages[0].phone;
            var bidInformation = bidList[0].bidInformation || [];
            if (bidList[0].colorStatus == 0 && bid_phone_repeat(bidInformation, bid_phone)) {
                native_accessor.send_sms(json_message.messages[0].phone, "你已出价，请勿重复出价！");
            }
            if (bidList[0].colorStatus == 0 && !bid_phone_repeat(bidInformation, bid_phone) && bid_phone_equal_people_phone(activities, bidList, bid_phone)) {
                bid_success(bidInformation, bid_price, bid_phone, bidList);
                native_accessor.send_sms(json_message.messages[0].phone, "恭喜！你已出价成功！");
                var bidSignUp = document.getElementById("bidSignUp");
                if (bidSignUp) {
                    var scope = angular.element(bidSignUp).scope();
                    scope.$apply(function () {
                        scope.transmission();
                    });
                }
            }
            bid_sign_up_refresh();
            if (bidList[0].colorStatus == 0 && !bid_phone_equal_people_phone(activities, bidList, bid_phone)) {
                native_accessor.send_sms(json_message.messages[0].phone, "对不起，你没有报名该活动！");
            }

            if (bidList[0].colorStatus == 1) {
                native_accessor.send_sms(json_message.messages[0].phone, "活动尚未开始或已经结束！");
            }
        }

        if (message.search(/bm/i) == 0) {
            var person_name = message.substr(2);
            var person_phone = json_message.messages[0].phone;
            if (activity_start_status(activities)) {
                var peopleList = activity_start_status(activities).peopleList || [];
                activity_sign_up_repeat(peopleList, person_phone, json_message);
                activity_sign_up_success(peopleList, activities, person_name, person_phone, json_message);
                activity_sign_up_refresh();
            }
            activity_sign_up_fail(activities, json_message);
        }
    }
};

function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}
