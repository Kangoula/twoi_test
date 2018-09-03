// * * * * * * * * * * * * * * * * *
// Two-I: node.js test
// @author: Julien Pirson
// * * * * * * * * * * * * * * * * *

// You will need Linux and Node.js package


// * * * * * * * * * * * * * * * * *
// exercice 3
// * * * * * * * * * * * * * * * * *
//
// Goal:
// You have to concat/assign/merge every keys from the input data to return the expected output below.
// (Be attentive about the order of the input data and the expected output)
//
// input data
let data = {
  '0-0_0-0': {emotion: {anger:0.1,happiness:0.9}},
  '0-0': {label: 'face'},
  '0-0_0-0_0-0': {gender: 'female'},
  '0-2': {label: 'face'},
  '0-3': {label: 'car'},
  '0-2_0-1_0-0': {gender: 'male'},
  '0-3_1-1': {car: {color:'red'}},
  '0-1': {label: 'car'},
  '0-2_0-1': {emotion: {anger:0.1,happiness:0.9}},
  '0-3_1-1_0-0_0-0': {car: {size:'big'}},
  '0-3_1-1_0-0': {car: {brand:'mazda'}},
  '0-1_1-0': {car: {color:'blue'}},
  '0-3_1-1_0-0_0-0_0-0': {car: {type:'sport'}},
  '0-1_1-0_0-0': {car: {brand:'ferrari'}}
};
// expected output
let newData = [
  {label: 'face', emotion: {anger:0.1,happiness:0.9}, gender: 'female'},
  {label: 'car', car: {color:'blue', brand:'ferrari'}},
  {label: 'face', emotion: {anger:0.1,happiness:0.9}, gender: 'male'},
  {label: 'car', car: {color:'red', brand:'mazda', size:'big', type:'sport'}}
];

/**
 * Group objects from an array by their keys with a predicate function
 *
 * @param {Array} items the array of objets we want to group
 * @param {Function} fn the predicate function to decide if an object should be added in a group
 *
 * @returns {Object} an object with its keys set as the result of the group predicate and its values set as the grouped objects
 */
const groupByKey = (items, fn) => {
  let groupedMap = items.reduce((acc, cur) => {
    // apply the predicate function
    const key = fn(cur),
          elem = acc[key];
    if(!elem) {
      // create a new group
      acc[key] = [cur];
    } else {
      // add elem in the group
      elem.push(cur);
    }
    return acc;
  }, {});

  return groupedMap;
};

/**
 * Removes the feature vector for each element of the input Array
 *
 * @param {Array} items nested Array shaped like [[fectureVector, object],...]
 *
 * @returns {Array} an flat array without the feature vector(s) [object, ...]
 */
const cleanGroup = (items) => {
  return items.map((item) => { return item[1]; });
};

/**
 * Merge the Objects in an array into a single Object base on their keys
 *
 * @param {Array} objects an Array of Objects
 *
 * @returns {Object} the merged object obtainend from the input Array
 */
const mergeData = (objects) => {
  return objects.reduce((acc, cur) => {
    // extract the main key an value from the current Object
    const key = Object.keys(cur)[0],
          value = Object.values(cur)[0];

    if(!acc[key]) {
      // simple merge if the key doesn't exists
      return {...acc, ...cur};
    } else {
      // merge only the value of the current object otherwise
      acc[key] = {...acc[key], ...value};
      return acc;
    }
  }, {});
};

/**
 * Returns its param.
 */
const identity = x => x;

/**
 * Functional programming fanciness
 * Takes functions and apply them in order with the previous function's result as its param
 *
 * @param {Function} fns one or more function(s)
 * @param x the data we want to process with the functions
 *
 * @returns the result of applying the input functions
 */
const pipe = (...fns) => fns.reduce((acc, cur) => x => cur(acc(x)), identity);

let sorted = pipe(
  // sort the objects by key
  data => Object.entries(data).sort(),
  // group by the first 3 char of the elem
  data => groupByKey(data, e => e[0].substring(0,3)),
  // remove the group
  data => Object.values(data),
  // remove the feature vector from each groups' items
  data => data.map(cleanGroup),
  // merge
  data => data.map(mergeData))(data);

console.log("sorted", sorted);
console.log("expected", newData);
