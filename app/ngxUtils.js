/**
 * @ngdoc overview
 * @name ngxUtils
 **/
var module = angular.module('ngxUtils', []);

/**
 * @ngdoc directive
 * @function
 * 
 * @description
 * Directive for confirmable clicks.
 * 
 * Usage:
 * <button ngx-confirm-click="doSomething()" ngx-cancel-click="doSomethingElse()" ngx-confirm-message="Are you sure?">Click me</button>
 * 
 * ngx-confirm-click
 *      function called when user confirms
 * ngx-cancel-click
 *      function called when user cancels
 * ngx-confirm-message
 *      confirm message to display
 *
 **/
module.directive('ngxConfirmClick', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngxConfirmMessage;
                if (message) {
                    if (confirm(message)) {
                        scope.$apply(attrs.ngxConfirmClick);
                    } else {
                        scope.$apply(attrs.ngxCancelClick);
                    }
                }
            });
        }
    }
});

/**
 * Directive to diplay current date/time using angulars date filter.
 * 
 * Usage:
 * <span ngx-current-time="'dd.MM.yyyy hh:mm:ss'"></span>
 * or
 * <span ngx-current-time="timeformat" ngx-interval="5000"></span>
 * 
 * ngx-current-time
 *      format string, see https://docs.angularjs.org/api/ng/filter/date
 * ngx-interval
 *      update interval in ms, default is 1000 (every second)
 * 
 **/
module.directive('ngxCurrentTime', ['$interval', 'dateFilter',
    function($interval, dateFilter) {

        return {
            restrict: 'A',
            link: function link(scope, element, attrs) {
                var format, timeoutId;

                // update DOM element
                function updateTime() {
                    element.text(dateFilter(new Date(), format));
                }

                // watch format
                scope.$watch(attrs.ngxCurrentTime, function(value) {
                    format = value;
                    updateTime();
                });

                // cleanup when DOM element has been destroyed
                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function() {
                    updateTime();
                }, attrs.ngxInterval || 1000);
            }
        };
    }
]);