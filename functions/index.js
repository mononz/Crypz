/**
 * EXPORT ALL FUNCTIONS
 * Loads all `.function.js` files
 * Exports a cloud function matching the file name
 * Based on this thread: https://github.com/firebase/functions-samples/issues/170
 */
const glob = require('glob');
const files = glob.sync('./functions/*.function.js', { cwd: __dirname });

for(let f=0,fl=files.length; f<fl; f++){
  const file = files[f];
  let functionName = file.split('/').pop().slice(0, -12); // Strip off '.function.js'
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(file);
  }
}