module.exports = {
  entry: './src/main.js',
  output: {
     filename: './build/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file?name=public/fonts/[name].[ext]'
        }]
      },
    // ...other loaders...
      {
         test: /\.scss$/,
         use: [
           {
             loader: 'style-loader'
           },
           {
             loader: 'css-loader'
           },
           {
             loader: 'sass-loader'
           }
         ]
      },
   ]
 }
};