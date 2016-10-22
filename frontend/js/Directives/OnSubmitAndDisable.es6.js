function SubmitFormAndDisable() {
	'use strict';
	return {
		restrict: 'A',
		scope: {
      SubmitFormAndDisable: '&'
		},
		// template
		link: (scope, element, attrs) => {
      scope.submitting = false;
			element.on('submit', () => {
				 if (scope.submitting) {
           return false;
         }
         scope.submitting = true;
				 if (typeof scope.SubmitFormAndDisable === 'function') {
					 scope.SubmitFormAndDisable().finally(() => scope.submitting = false);
				 }
			});
		}
	};
}

export default SubmitFormAndDisable;
