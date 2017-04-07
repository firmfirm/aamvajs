var should = require('chai').should(),
    expect = require('chai').expect,
    aamva = require('../index');

describe('2000 / FL', function() {

  let res;
  before(function() {
    const data = `@
      ANSI 6360100102DL00390190ZF02290063DLDAADOE,JOHN
      DAG5929 N ROCK ST
      DAIDELRAY SHORE
      DAJFL
      DAK44556-
      DAQJ641720820450
      DARI
      DAS
      DAT
      DBA20210108
      DBB19770208
      DBC1
      DBD20120612
      DBHN
      DAU600
      ZFZFAREPLACED: 00000000
      ZFB ZFCP771206120090
      ZFD ZFE07-01-11`;

    res = aamva.parse(data);
  });

  describe('state', function() {
      it('should be set to FL', function(){
          expect(res.state).to.equal("FL");
      });
  });

  describe('address', function() {
      it('should be set to 5929 N ROCK ST', function(){
          expect(res.address).to.equal("5929 N ROCK ST");
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
      it('last should be set to DOE', function(){
          expect(res.name.last).to.equal("DOE");
      });
  });

  describe('birthday', function() {
      it('year should be 19770208', function(){
          expect(res.birthday).to.equal('1977-02-08');
      });
  });

  describe('postal_code', function() {
      it('should be 44556', function(){
          expect(res.postal_code).to.equal("44556");
      });
  });
});
