var should = require('chai').should(),
    expect = require('chai').expect,
    aamva = require('../index');

var data = `@
ANSI 111111030001DL01111111DCA
DCB
DCD
DBA11111112
DCSSMITH
DCTJOHN A B
DBD03016013
DBB10071990
DBC1
DAYBRO
DAU11 in
DAG111 SMITHS ST
DAI SMITHSTON
DAJNH
DAK333333333
DAQ44NST44444
DCGUSA
DCHNONE`;

var res = aamva.parse(data);

describe('PDF417, NH', function() {
  describe('state', function() {
      it('should be set to NH', function(){
          expect(res.state).to.equal("NH");
      });
  });

  describe('address', function() {
      it('should be set to 111 SMITHS ST', function(){
          expect(res.address).to.equal("111 SMITHS ST");
      });
  });

  describe('gender', function() {
      it('should be set to MALE', function(){
          expect(res.sex).to.equal("MALE");
      });
  });

  describe('name', function() {
      it('first should be set to JOHN', function(){
          expect(res.name.first).to.equal("JOHN");
      });
      it('middle should be set to A B', function(){
          expect(res.name.middle).to.equal("A B");
      });
      it('last should be set to SMITH', function(){
          expect(res.name.last).to.equal("SMITH");
      });
  });

  describe('birthday', function() {
      it('year should be 1990-10-07', function(){
          expect(res.birthday).to.equal('1990-10-07');
      });
  });

  describe('postal_code', function() {
      it('should be 33333', function(){
          expect(res.postal_code).to.equal("33333");
      });
  });
});
