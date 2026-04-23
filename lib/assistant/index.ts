import { DISCLAIMER_CALC } from '../calculators/types';

export type AsistenteModality =
  | 'rx'
  | 'tac'
  | 'rm'
  | 'eco'
  | 'angioTAC'
  | 'eco_doppler'
  | 'laboratorio';

export type AsistentePriority = 'urgente' | 'prioritario' | 'diferido';

export interface AsistenteExamen {
  modalidad: AsistenteModality;
  estudio: string;
  prioridad: AsistentePriority;
  justificacion: string;
  precaucion?: string;
}

export interface AsistenteInput {
  edad: number;
  sexo: 'M' | 'F';
  sintomas: string[];
  modifiers?: {
    trauma?: boolean;
    fiebre?: boolean;
    embarazo?: boolean;
    erc?: boolean;
    alergia_contraste?: boolean;
  };
}

export interface AsistenteResult {
  sugeridos: AsistenteExamen[];
  razonamiento: string;
  disclaimer: string;
  version: string;
}

export const ASISTENTE_VERSION = 'Asistente-LookUp-v1';

type Rule = {
  id: string;
  match: (i: AsistenteInput) => boolean;
  build: (i: AsistenteInput) => AsistenteExamen[];
  razonamiento: string;
};

const has = (list: string[], ...needles: string[]) =>
  needles.every((n) => list.some((s) => s.toLowerCase().includes(n.toLowerCase())));

const any = (list: string[], ...needles: string[]) =>
  needles.some((n) => list.some((s) => s.toLowerCase().includes(n.toLowerCase())));

