import template from './templates/ConfigForm.template.html';

function ConfigForm() {
  'use strict';
  return {
    restrict: 'E',
    template: template,
    scope: {
      validationError: '&',
      submitConfig: '&',
      onSuccess: '&'
    },
    link: (scope, element, attrs) => {
      scope.validateAndSubmit = () => {
        return new Promise((resolve, reject) => {
          scope.submitConfig({config: scope.config})
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

export default ConfigForm;
