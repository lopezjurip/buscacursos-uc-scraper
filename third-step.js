'use strict';

let initials = require('./second-step');
const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');

function split(a, n) {
  var len = a.length,
    out = [],
    i = 0;
  while (i < len) {
    var size = Math.ceil((len - i) / n--);
    out.push(a.slice(i, i += size));
  }
  return out;
}

function ewe() {
  const queries = initials.map(i => {
    return {
      'cxml_semestre': '2016-1',
      'cxml_sigla': i,
    };
  });

  function handler(query, callback) {
    buscacursos.fetch(query)
      .then(result => callback(null, result))
      .catch(err => callback(err));
  }

  // 5 concurrent
  async.mapLimit(queries, 5, handler, function(err, results) {
    if (err) return console.error(err);

    results.forEach((result, i) => {
      if (result && result.length !== 0) {
        console.log(queries[i]['cxml_sigla'], result.length);
      }
    });
  });
}

ewe();

// Results:
/*
ACO 24
ACT 39
ADU 10
AGC 15
AGE 13
AGF 9
AGL 50+
AGM 6
AGP 26
AGR 18
AGZ 10
ANT 11
AQA 24
AQC 8
AQD 5
AQH 5
AQI 5
AQO 1
AQP 1
AQR 2
AQS 1
AQT 40
AQU 4
ARO 10
ARQ 45
ART 50+
ASP 18
AST 21
BIO 50+
CAR 50+
CCA 6
CCL 50+
CCO 23
CCP 3
COM 50+
CPD 22
DDE 9
DEC 22
DED 18
DEE 7
DEF 4
DEG 2
DEL 10
DEM 14
DEP 13
DER 50+
DES 4
DET 2
DEZ 26
DIA 1
DMD 50+
DME 9
DNO 50+
DPT 50+
DPV 1
EAA 50+
EAE 50+
EAM 50+
EAP 2
EAS 7
EBA 5
EDU 50+
EMS 1
ENA 2
ENB 1
END 1
ENE 1
ENF 50+
ENH 1
ENJ 1
ENL 1
ENN 1
ENO 10
EPA 4
EPG 24
ESE 4
ESH 1
ESO 18
EST 25
EYP 31
FAM 6
FAR 36
FEB 4
FIL 50+
FIM 33
FIS 50+
FIZ 45
FMD 10
FON 10
GEO 50+
IAC 12
IBM 5
ICC 22
ICE 27
ICH 21
ICM 37
ICP 50+
ICS 50+
ICT 21
IDI 3
IEE 43
IEG 16
IEN 17
IEU 35
IHA 1
IHI 50+
IHM 9
IHS 12
IHT 6
IHV 4
IIC 50+
IIQ 35
ILM 4
ILS 4
IMI 12
IMM 22
IMT 4
IND 21
INF 21
ING 50+
INP 8
IPP 1
IRB 1
KIN 17
LET 50+
MAC 2
MAE 1
MAF 1
MAP 3
MAR 2
MAS 1
MAT 50+
MBE 5
MCA 2
MCC 2
MCD 2
MCI 2
MCO 2
MCP 2
MCR 2
MCV 2
MDA 2
MDE 3
MDN 4
MDO 9
MEB 5
MEC 1
MED 45
MEE 1
MEF 4
MEH 2
MEI 2
MEK 7
MEM 4
MEN 9
MEP 2
MER 5
MET 2
MEU 3
MFA 3
MFN 3
MGO 2
MGP 2
MGR 2
MGT 2
MHE 2
MHP 2
MIA 4
MIC 2
MII 2
MIP 2
MIR 2
MLC 3
MMF 2
MMN 3
MNC 3
MNE 3
MNF 2
MNN 2
MNP 3
MNR 10
MNU 15
MOF 3
MOM 2
MOR 3
MPE 1
MPG 17
MPN 3
MPR 3
MPS 3
MQP 4
MRA 3
MRD 4
MRO 3
MRP 2
MSP 22
MTA 3
MTC 4
MTG 4
MTI 3
MTO 3
MTP 3
MUC 50+
MUR 3
NUT 21
ODO 33
PSB 6
PSD 4
PSI 50+
PSM 23
PSO 3
QIF 26
QIM 50+
QOP 1
QPG 27
QUO 1
RII 50+
SOG 3
SOL 50+
TBD 5
TBH 4
TBI 4
TBJ 1
TBM 1
TBS 5
TEO 25
TEP 2
TET 1
TPR 7
TSF 4
TSL 26
TSM 10
TTF 50+
VIL 49
VIP 19
VRA 6
*/
