import { CalcResult, DISCLAIMER_CALC } from './types';

export interface Eqd2Input {
  dosisTotalGy: number;
  dosisPorFraccionGy: number;
  alphaBeta: number;
}

export const EQD2_VERSION = 'EQD2-LQ-v1';

export function eqd2({ dosisTotalGy, dosisPorFraccionGy, alphaBeta }: Eqd2Input): CalcResult<number> {
  if (dosisTotalGy <= 0 || dosisTotalGy > 200) throw new RangeError('Dosis total fuera de rango.');
  if (dosisPorFraccionGy <= 0 || dosisPorFraccionGy > 30) throw new RangeError('Dosis por fracción fuera de rango.');
  if (alphaBeta <= 0 || alphaBeta > 30) throw new RangeError('α/β fuera de rango.');

  const eqd2Value =
    dosisTotalGy * ((dosisPorFraccionGy + alphaBeta) / (2 + alphaBeta));

  return {
    value: Math.round(eqd2Value * 100) / 100,
    unit: 'Gy',
    explanation: `EQD2 = D × (d + α/β) / (2 + α/β) · α/β=${alphaBeta}.`,
    disclaimer: DISCLAIMER_CALC,
    version: EQD2_VERSION,
  };
}
