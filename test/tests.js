var colorsFromString = require('../src/index.js');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('argument checking', function() {
  it('should return undefined if no arguments are supplied', function() {
    expect(colorsFromString()).to.equal(undefined);
  });
  it('should return an error if argument isnt a string', function() {
    (function(){
      colorsFromString({});
    }).should.throw(Error);
  });
  it('should return empty array if no results are found', function() {
    var results = colorsFromString('might be some colors here, who knows?');
    expect(results).to.be.empty;
  });
});

describe('color types', function() {
  it('should match hex colors with 6 digits', function() {
    var results = colorsFromString('#ffffff foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('#ffffff');
    expect(results[0].type).to.equal('hex');
  });

  it('should match hex colors with 3 digits', function() {
    var results = colorsFromString('#fff foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('#fff');
    expect(results[0].type).to.equal('hex');
  });

  it('should match rgb colors', function() {
    var results = colorsFromString('rgb(255,255,255) foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('rgb(255,255,255)');
    expect(results[0].type).to.equal('rgb');
  });

  it('should match rgba colors', function() {
    var results = colorsFromString('rgba(255,255,255, 1) foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('rgba(255,255,255, 1)');
    expect(results[0].type).to.equal('rgba');
  });

  it('should match hsl colors', function() {
    var results = colorsFromString('hsl(100,100%,100%) foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('hsl(100,100%,100%)');
    expect(results[0].type).to.equal('hsl');
  });

  it('should match hsla colors', function() {
    var results = colorsFromString('hsla(100,100%,100%,1) foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('hsla(100,100%,100%,1)');
    expect(results[0].type).to.equal('hsla');
  });

  it('should match css colors', function() {
    var results = colorsFromString('tomato foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('tomato');
    expect(results[0].type).to.equal('keyword');
  });
});

describe('should match multiple colors of different types', function() {
  it('should find hex and rgb', function() {
    var results = colorsFromString('here is hex #ffffff and here is rgb rgb(255,255,255)');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(2);
    expect(results[0].match).to.equal('#ffffff');
    expect(results[0].index).to.equal(12);
    expect(results[0].type).to.equal('hex');
    expect(results[1].match).to.equal('rgb(255,255,255)');
    expect(results[1].index).to.equal(36);
    expect(results[1].type).to.equal('rgb');
  });
});
