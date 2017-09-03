import path from 'path';                    // 'path' package comes with nodejs

export default {
  debug: true,
  devtool: 'inline-source-map',             // generate source map
  noInfo: false,                            // information about which files are bundling will be shown

  entry: [                                  // entry point for webpack
    path.resolve(__dirname, 'src/index')
  ],

  target: 'web',                            // in case of running in node could change this setting to 'node'

                                            // here we tell webpack where it should create our dev bundle
  output: {                                 // webpack won't generate any physical files for dev build
    path: path.resolve(__dirname, 'src'),   // it will serve our build from memory
    publicPath: '/',                        // we specify path and name to simulate physical file existance
    filename: 'bundle.js'
  },

  plugins: [],                              // can optionally define some plugins (hot reload, linting)

                                            // we need to tell webpack file types to handle
                                            // webpack calls this concept - loaders
                                            // loaders teaches webpack how to handle different file types
                                            // 1st handle javascript
                                            // 2nd handle css
                                            // could be others to handle saas, less, images and more
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  }
}
