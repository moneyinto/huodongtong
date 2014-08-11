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

        $scope.activities = JSON.parse(localStorage.getItem('activities'));

        $scope.create = function () {

            var activityName = $scope.activityName;

            var activities =  JSON.parse(localStorage.getItem('activities')) || [] ;

            for (var i = 0; i < activities.length; i++) {

                if (activityName == activities[i].name) {
                    $scope.warning = '活动名称重复';
                    break;
                } else if (i + 1 == activities.length) {
                    activities.unshift({'name' : activityName,'status':1});
                    localStorage.setItem('activities', JSON.stringify(activities));
                    localStorage.setItem('activityName',activityName);
                    $location.path('/create_sign_up');
                    break;
                }
            }
            if (!activities.length) {
                activities.unshift({'name': activityName,'status':1});
                localStorage.setItem('activities', JSON.stringify(activities));
                localStorage.setItem('activityName',activityName);
                $location.path('/create_sign_up')
            }
        }
    });

