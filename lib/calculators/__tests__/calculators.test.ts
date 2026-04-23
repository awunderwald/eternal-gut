import {
  ckdEpi2021,
  cockcroftGault,
  contrasteAdulto,
  volumenVejiga,
  eqd2,
  bmi,
  bsaMosteller,
  scrMgDlToUmolL,
  scrUmolLToMgDl,
  mGyToMsv,
  CONTRASTE_MIN_ML,
  CONTRASTE_MAX_ML,
  DISCLAIMER_CALC,
} from '../index';

describe('CKD-EPI 2021 (sin factor raza)', () => {
  test('hombre 60 años, Scr 1.0 ≈ 86 mL/min/1.73m²', () => {
    const r = ckdEpi2021({ edad: 60, scrMgDl: 1.0, sexo: 'M' });
    expect(r.value).toBeGreaterThanOrEqual(84);
    expect(r.value).toBeLessThanOrEqual(88);
    expect(r.unit).toBe('mL/min/1.73m²');
    expect(r.version).toMatch(/CKD-EPI-2021/);
  });

  test('mujer 50 años, Scr 0.8 ≈ 90 mL/min/1.73m²', () => {
    const r = ckdEpi2021({ edad: 50, scrMgDl: 0.8, sexo: 'F' });
    expect(r.value).toBeGreaterThanOrEqual(88);
    expect(r.value).toBeLessThanOrEqual(92);
  });

  test('Scr alta activa warning de ERC avanzada', () => {
    const r = ckdEpi2021({ edad: 70, scrMgDl: 3.0, sexo: 'M' });
    expect(r.value).toBeLessThan(30);
    expect(r.warnings?.join(' ')).toMatch(/ERC avanzada/);
  });

  test('rango inválido lanza RangeError', () => {
    expect(() => ckdEpi2021({ edad: 10, scrMgDl: 1.0, sexo: 'M' })).toThrow(RangeError);
    expect(() => ckdEpi2021({ edad: 50, scrMgDl: -1, sexo: 'M' })).toThrow(RangeError);
  });
});

describe('Cockcroft-Gault', () => {
  test('hombre 60/80kg/Scr 1.0 ≈ 89 mL/min', () => {
    const r = cockcroftGault({ edad: 60, pesoKg: 80, scrMgDl: 1.0, sexo: 'M' });
    expect(r.value).toBe(89);
  });
  test('factor 0.85 en mujer', () => {
    const m = cockcroftGault({ edad: 60, pesoKg: 80, scrMgDl: 1.0, sexo: 'M' });
    const f = cockcroftGault({ edad: 60, pesoKg: 80, scrMgDl: 1.0, sexo: 'F' });
    expect(f.value).toBe(Math.round(m.value * 0.85));
  });
});

describe('Contraste adulto', () => {
  test('eGFR ≥ 60 usa 1.0 mL/kg', () => {
    const r = contrasteAdulto({ pesoKg: 70, eGFR: 90 });
    expect(r.value).toBe(70);
  });
  test('eGFR 30-59 usa 0.8 mL/kg', () => {
    const r = contrasteAdulto({ pesoKg: 70, eGFR: 45 });
    expect(r.value).toBe(56);
  });
  test('eGFR < 30 usa 0.5 mL/kg y advierte ERC severa', () => {
    const r = contrasteAdulto({ pesoKg: 120, eGFR: 20 });
    expect(r.value).toBe(60);
    expect(r.warnings?.join(' ')).toMatch(/ERC severa/);
  });
  test('respeta mínimo seguro 50 mL', () => {
    const r = contrasteAdulto({ pesoKg: 40, eGFR: 90 });
    expect(r.value).toBe(CONTRASTE_MIN_ML);
  });
  test('respeta máximo seguro 150 mL', () => {
    const r = contrasteAdulto({ pesoKg: 180, eGFR: 90 });
    expect(r.value).toBe(CONTRASTE_MAX_ML);
  });
});

describe('Volumen vejiga', () => {
  test('8 × 5 × 4 cm = 83 mL', () => {
    const r = volumenVejiga({ largoCm: 8, anchoCm: 5, alturaCm: 4 });
    expect(r.value).toBe(83);
  });
});

describe('EQD2', () => {
  test('60 Gy en 3 Gy/fx, α/β=3 → 72 Gy', () => {
    const r = eqd2({ dosisTotalGy: 60, dosisPorFraccionGy: 3, alphaBeta: 3 });
    expect(r.value).toBe(72);
  });
});

describe('Antropometría', () => {
  test('IMC 70kg / 175cm ≈ 22.9 (normal)', () => {
    const r = bmi({ pesoKg: 70, alturaCm: 175 });
    expect(r.value).toBeCloseTo(22.9, 1);
    expect(r.explanation).toMatch(/normal/);
  });
  test('BSA 70kg / 175cm ≈ 1.85 m²', () => {
    const r = bsaMosteller({ pesoKg: 70, alturaCm: 175 });
    expect(r.value).toBeCloseTo(1.85, 1);
  });
});

describe('Conversiones', () => {
  test('Scr 1.0 mg/dL → 88.4 μmol/L', () => {
    expect(scrMgDlToUmolL(1.0).value).toBeCloseTo(88.4, 1);
  });
  test('round-trip Scr', () => {
    const umol = scrMgDlToUmolL(1.2).value;
    expect(scrUmolLToMgDl(umol).value).toBeCloseTo(1.2, 2);
  });
  test('1 mGy = 1 mSv para W_R=1', () => {
    expect(mGyToMsv(2.5).value).toBeCloseTo(2.5);
  });
});

describe('Disclaimer obligatorio (ISP)', () => {
  const casos = [
    () => ckdEpi2021({ edad: 40, scrMgDl: 1, sexo: 'M' }),
    () => cockcroftGault({ edad: 40, pesoKg: 70, scrMgDl: 1, sexo: 'M' }),
    () => contrasteAdulto({ pesoKg: 70, eGFR: 90 }),
    () => volumenVejiga({ largoCm: 8, anchoCm: 5, alturaCm: 4 }),
    () => eqd2({ dosisTotalGy: 60, dosisPorFraccionGy: 3, alphaBeta: 3 }),
    () => bmi({ pesoKg: 70, alturaCm: 175 }),
    () => bsaMosteller({ pesoKg: 70, alturaCm: 175 }),
    () => scrMgDlToUmolL(1.0),
  ];
  test.each(casos)('retorna disclaimer y version (%#)', (fn) => {
    const r = fn();
    expect(r.disclaimer).toBe(DISCLAIMER_CALC);
    expect(r.version).toMatch(/v\d/);
  });
});
