import template from './templates/ConvertersForm.template.html';

function ConvertersForm() {
  'use strict';
  return {
    restrict: 'E',
    template: template,
    scope: {
      validationError: '&',
      submitConverter: '&',
      onSuccess: '&'
    },
    link: (scope, element, attrs) => {
      scope.validateAndSubmit = () => {
        return new Promise((resolve, reject) => {
          scope.submitConverter({converter: scope.converter})
            .then(response => {
              scope.onSuccess();
              return resolve();
            })
            .catch(err => {
              scope.validationError({err: err.data});
              console.log(err);
              return reject();
            });
        });

      };


    }
  };
}

export default ConvertersForm;
