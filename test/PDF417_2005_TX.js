var should = require('chai').should(),
    expect = require('chai').expect,
    aamva = require('../index');

    var data = `@
ANSI 636015030002DL00410217ZT02580015DL
DCAC
DCBNONE
DCDNONE
DBA08042015
DCSDOE
DCTJOHN
DBD08192014
DBB02081977
DBC1
DAYBLK
DAU 65 IN
DAG5929 N ROCK ST
DAIAUSTIN
DAJTX
DAK44556
DAQ38884194
DCF18613490088119258857
DCGUSA
DCHNONE
DAZBLK
DCUZTZTA130ZTBA`;

var res = aamva.parse(data);

describe('state', function() {
    it('should be set to TX', function(){
        expect(res.state).to.equal("TX");
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
    it('should be 02081977', function() {
      expect(res.birthday).to.equal('1977-02-08');
    });
});

describe('postal_code', function() {
    it('should be 44556', function(){
        expect(res.postal_code).to.equal("44556");
    });

});
