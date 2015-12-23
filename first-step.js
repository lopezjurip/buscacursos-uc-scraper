// Get pairs of valid initials

'use strict';

const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');
// const async = require('asyncawait/async');
// const wait = require('asyncawait/await');

function twoInitials() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
  const collection = new MySet();
  alphabet.forEach(char1 => {
    alphabet.forEach(char2 => {
      collection.add(char1 + char2);
    });
  })
  return collection.toArray();
}

let initials = twoInitials();

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

// const page = process.argv[2] || 0;
// initials = split(initials, 60);
// initials = initials[page];

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
AA 50
AC 50
AD 10
AE 50
AF 1
AG 50
AM 50
AN 11
AP 5
AQ 50
AR 50
AS 47
AT 50
BA 5
BD 5
BE 5
BH 4
BI 50
BJ 1
BM 6
BS 5
CA 50
CC 50
CD 2
CE 27
CH 21
CI 2
CL 50
CM 37
CO 50
CP 50
CR 2
CS 50
CT 50
CV 2
DA 2
DD 9
DE 50
DI 4
DM 50
DN 50
DO 42
DP 50
DU 50
EA 50
EB 14
EC 23
ED 50
EE 50
EF 8
EG 18
EH 2
EI 2
EK 7
EL 10
EM 19
EN 50
EO 50
EP 45
ER 50
ES 50
ET 50
EU 38
EY 31
EZ 26
FA 45
FE 4
FI 50
FM 10
FN 3
FO 10
GC 15
GE 50
GF 9
GL 50
GM 6
GO 2
GP 28
GR 20
GT 2
GZ 10
HA 1
HE 2
HI 50
HM 9
HP 2
HS 12
HT 6
HV 4
IA 17
IB 5
IC 50
ID 3
IE 50
IF 26
IH 50
II 50
IL 50
IM 50
IN 50
IO 50
IP 22
IQ 35
IR 3
IS 50
IZ 45
KI 17
LC 3
LE 50
LM 4
LS 4
MA 50
MB 5
MC 16
MD 50
ME 50
MF 8
MG 8
MH 4
MI 24
ML 3
MM 27
MN 41
MO 8
MP 27
MQ 4
MR 12
MS 23
MT 25
MU 50
NA 2
NB 1
NC 3
ND 22
NE 4
NF 50
NG 50
NH 1
NJ 1
NL 1
NN 3
NO 50
NP 11
NR 10
NT 11
NU 36
OD 33
OF 3
OG 3
OL 50
OM 50
ON 10
OP 1
OR 3
PA 4
PD 22
PE 1
PG 50
PN 3
PP 1
PR 10
PS 50
PT 50
PV 1
QA 24
QC 8
QD 5
QH 5
QI 50
QO 2
QP 32
QR 2
QS 1
QT 40
QU 5
RA 9
RB 1
RD 4
RI 50
RO 13
RP 2
RQ 45
RT 50
SB 6
SD 4
SE 4
SF 4
SH 1
SI 50
SL 26
SM 33
SO 50
SP 40
ST 46
TA 3
TB 20
TC 4
TE 28
TF 50
TG 4
TI 3
TO 3
TP 10
TS 40
TT 50
UC 50
UO 1
UR 3
UT 21
VI 50
VR 6
YP 31
*/
