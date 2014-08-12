'use strict';

angular.module('partyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var username = localStorage.getItem('username');

        var Activities = JSON.parse(localStorage.getItem('Activities')) || {};

        var activities = Activities[username] || [];

        $scope.back_to_list = function () {
            $location.path('/activity_list')
        };
        $scope.activities = activities;

        $scope.create = function () {
            var activity_name = $scope.activityName;
            Activity.activity_repeat(activity_name,$scope);
            Activity.create_activity(activity_name,$location);
        }
    });

