import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev'

/*eslint-disable no-console*/

const port = 3100;
const app = express();
const compiler = webpack(config);   // returns reference to webpack compiler

// integrate webpack with express
// middleware serves files emitted from webpack over a connect server (express)
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,                           // not to display any special info
  publicPath: config.output.publicPath    // path from webpack.config.dev.js
}));

app.get('/', function(req, resp){
    resp.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, resp){
  resp.json([
    {"id": 1, "firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2, "firstName":"Tammy","lastName":"Norton","email":"tnorton@gmail.com"},
    {"id": 3, "firstName":"Tina","lastName":"Lee","email":"lee.tina@gmail.com"}
  ])
});

app.listen(port, function(err){
    if(err){
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});
