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
//
const functionPromised = (i, time, cb) => {
  i = i || 0
  setTimeout(() => {
    if (++i === 5) {
      cb(i)
    } else {
      functionPromised(i)
    }
  }, time)
}
// expected result:
functionPromised(0, 250)
.then((i) => {
  console.log('You did it !')
})
.catch()
.finally()


// * * * * * * * * * * * * * * * * *
// exercice 1b
// * * * * * * * * * * * * * * * * *
//
// Goal:
// Make a promiseAll using 5 times functionPromised with a random time less than 250ms
//
// expected result:
functionPromisedAll()
.then((i) => {
  console.log('You did it 5 times !')
})
.catch()
.finally()
