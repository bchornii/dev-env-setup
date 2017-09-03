// This file isn't transpiled so must use CommonJS or ES5

// Register babel to transpile before our tests run
require('babel-register')();

// Disable webpack features that Mocha dosn't understand
require.extensions['.css'] = function() {};
