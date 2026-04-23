import { CalcResult, DISCLAIMER_CALC } from './types';

export interface BmiInput {
  pesoKg: number;
  alturaCm: number;
}

export const BMI_VERSION = 'BMI-WHO-v1';
export const BSA_VERSION = 'BSA-Mosteller-v1';

export function bmi({ pesoKg, alturaCm }: BmiInput): CalcResult<number> {
  if (pesoKg <= 0 || pesoKg > 400) throw new RangeError('Peso fuera de rango.');
  if (alturaCm < 50 || alturaCm > 260) throw new RangeError('Altura fuera de rango (50-260 cm).');
  const alturaM = alturaCm / 100;
  const v = pesoKg / (alturaM * alturaM);
  const rounded = Math.round(v * 10) / 10;

  let clasif: string;
  if (rounded < 18.5) clasif = 'bajo peso';
  else if (rounded < 25) clasif = 'normal';
  else if (rounded < 30) clasif = 'sobrepeso';
  else if (rounded < 35) clasif = 'obesidad I';
  else if (rounded < 40) clasif = 'obesidad II';
  else clasif = 'obesidad III';

  return {
    value: rounded,
    unit: 'kg/m²',
    explanation: `IMC = peso / altura² · clasificación OMS: ${clasif}.`,
    disclaimer: DISCLAIMER_CALC,
    version: BMI_VERSION,
  };
}

export interface BsaInput {
  pesoKg: number;
  alturaCm: number;
}

export function bsaMosteller({ pesoKg, alturaCm }: BsaInput): CalcResult<number> {
  if (pesoKg <= 0) throw new RangeError('Peso fuera de rango.');
  if (alturaCm <= 0) throw new RangeError('Altura fuera de rango.');
  const v = Math.sqrt((pesoKg * alturaCm) / 3600);
  return {
    value: Math.round(v * 100) / 100,
    unit: 'm²',
    explanation: 'Mosteller: √((peso × altura) / 3600).',
    disclaimer: DISCLAIMER_CALC,
    version: BSA_VERSION,
  };
}
