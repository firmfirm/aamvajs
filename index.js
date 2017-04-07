(function(global) {

    const FORMAT_FOUR = {
      fields: {
        required: [
          'DCA', 'DCB', 'DCD',
          'DBA', 'DCS', 'DAC', 'DAD',
          'DBD', 'DBB', 'DBC',
          'DAY', 'DAU', 'DAG', 'DAI', 'DAJ',
          'DAK', 'DAQ', 'DCG', 'DDE', 'DDF', 'DDG'
        ],
      },
    };

    // this is required by most standards, but 03 NH license doesn't have it
    // optional: [
    //   'DCF',
    // ],

    const formats = {
      '01': {
        fields: {
          required: ['DAA', 'DAG', 'DAI', 'DAJ', 'DAK', 'DAQ', 'DAR', 'DAS', 'DAT', 'DBA', 'DBB', 'DBC', 'DBD'],
          // optional: [
          //   'DAU', 'DAW', 'DAY', 'DAZ', 'DBK', 'PAA', 'PAB', 'PAC', 'PAD', 'PAE', 'PAF', 'DAB', 'DAC', 'DAD', 'DAE', 'DAF', 'DAH',
          //   'DAL', 'DAM', 'DAN', 'DAO', 'DAP', 'DAV', 'DAX', 'DBE', 'DBF', 'DBG', 'DBH', 'DBI', 'DBJ', 'DBL', 'DBM', 'DBN', 'DBO',
          //   'DBP', 'DBQ', 'DBR', 'DBS',
          // ],
        },
        postProcess(parsedData) {
          const name = parsedData.DAA.split(',');
          parsedData.DCS = name[0];
          parsedData.DAC = name[1];
          parsedData.DAD = name[2];

          // drivers license class
          parsedData.DCA = parsedData.DAR;
        },
      },
      '02': {
        fields: {
          required: [
            'DCA', 'DCB', 'DCD', 'DBA', 'DCS', 'DCT', 'DCU',
            'DBD', 'DBB', 'DBC',
            'DAY', 'DAU',
            'DCE', 'DAG', 'DAI', 'DAJ', 'DAK', 'DAQ',
            'DCG', 'DCH',
          ],
        },
      },
      '03': {
        fields: {
          required: [
            'DCA', 'DCB', 'DCD', 'DBA', 'DCS', 'DCT',
            'DBD', 'DBB', 'DBC',
            'DAY', 'DAU', 'DAG', 'DAI', 'DAJ', 'DAK', 'DAQ',
            'DCG', 'DCH',
          ],
        },
        postProcess(parsedData) {
          const name = parsedData.DCT.split(/[\s,]+/i);
          parsedData.DAC = name[0]; // first name
          parsedData.DAD = name.slice(1).join(' '); // middle name
        },
      },
      // Formats starting from 04 have the same required data elements.
      // Optional elements may be similar too, but not 100% sure.
      '04': FORMAT_FOUR,
      '05': FORMAT_FOUR,
      '06': FORMAT_FOUR,
      '07': FORMAT_FOUR,
      '08': FORMAT_FOUR,
    };

    const parseDate = function(date) {
      var start = parseInt(date[0] + date[1]);
      let year, month, day;
      if (start < 13) {
        year = date.substr(4, 4);
        month = date.substr(0, 2);
        day = date.substr(2, 2);
      } else {
        year = date.substr(0, 4);
        month = date.substr(4, 2);
        day = date.substr(6, 2);
      }
      return `${year}-${month}-${day}`;
    };

    const fieldParser = function(name) {
      return {
        name,
        re: new RegExp(`(?:DL\\d*|[\\r\\n])${name}([^\\r\\n]*)`, 'g'),
      };
    };

    const parse = function(data) {
        // get version of aamva (before 2000 or after)
        const version = data.match(/[A-Z\s]{5}\d{6}(\d{2})/);
        if (!version) return false;
        const format = formats[version[1]];
        if (!format) {
          console.warn(`Unknown version: '${version[1]}'`);
          return false;
        }
        const parsedData = {};
        const required = format.fields.required.map(fieldParser);
        for (let i = 0; i < required.length; i++) {
          const field = required[i];
          const result = field.re.exec(data);
          if (!result) {
            console.warn('Couldnt find field:', field.re, typeof data, data);
            return false;
          }
          parsedData[field.name] = result[1];
          // console.log(`parsedData[${field.name}] =`, result[1]);
        }

        if (format.postProcess) {
          format.postProcess(parsedData);
        }

        var rawData = {
            "state": parsedData.DAJ,
            "city": parsedData.DAI,
            "name": function() {
                return {
                    last: parsedData.DCS,
                    first: parsedData.DAC,
                    middle: parsedData.DAD
                }
            }(),
            "address": parsedData.DAG,
            "iso_iin": undefined,
            "dl": parsedData.DAQ,
            "expiration_date": parseDate(parsedData.DBA),
            "birthday": parseDate(parsedData.DBB),
            "dl_overflow": undefined,
            "cds_version": undefined,
            "jurisdiction_version": undefined,
            "postal_code": parsedData.DAK ? (parsedData.DAK.match(/\d{-}\d+/) ? parsedData.DAK : parsedData.DAK.substring(0,5)) : undefined,
            "klass": parsedData.DCA,
            "restrictions": undefined,
            "endorsments": undefined,
            "sex": function() {
                switch( Number(parsedData.DBC) ) {
                    case 1:
                        return "MALE";
                        break;
                    case 2:
                        return "FEMALE";
                        break;
                    default:
                        if (parsedData.DBC[0] === 'M') {
                          return 'MALE';
                        } else if (parsedData.DBC[0] === 'F') {
                          return 'FEMALE';
                        }
                        return "MISSING/INVALID";
                        break;
                }
            }(),
            "height": undefined,
            "weight": undefined,
            "hair_color": undefined,
            "eye_color": undefined,
            "misc": undefined,
            "id": function(){
                if (!parsedData.DAQ) return;
                return parsedData.DAQ.replace(/[^A-ZA-Z0-9]/g, "");
            }()
        };

        return rawData;
    };

  global.parse = function(data) {
    try {
      return parse(data);
    } catch (e) {
      console.error('Unexpected driver\'s license scanner failure', e);
      return false;
    }
  };
}(this));
