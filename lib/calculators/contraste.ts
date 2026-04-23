import { CalcResult, DISCLAIMER_CALC } from './types';

export interface ContrasteAdultoInput {
  pesoKg: number;
  eGFR: number;
}

export const CONTRASTE_VERSION = 'Contraste-Adulto-2026-v1';
export const CONTRASTE_MIN_ML = 50;
export const CONTRASTE_MAX_ML = 150;

export function contrasteAdulto({ pesoKg, eGFR }: ContrasteAdultoInput): CalcResult<number> {
  if (pesoKg <= 0 || pesoKg > 300) throw new RangeError('Peso fuera de rango (0-300 kg).');
  if (eGFR < 0 || eGFR > 200) throw new RangeError('eGFR fuera de rango.');

  let mlKg: number;
  let escala: string;
  if (eGFR >= 60) {
    mlKg = 1.0;
    escala = 'función renal normal (eGFR ≥ 60)';
  } else if (eGFR >= 30) {
    mlKg = 0.8;
    escala = 'función renal reducida (eGFR 30-59)';
  } else {
    mlKg = 0.5;
    escala = 'ERC severa (eGFR < 30)';
  }

  const bruto = pesoKg * mlKg;
  const clamped = Math.min(Math.max(bruto, CONTRASTE_MIN_ML), CONTRASTE_MAX_ML);
  const warnings: string[] = [];
  if (bruto < CONTRASTE_MIN_ML) warnings.push(`Dosis calculada ${Math.round(bruto)} mL < mínimo técnico ${CONTRASTE_MIN_ML} mL: se usa el mínimo.`);
  if (bruto > CONTRASTE_MAX_ML) warnings.push(`Dosis calculada ${Math.round(bruto)} mL > máximo seguro ${CONTRASTE_MAX_ML} mL: se usa el máximo.`);
  if (eGFR < 30) warnings.push('ERC severa: evaluar alternativa sin contraste o premedicación según protocolo.');

  return {
    value: Math.round(clamped),
    unit: 'mL',
    explanation: `${mlKg} mL/kg × ${pesoKg} kg ajustado por ${escala}.`,
    warnings,
    disclaimer: DISCLAIMER_CALC,
    version: CONTRASTE_VERSION,
  };
}
