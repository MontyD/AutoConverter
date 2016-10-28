import template from './templates/QueuedConversion.template.html';

function ConversionForm() {
	'use strict';
	return {
		restrict: 'E',
		template: template,
		scope: {
			conversion: '=',
			owned: '@',
			delete: '&',
			edit: '&',
		},
		link: (scope, element, attrs) => {
			console.log(scope.owned);
		}
	};
}

export default ConversionForm;
