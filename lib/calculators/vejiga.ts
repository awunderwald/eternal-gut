import { CalcResult, DISCLAIMER_CALC } from './types';

export interface VolumenVejigaInput {
  largoCm: number;
  anchoCm: number;
  alturaCm: number;
}

export const VEJIGA_VERSION = 'Vejiga-Elipsoide-v1';

export function volumenVejiga({
  largoCm,
  anchoCm,
  alturaCm,
}: VolumenVejigaInput): CalcResult<number> {
  for (const [key, val] of Object.entries({ largoCm, anchoCm, alturaCm })) {
    if (val <= 0 || val > 30) throw new RangeError(`${key} fuera de rango (0-30 cm).`);
  }
  const volumen = 0.52 * largoCm * anchoCm * alturaCm;
  return {
    value: Math.round(volumen),
    unit: 'mL',
    explanation: 'Fórmula elipsoide: 0.52 × L × A × H (cm).',
    disclaimer: DISCLAIMER_CALC,
    version: VEJIGA_VERSION,
  };
}
