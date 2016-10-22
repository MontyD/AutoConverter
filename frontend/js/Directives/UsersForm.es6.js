import template from './templates/UsersForm.template.html';

function UserForm() {
    'use strict';
    return {
        restrict: 'E',
        template: template,
        scope: {
            validationError: '&',
            submitUser: '&',
            onSuccess: '&'
        },
        // template
        link: (scope, element, attrs) => {

            scope.validateAndSubmit = () => {
                return new Promise((resolve, reject) => {
                    if (scope.user.password !== scope.user.confirm) {
                        scope.validationError({
                            err: 'Passwords do not match'
                        });
                        return resolve();
                    }
                    return scope.submitUser({user: scope.user})
                      .then(response => {
                          scope.onSuccess();
                          return resolve();
                      })
                      .catch(err => {
                        scope.validationError({err: err.data});
                        console.error(err);
                        return reject();
                      });
                });
            };

        }
    };
}

export default UserForm;
