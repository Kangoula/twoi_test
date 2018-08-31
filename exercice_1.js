// * * * * * * * * * * * * * * * * *
// Two-I: node.js test
// @author: Julien Pirson
// * * * * * * * * * * * * * * * * *

// You will need Linux and Node.js package


// * * * * * * * * * * * * * * * * *
// exercice 1
// * * * * * * * * * * * * * * * * *
//
// Goal:
// Make this function below with a promise
//const functionPromised = (i, time, cb) => {
//  i = i || 0
//  setTimeout(() => {
//    if (++i === 5) {
//      cb(i)
//    } else {
//      functionPromised(i)
//    }
//  }, time)
//}

/**
 * After a certain time,
 * increments an integer until it reaches 5, than stops
 *
 * @param {int} i the number to increment
 * @param {int} time in ms
 *
 * @returns {Promise} the number i incremented to 5
 */
const functionPromised = (i, time) => {
  i = i || 0;

  return new Promise((resolve) => {
    setTimeout(() => {
      if (++i === 5) {
        resolve(i);
      } else {
        resolve(functionPromised(i));
      }
    }, time);
  });
};

//// expected result:
functionPromised(0, 250)
  .then((i) => {
    console.log('You did it !');
  })
  .catch()
  // as of Node.js 8.11.4 LTS, Promise.finally is not yet a standard
  .finally();


// * * * * * * * * * * * * * * * * *
// exercice 1b
// * * * * * * * * * * * * * * * * *
//
// Goal:
// Make a promiseAll using 5 times functionPromised with a random time less than 250ms
//

/**
 * Returns a random integer greater than 0 and lesser than a maximum value
 *
 * @param {number} max the maximum value
 */
const randomizer = (max) => {
  return Math.floor(Math.random() * max);
};

/**
 * Executes the functionPromised 5 times with random times
 *
 * @returns {Array} An array of 5 promises
 */
const functionPromisedAll = () => {

  let times = [];

  for (i = 0; i < 5; i++) {
    times.push(randomizer(250));
  }

  // creates a promise for each element of the array
  return Promise.all(times.map(t => functionPromised(0, t)));
};
// expected result:
functionPromisedAll()
  .then((i) => {
    console.log('You did it 5 times !');
  })
  .catch()
  // as of Node.js 8.11.4 LTS, Promise.finally is not yet a standard
  .finally();
