import template from './templates/UsersForm.template.html';

function UserForm() {
  'use strict';
  return {
    restrict: 'E',
    template: template,
    scope: {

    },
    // template
    link: (scope, element, attrs) => {

    }
  };
}

export default UserForm;
