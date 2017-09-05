/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for prod.This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if(err){
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors){
    return jsonStats.errors.map(err => console.log(chalk.red(err)));
  }

  if(jsonStats.hasWarnings){
    console.log(chalk.yellow('Webpack generated the following warnings:'));
    jsonStats.warnings.map(warn => console.log(chalk.yellow(warn)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded
  console.log(chalk.green('Your app has been built for prod into ./dist folder.'));

  return 0;
});
