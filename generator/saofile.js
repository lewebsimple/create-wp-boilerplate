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
  prompts() {
    return [
      {
        name: 'plugins',
        message: 'Select the plugins you want',
        type: 'checkbox',
        choices: [
          'lewebsimple/acf-polylang',
          'lewebsimple/advanced-custom-fields-pro',
          'lewebsimple/advanced-forms-pro',
          'lewebsimple/oxygen',
          'lewebsimple/polylang-pro',
          'wpackagist-plugin/autodescription',
          'wpackagist-plugin/loco-translate',
          'wpackagist-plugin/safe-svg',
          'wpackagist-plugin/user-switching',
        ],
      },
    ];
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
    const { plugins } = this.answers

    // Composer install
    const { error } = await exec(`composer install`, { cwd: this.outDir });
    if(error) {
      console.error(`\nError installing Composer dependencies`,);
      return;
    }

    // Add plugins
    plugins.forEach(async plugin => {
      console.log(`\nInstalling ${this.chalk.green(plugin)}`);
      await exec(`composer require ${plugin}`, { cwd: this.outDir });
    });
    
    // Success!
    console.log(`\nSuccessfully created ${this.chalk.green(this.outFolder)} at ${this.chalk.green(this.outDir)}`);
  }
};
