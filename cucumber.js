require('dotenv').config();

module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['tests/support/**/*.ts', 'tests/steps/**/*.ts'],
    format: ['progress','summary'],
    publishQuiet: true,
  },
};