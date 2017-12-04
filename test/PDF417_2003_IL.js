var should = require('chai').should(),
    expect = require('chai').expect,
    aamva = require('../index');

describe('2003 / IL', function() {

  let res;
  before(function() {
    const data = `@
ANSI 6360350201DL00290191DLDAADORRIS,JOFFREY,B
DAQN42042381172
DBA20180426
DBB19820718
DAG5626 W BOWRENCE AVE APT 5W
DAICHICAGO
DAJIL
DAK605300000
DARD
DAS********
DAT*****
DBD20141117
DBCM
DAU600
DAW185
DAYBRN`;
    res = aamva.parse(data);
  });

  describe('state', function() {
      it('should be set to IL', function(){
          expect(res.state).to.equal("IL");
      });
  });

  describe('address', function() {
      it('should be set to', function(){
          expect(res.address).to.equal("5626 W BOWRENCE AVE APT 5W");
      });
  });

  describe('gender', function() {
      it('should be set to MALE', function(){
          expect(res.sex).to.equal("MALE");
      });
  });

  describe('name', function() {
      it('first should be set to', function(){
          expect(res.name.first).to.equal("JOFFREY");
      });
      it('middle should be set to', function(){
          expect(res.name.middle).to.equal("B");
      });
      it('last should be set to REGULARLPSAMPLE', function(){
          expect(res.name.last).to.equal("DORRIS");
      });
  });

  describe('birthday', function() {
      it('year should be', function(){
          expect(res.birthday).to.equal('1982-07-18');
      });
  });

  describe('exp', function() {
    it('should be ', function() {
      expect(res.expiration_date).to.equal('2018-04-26');
    });
  });

  describe('postal_code', function() {
      it('should be', function(){
          expect(res.postal_code).to.equal("60530");
      });
  });
});
