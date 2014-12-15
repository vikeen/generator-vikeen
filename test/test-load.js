/*global describe, it*/
'use strict';
var assert = require('assert');

describe('generator-vikeen', function () {
  it('can be imported without blowing up', function () {
    var app = require('../generators/app/index.js');
    assert(app !== undefined);
  });
});
