import { CalcResult, DISCLAIMER_CALC } from './types';
import type { Sexo } from '../../types';

export interface CkdEpiInput {
  edad: number;
  scrMgDl: number;
  sexo: Sexo;
}

export const CKD_EPI_VERSION = 'CKD-EPI-2021-race-free-v1';

export function ckdEpi2021({ edad, scrMgDl, sexo }: CkdEpiInput): CalcResult<number> {
  if (!Number.isFinite(edad) || edad < 18 || edad > 110) {
    throw new RangeError('Edad fuera de rango (18-110).');
  }
  if (!Number.isFinite(scrMgDl) || scrMgDl <= 0 || scrMgDl > 20) {
    throw new RangeError('Creatinina sérica fuera de rango (0-20 mg/dL).');
  }

  const kappa = sexo === 'F' ? 0.7 : 0.9;
  const alpha = sexo === 'F' ? -0.241 : -0.302;
  const ratio = scrMgDl / kappa;
  const min = Math.min(ratio, 1);
  const max = Math.max(ratio, 1);

  let eGFR =
    142 * Math.pow(min, alpha) * Math.pow(max, -1.2) * Math.pow(0.9938, edad);
  if (sexo === 'F') eGFR *= 1.012;

  const rounded = Math.round(eGFR);
  const warnings: string[] = [];
  if (rounded < 30) warnings.push('ERC avanzada: ajustar/contraindicar contraste yodado según protocolo.');
  else if (rounded < 60) warnings.push('Función renal reducida: considerar dosis mínima de contraste.');

  return {
    value: rounded,
    unit: 'mL/min/1.73m²',
    explanation: `CKD-EPI 2021 sin factor raza · Scr ${scrMgDl} mg/dL · ${sexo === 'F' ? 'mujer' : 'hombre'} ${edad} años`,
    warnings,
    disclaimer: DISCLAIMER_CALC,
    version: CKD_EPI_VERSION,
  };
}
