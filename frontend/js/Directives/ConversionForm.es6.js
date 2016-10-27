import template from './templates/ConversionForm.template.html';

function ConversionForm() {
	'use strict';
	return {
		restrict: 'E',
		template: template,
		scope: {
			conversion: '=',
			converters: '='
		},
		link: (scope, element, attrs) => {
			scope.conversion.config = {
				backgroundField: 'White',
				activeField: 'Yellow',
				animatedPages: '',
        customAniPages: '',
        cssPath: 'Setup/Form Styles/Custom/Custom.css'
			};
		}
	};
}

export default ConversionForm;