const RULES: Rule[] = [
  {
    id: 'dolor_toracico_agudo',
    match: (i) => has(i.sintomas, 'dolor torácico') || has(i.sintomas, 'dolor toracico'),
    razonamiento:
      'Dolor torácico agudo: descartar síndrome coronario, TEP y patología aórtica antes de imagen avanzada.',
    build: (i) => {
      const exams: AsistenteExamen[] = [
        {
          modalidad: 'rx',
          estudio: 'Rx tórax PA + Lateral',
          prioridad: 'urgente',
          justificacion: 'Descartar neumotórax, derrame, ensanchamiento mediastínico.',
        },
        {
          modalidad: 'laboratorio',
          estudio: 'ECG + troponina',
          prioridad: 'urgente',
          justificacion: 'Evaluar SCA antes de imagen avanzada.',
        },
      ];
      if (any(i.sintomas, 'disnea', 'taquicardia', 'hemoptisis')) {
        exams.push({
          modalidad: 'angioTAC',
          estudio: 'AngioTAC de tórax (protocolo TEP)',
          prioridad: 'urgente',
          justificacion: 'Alta sospecha de tromboembolismo pulmonar.',
          precaucion: i.modifiers?.erc
            ? 'ERC: ajustar dosis de contraste o evaluar V/Q.'
            : 'Hidratación previa. Verificar eGFR.',
        });
      }
      return exams;
    },
  },
  {
    id: 'tec_con_perdida_conciencia',
    match: (i) =>
      i.modifiers?.trauma === true &&
      any(i.sintomas, 'tec', 'cabeza', 'craneo', 'pérdida de conciencia', 'perdida de conciencia'),
    razonamiento: 'TEC con pérdida de conciencia: TAC cerebro sin contraste es el estudio de primera línea.',
    build: () => [
      {
        modalidad: 'tac',
        estudio: 'TAC de cerebro sin contraste',
        prioridad: 'urgente',
        justificacion: 'Descartar hemorragia intracraneal, fractura craneal y efecto de masa.',
      },
      {
        modalidad: 'rx',
        estudio: 'Rx columna cervical (si mecanismo de alta energía)',
        prioridad: 'urgente',
        justificacion: 'Evaluar lesión cervical asociada.',
      },
    ],
  },
  {
    id: 'lumbago_banderas_rojas',
    match: (i) =>
      any(i.sintomas, 'lumbago', 'dolor lumbar') &&
      (i.edad > 50 ||
        !!i.modifiers?.fiebre ||
        any(i.sintomas, 'pérdida de peso', 'perdida de peso', 'baja de peso')),
    razonamiento:
      'Lumbalgia con banderas rojas (>50 años, fiebre o baja de peso): estudio urgente para descartar infección, neoplasia o fractura patológica.',
    build: () => [
      {
        modalidad: 'rm',
        estudio: 'RM columna lumbar con gadolinio',
        prioridad: 'prioritario',
        justificacion: 'Excluir espondilodiscitis, tumor o absceso epidural.',
      },
      {
        modalidad: 'rx',
        estudio: 'Rx columna lumbar AP + lateral',
        prioridad: 'diferido',
        justificacion: 'Evaluación inicial de alineación y compresión vertebral.',
      },
    ],
  },
  {
    id: 'dolor_abdominal_agudo',
    match: (i) => any(i.sintomas, 'dolor abdominal', 'abdomen agudo'),
    razonamiento:
      'Abdomen agudo en adulto: TAC abdomen-pelvis con contraste es el estudio de referencia salvo contraindicación.',
    build: (i) => {
      if (i.modifiers?.embarazo) {
        return [
          {
            modalidad: 'eco',
            estudio: 'Ecografía abdominal + pelviana',
            prioridad: 'urgente',
            justificacion: 'Primera línea en embarazo. Evitar radiación ionizante.',
          },
          {
            modalidad: 'rm',
            estudio: 'RM abdomen sin gadolinio (si duda diagnóstica)',
            prioridad: 'prioritario',
            justificacion: 'Segunda línea en embarazo.',
          },
        ];
      }
      return [
        {
          modalidad: 'tac',
          estudio: 'TAC abdomen y pelvis con contraste ev',
          prioridad: 'urgente',
          justificacion: 'Evaluar apendicitis, diverticulitis, obstrucción, perforación.',
          precaucion: i.modifiers?.erc
            ? 'ERC: considerar TAC sin contraste o RM.'
            : 'Verificar eGFR y alergia a yodado.',
        },
        {
          modalidad: 'eco',
          estudio: 'Ecografía abdominal focal',
          prioridad: 'prioritario',
          justificacion: 'Útil en sospecha biliar o renal.',
        },
      ];
    },
  },
  {
    id: 'trauma_extremidad',
    match: (i) =>
      i.modifiers?.trauma === true &&
      any(i.sintomas, 'rodilla', 'tobillo', 'muñeca', 'muneca', 'mano', 'hombro', 'cadera'),
    razonamiento:
      'Trauma de extremidad: Rx ≥2 proyecciones. Escalar a TAC si fractura compleja o afección articular.',
    build: (i) => {
      const region = ['rodilla', 'tobillo', 'muñeca', 'muneca', 'mano', 'hombro', 'cadera'].find((r) =>
        any(i.sintomas, r)
      );
      return [
        {
          modalidad: 'rx',
          estudio: `Rx ${region} AP + Lateral`,
          prioridad: 'urgente',
          justificacion: 'Estudio de primera línea en trauma.',
        },
        {
          modalidad: 'tac',
          estudio: `TAC ${region} (si duda o fractura intraarticular)`,
          prioridad: 'prioritario',
          justificacion: 'Mejor caracterización de fragmentos y extensión articular.',
        },
      ];
    },
  },
  {
    id: 'disuria_mujer',
    match: (i) =>
      i.sexo === 'F' &&
      any(i.sintomas, 'disuria', 'dolor pelviano', 'dolor pélvico', 'dolor pelvico'),
    razonamiento: 'Dolor pelviano en mujer: priorizar ecografía transvaginal por especificidad y bajo costo.',
    build: () => [
      {
        modalidad: 'eco',
        estudio: 'Ecografía transvaginal + abdominopélvica',
        prioridad: 'prioritario',
        justificacion: 'Evaluar patología anexial, uterina y vesical.',
      },
    ],
  },
  {
    id: 'cefalea_aguda_severa',
    match: (i) => any(i.sintomas, 'cefalea súbita', 'cefalea subita', 'peor cefalea', 'thunderclap'),
    razonamiento:
      'Cefalea en trueno: descartar hemorragia subaracnoidea con TAC sin contraste inmediato.',
    build: () => [
      {
        modalidad: 'tac',
        estudio: 'TAC de cerebro sin contraste',
        prioridad: 'urgente',
        justificacion: 'Primera línea para HSA.',
      },
      {
        modalidad: 'angioTAC',
        estudio: 'AngioTAC de cerebro (si TAC negativo y alta sospecha)',
        prioridad: 'urgente',
        justificacion: 'Buscar aneurisma o disección.',
      },
    ],
  },
];

export function sugerirExamenes(input: AsistenteInput): AsistenteResult {
  if (input.edad < 0 || input.edad > 120) throw new RangeError('Edad fuera de rango.');
  if (!Array.isArray(input.sintomas) || input.sintomas.length === 0) {
    throw new Error('Debe ingresar al menos un síntoma.');
  }

  const matched = RULES.filter((r) => r.match(input));
  if (matched.length === 0) {
    return {
      sugeridos: [],
      razonamiento:
        'No se encontró un protocolo estándar para la combinación ingresada. Consultar protocolos institucionales o médico tratante.',
      disclaimer: DISCLAIMER_CALC,
      version: ASISTENTE_VERSION,
    };
  }

  const sugeridos: AsistenteExamen[] = [];
  const seen = new Set<string>();
  for (const rule of matched) {
    for (const ex of rule.build(input)) {
      const key = `${ex.modalidad}:${ex.estudio}`;
      if (!seen.has(key)) {
        seen.add(key);
        sugeridos.push(ex);
      }
    }
  }

  return {
    sugeridos,
    razonamiento: matched.map((r) => r.razonamiento).join(' '),
    disclaimer: DISCLAIMER_CALC,
    version: ASISTENTE_VERSION,
  };
}
