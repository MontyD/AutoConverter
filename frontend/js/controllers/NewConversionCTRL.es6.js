'use strict';

class NewConversionController {

    constructor(Notification) {

      this.Notification = Notification;

      this.configureLink = false;

      this.dropzoneCallbacks = {
        success: function(file, response) {
          this.dropzoneMethods.removeFile(file);
          this.Notification.success(response.name + ' uploaded!');
          this.configureLink = true;
        }.bind(this),
      };

    }



}

NewConversionController.$inject = ['Notification'];

export default NewConversionController;
