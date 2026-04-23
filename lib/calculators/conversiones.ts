import { CalcResult, DISCLAIMER_CALC } from './types';

export const CONV_SCR_VERSION = 'Conv-Creatinina-v1';
export const CONV_DOSE_VERSION = 'Conv-Dose-v1';

const SCR_FACTOR = 88.4;

export function scrMgDlToUmolL(mgDl: number): CalcResult<number> {
  if (mgDl < 0) throw new RangeError('Scr negativa.');
  return {
    value: Math.round(mgDl * SCR_FACTOR * 10) / 10,
    unit: 'μmol/L',
    explanation: `Scr mg/dL × ${SCR_FACTOR}.`,
    disclaimer: DISCLAIMER_CALC,
    version: CONV_SCR_VERSION,
  };
}

export function scrUmolLToMgDl(umolL: number): CalcResult<number> {
  if (umolL < 0) throw new RangeError('Scr negativa.');
  return {
    value: Math.round((umolL / SCR_FACTOR) * 100) / 100,
    unit: 'mg/dL',
    explanation: `Scr μmol/L ÷ ${SCR_FACTOR}.`,
    disclaimer: DISCLAIMER_CALC,
    version: CONV_SCR_VERSION,
  };
}

export function mGyToMsv(mGy: number, factorWr = 1): CalcResult<number> {
  if (mGy < 0) throw new RangeError('Dosis negativa.');
  return {
    value: Math.round(mGy * factorWr * 100) / 100,
    unit: 'mSv',
    explanation: `mSv = mGy × factor W_R (${factorWr}). Para rayos X y fotones: W_R = 1.`,
    disclaimer: DISCLAIMER_CALC,
    version: CONV_DOSE_VERSION,
  };
}
