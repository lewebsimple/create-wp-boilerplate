#!/usr/bin/env node
const path = require('path');
const cac = require('cac');
const sao = require('sao');
const chalk = require('chalk');

const cli = cac();

cli
  .command('<target-folder>', 'Create a WordPress boilerplate')
  .action(async (targetFolder) => {
    console.log(`Creating a new WordPress boilerplate in ${chalk.green(targetFolder)}.`)
    
    const app = sao({ 
      generator: path.join(__dirname, '../generator'),
       outDir: targetFolder,
    })

    await app.run().catch(sao.handleError);
  });

cli.help()
cli.version(require('../package').version)
  
try {
  cli.parse()
} catch(error) {
  cli.outputHelp();
}
