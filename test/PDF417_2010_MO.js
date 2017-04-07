var should = require('chai').should(),
    expect = require('chai').expect,
    aamva = require('../index');

var data = `@

ANSI 636030050102DL00410266ZM03070056DLDAQR112151021
DCSHEWITT
DDEN
DACANDREA
DDFN
DADLOUISE
DDGN
DCAF
DCBNONE
DCDNONE
DBD04052014
DBB04241990
DBA04242020
DBC2
DAU064 in
DAYHAZ
DAG4121 ROANOKE RD # 18
DAIKANSAS CITY
DAJMO
DAK641110000
DCF140260950009
DCGUSA
DAW140
DCK14098R1121510210101
DDB12102012

ZMZMAY
ZMBN
ZMCN
ZMDN
ZMEN
ZMFJACK
ZMG0
ZMH0
ZMI0
ZMJ0`;

var res = aamva.parse(data);

describe('state', function() {
    it('should be parsed', function(){
        expect(res.state).to.equal("MO");
    });
});

describe('address', function() {
    it('should be parsed', function(){
        expect(res.address).to.equal("4121 ROANOKE RD # 18");
    });
});

describe('gender', function() {
    it('should be parsed', function(){
        expect(res.sex).to.equal("FEMALE");
    });
});

describe('name', function() {
    it('first should be parsed', function(){
        expect(res.name.first).to.equal("ANDREA");
    });
    it('last should be parsed', function(){
        expect(res.name.last).to.equal("HEWITT");
    });
});

describe('birthday', function() {
    it('year should be parsed', function(){
        expect(res.birthday).to.equal('1990-04-24');
    });
});

describe('exp', function() {
  it('should be parsed', function() {
    expect(res.expiration_date).to.equal('2020-04-24');
  });
});

describe('postal_code', function() {
    it('should be parsed', function(){
        expect(res.postal_code).to.equal("64111");
    });
});
