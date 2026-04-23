import { CalcResult, DISCLAIMER_CALC } from './types';
import type { Sexo } from '../../types';

export interface CockcroftGaultInput {
  edad: number;
  pesoKg: number;
  scrMgDl: number;
  sexo: Sexo;
}

export const COCKCROFT_GAULT_VERSION = 'CockcroftGault-1976-v1';

export function cockcroftGault({
  edad,
  pesoKg,
  scrMgDl,
  sexo,
}: CockcroftGaultInput): CalcResult<number> {
  if (edad < 18 || edad > 110) throw new RangeError('Edad fuera de rango (18-110).');
  if (pesoKg <= 0 || pesoKg > 300) throw new RangeError('Peso fuera de rango (0-300 kg).');
  if (scrMgDl <= 0 || scrMgDl > 20) throw new RangeError('Creatinina fuera de rango.');

  const base = ((140 - edad) * pesoKg) / (72 * scrMgDl);
  const crCl = sexo === 'F' ? base * 0.85 : base;

  return {
    value: Math.round(crCl),
    unit: 'mL/min',
    explanation: 'Cockcroft-Gault: [(140 − edad) × peso] / (72 × Scr), × 0.85 si mujer.',
    disclaimer: DISCLAIMER_CALC,
    version: COCKCROFT_GAULT_VERSION,
  };
}
