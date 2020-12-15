#!/usr/bin/env node
const path = require('path');
const cac = require('cac');
const sao = require('sao');
const chalk = require('chalk');

const cli = cac();

cli.command('*', 'Create a WordPress boilerplate', input => {
  if (input.length === 0) {
    return cli.showHelp();
  }

  const targetPath = path.resolve(input[0] || '.');
  console.log(`Creating a new WordPress boilerplate in ${chalk.green(targetPath)}.`)
  return sao({
    template: path.join(__dirname),
    targetPath,
  });
});

cli.parse();
