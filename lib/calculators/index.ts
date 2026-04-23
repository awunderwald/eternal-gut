export * from './types';
export * from './ckd-epi';
export * from './cockcroft-gault';
export * from './contraste';
export * from './vejiga';
export * from './rt-dose';
export * from './antropometria';
export * from './conversiones';

import { ckdEpi2021 } from './ckd-epi';
import { cockcroftGault } from './cockcroft-gault';
import { contrasteAdulto } from './contraste';
import { volumenVejiga } from './vejiga';
import { eqd2 } from './rt-dose';
import { bmi, bsaMosteller } from './antropometria';
import { scrMgDlToUmolL } from './conversiones';

export interface CalculatorMeta {
  id: string;
  titulo: string;
  categoria: 'funcion_renal' | 'contraste' | 'ecografia' | 'radioterapia' | 'antropometria' | 'conversiones';
  descripcion: string;
  isPremium: boolean;
}

export const CALCULATORS: CalculatorMeta[] = [
  { id: 'ckd-epi-2021', titulo: 'TFG (CKD-EPI 2021)', categoria: 'funcion_renal', descripcion: 'eGFR sin factor raza, recomendado LatAm 2026.', isPremium: false },
  { id: 'cockcroft-gault', titulo: 'Cockcroft-Gault', categoria: 'funcion_renal', descripcion: 'Depuración de creatinina clásica.', isPremium: false },
  { id: 'contraste-adulto', titulo: 'Contraste adulto', categoria: 'contraste', descripcion: 'Volumen seguro según peso y eGFR.', isPremium: false },
  { id: 'volumen-vejiga', titulo: 'Volumen vejiga', categoria: 'ecografia', descripcion: 'Fórmula elipsoide (cm → mL).', isPremium: false },
  { id: 'eqd2', titulo: 'EQD2 (RT)', categoria: 'radioterapia', descripcion: 'Equivalencia biológica a 2 Gy/fracción.', isPremium: false },
  { id: 'bmi', titulo: 'IMC', categoria: 'antropometria', descripcion: 'Índice de masa corporal OMS.', isPremium: false },
  { id: 'bsa', titulo: 'Superficie corporal', categoria: 'antropometria', descripcion: 'Mosteller (m²).', isPremium: false },
  { id: 'conv-creatinina', titulo: 'Conversión creatinina', categoria: 'conversiones', descripcion: 'mg/dL ↔ μmol/L.', isPremium: false },
];

export const CALCULATOR_HANDLERS = {
  'ckd-epi-2021': ckdEpi2021,
  'cockcroft-gault': cockcroftGault,
  'contraste-adulto': contrasteAdulto,
  'volumen-vejiga': volumenVejiga,
  eqd2,
  bmi,
  bsa: bsaMosteller,
  'conv-creatinina': scrMgDlToUmolL,
} as const;
