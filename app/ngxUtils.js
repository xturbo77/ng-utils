var module = angular.module('ngxUtils', []);

/**
 * Directive for comfirmable clicks.
 * Usage:
 * <button ngx-confirm-click="doSomething()" ngx-cancel-click="doSomethingElse()" ngx-confirm-message="Are you sure?">Click me</button>
 * 
 **/
module.directive('ngxConfirmClick', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngxConfirmMessage;
                if(message) {
                    if(confirm(message)) {
                        scope.$apply(attrs.ngxConfirmClick);
                    } else {
                        scope.$apply(attrs.ngxCancelClick);
                    }
                }
            })
        }
    }
})