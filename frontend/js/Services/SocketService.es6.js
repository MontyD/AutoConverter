'use strict';

class SocketService {

    constructor($window) {
        this.socket = $window.io.connect($window.location.origin);
        this.subscriptions = [];
        this.userId = null;
    }

    init(userId) {
        this.userId = userId;
        return true;
    }

    on(eventName, callback) {
        let alreadySubscribed = this.subscriptions.indexOf(eventName) > -1;
        if (!alreadySubscribed) {
            this.subscriptions.push(eventName);
        } else {
            this.socket.off(eventName);
        }
        this.socket.on(eventName, (function(data) {
            if (data.userId !== this.userId) {
                return;
            }
            return callback(data);
        }).bind(this));
    }

    emit(eventName, data, callback) {
        this.socket.emit(eventName, data, function() {
            var args = arguments;
            if (callback) {
                callback.apply(this.socket, args);
            }
        });
    }
}

SocketService.$inject = ['$window'];

module.exports = SocketService;
