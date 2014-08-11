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
        var exist = 1;
        if (message.search(/jj/i) == 0) {
            var bid_price = message.substr(2);
            var bid_phone = json_message.messages[0].phone;
            if (bidList) {
                if (bidList[0].colorStatus == 0) {
                    var bidInformation = bidList[0].bidInformation || [];
                    for (var n = 0; n < activities.length; n++) {
                        if (activities[n].name == bidList[0].activityName) {
                            var people_list = activities[n].peopleList;
                            if (people_list) {
                                var even = _.find(people_list, function (person_phone) {
                                    return person_phone.personPhone == bid_phone
                                });
                                if (even) {
                                    if (bidInformation.length) {
                                        for (var x = 0; x < bidInformation.length; x++) {
                                            if (bid_phone == bidInformation[x].bidPhone) {
                                                console.log('你已出价，请勿重复出价！');
                                                native_accessor.send_sms(json_message.messages[0].phone, "你已出价，请勿重复出价！");
                                                exist = 0;
                                                break;
                                            }
                                        }
                                        if (exist == 1) {
                                            bidInformation.unshift({'bidPrice': bid_price, 'bidPhone': bid_phone});
                                            bidList[0].bidInformation = bidInformation;
                                            BidList[username] = bidList;
                                            localStorage.setItem('BidList', JSON.stringify(BidList));
//                                            console.log('恭喜！你已出价成功！');
                                            native_accessor.send_sms(json_message.messages[0].phone, "恭喜！你已出价成功！");
                                        }
                                    }
                                    if (!bidInformation.length) {
                                        bidInformation.unshift({'bidPrice': bid_price, 'bidPhone': bid_phone});
                                        bidList[0].bidInformation = bidInformation;
                                        BidList[username] = bidList;
                                        localStorage.setItem('BidList', JSON.stringify(BidList));
//                                        console.log('恭喜！你已出价成功！');
                                        native_accessor.send_sms(json_message.messages[0].phone, "恭喜！你已出价成功！");
                                    }
                                    var bidSignUp = document.getElementById("bidSignUp");
                                    if (bidSignUp) {
                                        var scopeOne = angular.element(bidSignUp).scope();
                                        scopeOne.$apply(function () {
                                            scopeOne.fresh();
                                        });
                                    }
                                }
                                else {
//                                    console.log('对不起，你没有报名该活动！');
                                    native_accessor.send_sms(json_message.messages[0].phone, "对不起，你没有报名该活动！");
                                    break;
                                }
                            }
                            else {
//                                console.log('对不起，你没有报名该活动！');
                                native_accessor.send_sms(json_message.messages[0].phone, "对不起，你没有报名该活动！");
                            }
                        }
                    }
                }
                else {
//                    console.log('活动尚未开始或已经结束！');
                    native_accessor.send_sms(json_message.messages[0].phone, "活动尚未开始或已经结束！");
                }
            }
            else {
//                console.log('活动竞价尚未开始！');
                native_accessor.send_sms(json_message.messages[0].phone, "活动竞价尚未开始！");
            }
        }

        if (message.search(/bm/i) == 0) {
            var person_name = message.substr(2);
            var person_phone = json_message.messages[0].phone;
            if (JSON.parse(localStorage.getItem('startActivity'))) {
                var startActivity = JSON.parse(localStorage.getItem('startActivity'));
                for (var i = 0; i < activities.length; i++) {
                    if (activities[i].name == startActivity.startActivity) {
                        if (activities[i].status == 0) {
                            var peopleList = activities[i].peopleList || [];
                            for (var j = 0; j < peopleList.length; j++) {
                                if (peopleList[j].personPhone == person_phone) {
                                    native_accessor.send_sms(json_message.messages[0].phone, "您已报名成功，请勿重复报名");
                                    exist = 0;
                                    break;
                                }
                            }
                            if (exist == 1) {
                                peopleList.unshift({'personName': person_name, 'personPhone': person_phone});
                                activities[i].peopleList = peopleList;
                                Activities[username] = activities;
                                localStorage.setItem('Activities', JSON.stringify(Activities));
                                native_accessor.send_sms(json_message.messages[0].phone, "恭喜报名成功！");
//                                console.log("恭喜报名成功！");
                            }


                            var signUp = document.getElementById("signUp");
                            if (signUp) {
                                var scope = angular.element(signUp).scope();
                                scope.$apply(function () {
                                    scope.refresh();
                                });
                            }

                            if (!peopleList.length) {
                                peopleList.unshift({'personName': person_name, 'personPhone': person_phone});
                                activities[i].peopleList = peopleList;
                                Activities[username] = activities;
                                localStorage.setItem('Activities', JSON.stringify(Activities));
                            }
                        }
                        else {
                            native_accessor.send_sms(json_message.messages[0].phone, "活动尚未开始或已经结束！");
                            console.log("活动尚未开始或已经结束！");
                        }
                    }

                }
            }
            else {
                native_accessor.send_sms(json_message.messages[0].phone, "活动尚未开始或已经结束！");
                console.log('活动尚未开始或已经结束！');
            }

//        location.reload([bForceGet]);
        }
    }
}

function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}
