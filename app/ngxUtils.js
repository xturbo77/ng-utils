/**
 * @ngdoc overview
 * @name ngxUtils
 **/
var module = angular.module('ngxUtils', []);

/**
 * @ngdoc directive
 * @name ngxUtils.directive:ngxConfirmClick
 * @restrict A
 * @element button
 * 
 * @param {expression} ngxConfirmClick expression to evaluate upon click
 * @param {expression} ngxCancelClick expression to evaluate upon cancel
 * @param {string} ngxConfirmMessage expression confirmation message
 * 
 * @description
 * Directive for confirmable clicks.
 * 
 * @example
   <example module="MainApp">
     <file name="index.html">
        <button ng-controller="MainCtrl" ngx-confirm-click="doSomething()" ngx-cancel-click="doOnCancel()" ngx-confirm-message="Are you sure?">Click me</button>
     </file>
     <file name="javascript.js">
        var mainapp = angular.module('MainApp', ['ngxUtils']);
        mainapp.controller('MainCtrl', function($scope) {
            $scope.doSomething = function() {
                alert('you confirmed!');
            }
            $scope.doOnCancel = function() {
                alert('cancel-click called');
            }
        });
     </file>
   </example>
 */
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
 * @ngdoc directive
 * @name ngxUtils.directive:ngxCurrentTime
 * @restrict A
 * @element span
 * @param {expression} ngxCurrentTime expression for the date/time format
 * @param {expression} ngxInterval expression for refresh interval in ms (default: 1000)
 * 
 * @requires $interval
 * @requires dateFilter
 * 
 * @description
 * Directive for confirmable clicks.
 * 
 * @example
   <example module="MainApp">
     <file name="index.html">
        <div ng-controller="MainCtrl">
            DateTime Format: <input type="text" ng-model="format"/> <a href="https://docs.angularjs.org/api/ng/filter/date" target="_blank">see angularJS date filter</a><br/>
            <span ngx-current-time="format" ngx-interval="1000"></span>
        </div>
     </file>
     <file name="javascript.js">
        var mainapp = angular.module('MainApp', ['ngxUtils']);
        mainapp.controller('MainCtrl', function($scope) {
            $scope.format = 'dd.MM.yyyy HH:mm:ss';
        });
     </file>
   </example>
 */
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