const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
  prepare() {
    if (this.outDir === process.cwd()) {
      throw this.createError(
        `You can't create a new project in current directory`
      )
    }
  },
  actions() {
    return [
      {
        type: 'add',
        templateDir: 'templates/main',
        files: '**',
      },
    ];
  },
  async completed() {
    // Composer install
    const { error } = await exec('composer install', { cwd: this.outDir });
    if(error) {
      console.error(`\nError installing Composer dependencies`,);
      return;
    }
    
    // Success!
    console.log(`\nSuccessfully created ${this.chalk.green(this.outFolder)} at ${this.chalk.green(this.outDir)}`);
  }
};
