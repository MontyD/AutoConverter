const models = require('../models');

function CheckSetup() {

    'use strict';

    let modelsToTest = ['config', 'converters', 'users'],
        completed = 0,
        incompleteModels = [];

    console.log('checking setup...');

    return new Promise(
        function(resolve, reject) {

            function done() {
                if (completed === modelsToTest.length) {
                    if (incompleteModels.length) {
                      reject({
                          models: incompleteModels
                      });
                    } else {
                      resolve();
                    }
                }
                completed++;
            }

            function countTable(tableToCount) {
                if (!tableToCount) {
                    return;
                }
                models[tableToCount].count().then(function(count) {
                    if (!count) {
                      incompleteModels.push(tableToCount);
                    }
                    done();
                }).catch(function(err) {
                    reject({
                        error: err
                    });
                });
            }

            for (let i = 0; i < modelsToTest.length; i++) {
                countTable(modelsToTest[i]);
            }
        }
    );


}

module.exports = CheckSetup;
