import path from 'path';                    // 'path' package comes with nodejs
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',                    // generate source map
  noInfo: false,                            // information about which files are bundling will be shown

  entry: {                                  // entry point for webpack
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },

  target: 'web',                            // in case of running in node could change this setting to 'node'

                                            // here we tell webpack where it should create our dev bundle
  output: {                                 // webpack won't generate any physical files for dev build
    path: path.resolve(__dirname, 'dist'),  // it will serve our build from memory
    publicPath: '/',                        // we specify path and name to simulate physical file existance
    filename: '[name].[chunkhash].js'
  },

  plugins: [                                // can optionally define some plugins (hot reload, linting)
      // Generate an external css file
      // with a hash in the filename
      new ExtractTextPlugin('[name].[chunkhash].css'),

      // Hash the files using MD5
      // so that their names change when
      // the content changes
      new WebpackMd5Hash(),

      // Use CommonChunkPlugin to create a
      // separate bundle of vendor libs
      // so that they are cached separately
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),

      // Create HTML file that includes
      // reference to bundled JS
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          },
          inject: true
      }),

      // Eliminate duplicate packages
      // when generating bundle
      new webpack.optimize.DedupePlugin(),

      // Minify JS
      new webpack.optimize.UglifyJsPlugin()
  ],

                                            // we need to tell webpack file types to handle
                                            // webpack calls this concept - loaders
                                            // loaders teaches webpack how to handle different file types
                                            // 1st handle javascript
                                            // 2nd handle css
                                            // could be others to handle saas, less, images and more
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}  // ?sourceMap - include css sourcemap
    ]
  }
}
