import template from './templates/ConversionForm.template.html';

function ConversionForm() {
	'use strict';
	return {
		restrict: 'E',
		template: template,
		scope: {
			conversion: '=',
			converters: '=',
			removeConversion: '&',
			convertForm: '&',
		},
		link: (scope, element, attrs) => {
			scope.conversion.config = {
				backgroundField: 'White',
				activeField: 'Yellow',
				animatedPages: '',
        customAniPages: '',
        cssPath: 'Setup/Form Styles/Custom/Custom.css'
			};
			// have to watch as converters may load after link is evaluated.
			scope.$watch('converters', () => {
					for (let i = 0; i < scope.converters.length; i++) {
						if (scope.converters[i].primary) {
							scope.conversion.config.converter = scope.converters[i].path;
							break;
						}
					}
			});
		}
	};
}

export default ConversionForm;
