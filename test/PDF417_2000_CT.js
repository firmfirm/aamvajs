var should = require('chai').should(),
    expect = require('chai').expect,
    aamva = require('../index');

describe('2000 / CT', function() {

  let res;
  before(function() {
    const data = `@
AMVA 6360060101DL00290198DAAREGULARLPSAMPLE,SELECTDAG,A,3RD
DAG60 STATE ST
DAIWETHERSFIELD
DAJCT
DAK061091896
DAQ119000555
DARD
DASB
DAT
DBA20131107
DBB19940101
DBC1
DBD20111115
DAU601
DAYBLU
DBF00
DBHY`;

    res = aamva.parse(data);
  });

  describe('state', function() {
      it('should be set to CT', function(){
          expect(res.state).to.equal("CT");
      });
  });

  describe('address', function() {
      it('should be set to 60 STATE ST', function(){
          expect(res.address).to.equal("60 STATE ST");
      });
  });

  describe('gender', function() {
      it('should be set to MALE', function(){
          expect(res.sex).to.equal("MALE");
      });
  });

  describe('name', function() {
      it('first should be set to SELECTDAG', function(){
          expect(res.name.first).to.equal("SELECTDAG");
      });
      it('last should be set to REGULARLPSAMPLE', function(){
          expect(res.name.last).to.equal("REGULARLPSAMPLE");
      });
  });

  describe('birthday', function() {
      it('year should be 19940101', function(){
          expect(res.birthday).to.equal('1994-01-01');
      });
  });

  describe('exp', function() {
    it('should be ', function() {
      expect(res.expiration_date).to.equal('2013-11-07');
    });
  });

  describe('postal_code', function() {
      it('should be 06109', function(){
          expect(res.postal_code).to.equal("06109");
      });
  });
});
