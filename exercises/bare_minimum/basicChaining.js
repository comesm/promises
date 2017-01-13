/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
var async = require('./promisification');
var constr = require('./promiseConstructor');
var writeFileAsync = Promise.promisify(fs.writeFile);
var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath, callback) {
   return constr.pluckFirstLineFromFileAsync(readFilePath)
      .then(function(line) {
          return line;
      }).then(function(userName) {
        return async.getGitHubProfileAsync(userName);
      }).then(function(response) {
        var response = JSON.stringify(response);
        return writeFileAsync(writeFilePath, response);
      });


};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
