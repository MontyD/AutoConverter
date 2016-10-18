'use strict';

const fs = require('fs');


const converter = {};


converter.testOpenable = function() {
  // Todo - implement check that converter can be opened.
    return new Promise(function(resolve, reject) {
      setTimeout(function(){
        resolve();
      }, 2000);
      
    });

};


module.exports = converter;
