/*
  本模块运行react-scripts里的脚本 (Create React App)
  可以自定义webpack配置，通过在项目根目录创建"config-override.dev.js" 、 "config-override.prod.js","config-override.js" 文件.

  A config-overrides file should export a single function that takes a
  config and modifies it as necessary.

  module.exports = function(webpackConfig) {
    webpackConfig.module.rules[0].use[0].options.useEslintrc = true;
  };
*/
var proxyquire = require('proxyquire');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const option = process.argv[2];
const overridePath = resolveApp('override-paths');
const overrideConfig = resolveApp('override-config');

option === 'start' ? (process.env.NODE_ENV = 'development') :
  option === 'build' ? (process.env.NODE_ENV = 'production') : (process.env.NODE_ENV = 'test');


const pathCustomizer = loadCustomizer(overridePath);
const pathConfig = pathCustomizer(require('react-scripts/config/paths'), process.env.NODE_ENV);

const pathInject = {
  '../config/paths': pathConfig
};

switch (option) {
  // The "start" script is run during development mode
case 'start':
  {
    let devConfig = proxyquire('react-scripts/config/webpack.config.dev', pathInject);
    let customizer = loadCustomizer(overrideConfig, 'dev');
    proxyquire('react-scripts/scripts/start.js', {
      ...pathInject,
      '../config/webpack.config.dev': customizer(devConfig, process.env.NODE_ENV)
    });
    break;
  }
  // The "build" script is run to produce a production bundle
case 'build':
  {
    let prodConfig = proxyquire('react-scripts/config/webpack.config.prod', pathInject);
    let customizer = loadCustomizer(overrideConfig, 'prod');
    proxyquire('react-scripts/scripts/build.js', {
      ...pathInject,
      '../config/webpack.config.prod': customizer(prodConfig, process.env.NODE_ENV)
    });
    break;
  }
  // The "test" script runs all the tests with Jest
case 'test':
  {
    // Load customizations from the config-overrides.testing file.
    // That file should export a single function that takes a config and returns a config
    let customizer = loadCustomizer(overrideConfig, 'test');
    proxyquire('react-scripts/scripts/test.js', {
      ...pathInject,
      // When test.js asks for '../utils/createJestConfig' it will get this instead:
      '../utils/createJestConfig': (...args) => {
        // Use the existing createJestConfig function to create a config, then pass
        // it through the customizer
        var createJestConfig = require('react-scripts/scripts/utils/createJestConfig');
        return customizer(createJestConfig(...args), 'test');
      }
    });
    break;
  }
default:
  console.error('customized-config only supports "start", "build", and "test" options.');
  process.exit(-1);
}

// Attempt to load the given module and return null if it fails.
function loadCustomizer(module, env) {
  try {
    return require(`${module}.${env}`);
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      try {
        return require(module);
      } catch (e) {
        if (e.code !== "MODULE_NOT_FOUND") {
          throw e;
        }
      }
    }
  }

  // If the module doesn't exist, return a
  // noop that simply returns the config it's given.
  return config => config;
}
