const fs = require('fs');
/**
 * Given an input Array, returns a Map containing the count of each item in the input.
 * @param {Array} array - The array of items to count
 * @param {Map} counts - A Map containing the counts of the items in the input array
 */
function itemCounts(array) {
  let counts = array.reduce((accum, arrVal) => {
    let newCount = accum.has(arrVal) ? accum.get(arrVal) + 1 : 1;
    return accum.set(arrVal, newCount);
  }, new Map());

  return counts;
}

function stringToCharacters(input) {
  return input.toString().split('');
}

function sanitize(input){
  return input.toString().toLowerCase();
}

function onlyCharacters(input){
  return input.toString().replace(/[^a-zA-Z]+/g, '');
}

function getFilePath(){
  let procArgv = process.argv;

  if(procArgv.length <= 2) throw 'the path of the file was not specified!'
  return procArgv.slice(2).toString();
}

function basicFrequencyStatistics(arr){
  let charCount = arr.length;
  let mapCount = itemCounts(arr);

  mapCount.forEach(function(value, key) {
    mapCount.set(key, value /charCount);
  });

  return mapCount;
}

function sortMap(map){
  var sortedMap = new Map();
  var keys = [];
  
  map.forEach(function callback(value, key) {
    keys.push(key);
  });

  keys.sort().map(function(key) {
    sortedMap.set(key, map.get(key));
  });

  return sortedMap;
}

function printHistogram(freqMap){
  freqMap.forEach(function(value, key) { 
    let freqVal = (value * 100).toFixed(2);
    let bars = freqVal/0.2;

    console.log(`${key} [${' '.repeat(2 - freqVal.indexOf('.'))}${freqVal}%] ${'='.repeat(bars)}`);
  });
}

function letterCountStatistics(path){
  fs.readFile(path,'utf8', (err, data) => {
    if (err) throw err;

    let cleanedData = onlyCharacters(sanitize(data));

    let count = basicFrequencyStatistics(stringToCharacters(cleanedData));

    printHistogram(sortMap(count));
  }); 
}

if (require.main == module) {
  let filePath = getFilePath()

  console.log('The letter count statistics for the file', filePath, 'is: \n');
  letterCountStatistics(filePath);
}

module.exports = { itemCounts, stringToCharacters, sanitize, onlyCharacters, basicFrequencyStatistics, sortMap};
