// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      'src/lib/**/*.spec.ts',
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    junitReporter: {
      outputDir: require('path').join(__dirname, '../../dist/v9/tests'),
      outputFile: 'dynamic-forms-bootstrap.junit.xml',
      useBrowserName: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../apps/demo/src/assets/coverage/bootstrap'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
