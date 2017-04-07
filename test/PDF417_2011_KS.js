var should = require('chai').should(),
    expect = require('chai').expect,
    aamva = require('../index');

var data = `@

ANSI 636022060002DL00410286ZK03270007DLDAQK03-76-9213
DCSHAECHERL
DDEN
DACJANA
DDFN
DADBETH
DDGN
DCAC
DCBNONE
DCDNONE
DBD10152016
DBB04081991
DBA04082022
DBC2
DAU069 IN
DAYBRO
DAG16315 W 124TH STREET
DAIOLATHE
DAJKS
DAK660620000
DCF92891022041HJ16289F2208DB
DCGUSA
DAW140
DAHUNAVL
DCK16291K037692130101
DDB06012012
DDK1

ZKZKA`;

var res = aamva.parse(data);

describe('state', function() {
    it('should be parsed', function(){
        expect(res.state).to.equal("KS");
    });
});

describe('address', function() {
    it('should be parsed', function(){
        expect(res.address).to.equal("16315 W 124TH STREET");
    });
});

describe('gender', function() {
    it('should be parsed', function(){
        expect(res.sex).to.equal("FEMALE");
    });
});

describe('name', function() {
    it('first should be parsed', function(){
        expect(res.name.first).to.equal("JANA");
    });
    it('last should be parsed', function(){
        expect(res.name.last).to.equal("HAECHERL");
    });
});

describe('birthday', function() {
    it('year should be 19940101', function(){
        expect(res.birthday).to.equal('1991-04-08');
    });
});

describe('exp', function() {
  it('should be 20220408', function() {
    expect(res.expiration_date).to.equal('2022-04-08');
  });
});

describe('postal_code', function() {
    it('should be 66062', function(){
        expect(res.postal_code).to.equal("66062");
    });
});
