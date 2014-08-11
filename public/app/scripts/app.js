'use strict';

angular
    .module('partyBidApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/create_activity',{
                templateUrl:'views/create_activity.html',
                controller:'CreateActivityCtrl'
            })
            .when('/activity_list',{
                templateUrl:'views/activity_list.html',
                controller:'ActivityListCtrl'
            })
            .when('/',{
                templateUrl:'views/user_login.html',
                controller:'UserLoginCtrl'
            })
            .when('/create_sign_up',{
                templateUrl:'views/create_sign_up.html',
                controller:'CreateSignUpCtrl'
            })
            .when('/bidding_list',{
                templateUrl:'views/bidding_list.html',
                controller:'BiddingListCtrl'
            })
            .when('/bidding_sign_up',{
                templateUrl:'views/bidding_sign_up.html',
                controller:'BiddingSignUpCtrl'
            })
            .when('/bidding_result',{
                templateUrl:'views/bidding_result.html',
                controller:'BiddingResultCtrl'
            })
            .when('/bidding_count',{
                templateUrl:'views/bidding_count.html',
                controller:'BiddingCountCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
var server = 'http://192.168.1.107';