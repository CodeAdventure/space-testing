const chai = require('chai');

const spaceChai = require('../lib/assertions/space-chai.js');
chai.use(spaceChai);

global.expect = chai.expect;
