const rewireMobX = require('react-app-rewire-mobx')
// const rewireSass = require('react-app-rewire-sass');

module.exports = function override(config, env) {
 config = rewireMobX(config, env);
//  config.module.loaders[0].query.plugins =  ['styled-components-named'];
  return config;
}

