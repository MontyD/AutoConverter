function SubmitFormAndDisable() {
    'use strict';
    return {
        restrict: 'A',
        scope: {
            onSubmit: '&'
        },
        // template
        link: (scope, element, attrs) => {
            scope.submitting = false;
            element.on('submit', () => {
                if (scope.submitting) {
                    return false;
                }
                scope.submitting = true;
                scope.onSubmit()
									// 'finally is causing an error [.finally is not a function]'
									.then(() => scope.submitting = false)
									.catch(() => scope.submitting = false);
            });
        }
    };
}

export default SubmitFormAndDisable;
