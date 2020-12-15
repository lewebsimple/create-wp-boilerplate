module.exports = {
  complete({ chalk, folderPath, folderName }) {
    console.log(`\nSuccessful! Created ${chalk.green(folderName)} at ${chalk.green(folderPath)}`)
  }
};
