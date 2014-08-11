'use strict';

angular.module('partyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.back_to_list = function () {
            $location.path('/activity_list')
        };

        var username = localStorage.getItem('username');

        var Activities =  JSON.parse(localStorage.getItem('Activities')) || {} ;

        $scope.activities = Activities[username] || [];

        $scope.create = function () {

            var activityName = $scope.activityName;

            var Activities =  JSON.parse(localStorage.getItem('Activities')) || {} ;
            var activities = Activities[username] || [];

            for (var i = 0; i < activities.length; i++) {

                if (activityName == activities[i].name) {
                    $scope.warning = '活动名称重复';
                    break;
                } else if (i + 1 == activities.length) {
                    activities.unshift({'name' : activityName,'status':1});
                    Activities[username] = activities;
                    localStorage.setItem('Activities', JSON.stringify(Activities));
                    localStorage.setItem('activityName',activityName);
                    $location.path('/create_sign_up');
                    break;
                }
            }
            if (!activities.length) {
                activities.unshift({'name': activityName,'status':1});
                Activities[username] = activities;
                localStorage.setItem('Activities', JSON.stringify(Activities));
                localStorage.setItem('activityName',activityName);
                $location.path('/create_sign_up')
            }
        }
    });

