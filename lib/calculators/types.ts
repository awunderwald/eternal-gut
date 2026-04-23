export const DISCLAIMER_CALC =
  'Herramienta de apoyo clínico. No sustituye el juicio profesional ni los protocolos institucionales. ' +
  'El tecnólogo médico es responsable del resultado final.';

export interface CalcResult<V = number> {
  value: V;
  unit: string;
  explanation: string;
  warnings?: string[];
  disclaimer: string;
  version: string;
}
