Steps:
    1. .editorconfig
    2. package.json + npm install
    3. srcServer.js (contains dev web server configuration to return index.html)
    4. npm scripts (build automation)
    5. .babelrc (transpiling ES6 code to ES5, 'babel-node' command instead of 'node')
    6. webpack.config.js
    7. configure web server(express) to serve webpack bundle (webpack-dev-middleware) from memory
    8. css via import in index.js (css handling configured in webpack.config.dev.js)
    9. auto generation of source maps as part of building process ('devtool' prop in webpack.config.dev.js)
    10. .eslintrc.json + npm scripts for watching files (npm run lint -- --watch)

    11. automation test
        1) testing framework - mocha
        2) assertion framework - chai, expect
        3) helper libraries - jsdom (in case of interaction with DOM during test)
        4) where to run tests - node
        5) where to keep tests files (along js files)
        6) when to run tests (every time you hit save)

    12. setting up CI server - AppVeyor and point it to github repo
    13. setting up HTTP requests in app - fetch
    14. mock api : static json file, json server, json server + json schema faker, express
        - json server + json schema faker
          1) declare schema (mockDataSchema.js)
          2) generate random data (generateMockData.js) and write it to a file
          3) serve data via api:
            a) start json server via npm command which works with generated db.json
            b) create baseUrl.js module which serves function for getting actual api url address
               and use that function in userApi.js

Notes:
    1. bundler takes js code and package it for target environment such as a browser or node
    2. webpack bundler includes hot-reloading web server; webpack serves files from memory which
       speads development and could automatically update client state to reflect code changes and not
       just js but also styles, images and html
