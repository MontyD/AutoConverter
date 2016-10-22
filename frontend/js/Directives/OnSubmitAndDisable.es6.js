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

						scope.resetForm = () => {
							scope.submitting = false;
							element.removeClass('submitting');
						};

            element.on('submit', () => {
                if (scope.submitting) {
                    return false;
                }
								element.addClass('submitting');
                scope.submitting = true;
                scope.onSubmit()
									// 'finally is causing an error [.finally is not a function]'
									.then(scope.resetForm)
									.catch(scope.resetForm);
            });
        }
    };
}

export default SubmitFormAndDisable;
