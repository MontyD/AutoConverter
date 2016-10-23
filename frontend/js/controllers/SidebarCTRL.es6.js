'use strict';

class SidebarController {

    constructor(Notification) {
        this.Notification = Notification;

        document.body.classList.add('loaded');
    }



}

SidebarController.$inject = ['Notification'];

export default SidebarController;
