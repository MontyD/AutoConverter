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

			scope.sendToConfig = () => {
				scope.conversion.status = 'Uploaded';
				scope.edit();
			};

		}
	};
}

export default ConversionForm;
