const models = require('../models');

function CheckSetup() {

    'use strict';

    let modelsToTest = ['config', 'converters', 'users'],
        completed = 0,
        incompleteModels = [];

    console.log('checking setup...');

    return new Promise(
        (resolve, reject) => {

            function done() {
                if (completed === modelsToTest.length - 1) {
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
                models[tableToCount].count().then(count => {
                    if (!count) {
                      incompleteModels.push(tableToCount);
                    }
                    done();
                }).catch(err => {
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
