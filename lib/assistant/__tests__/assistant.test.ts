import { sugerirExamenes, ASISTENTE_VERSION } from '../index';

describe('Asistente — reglas clínicas', () => {
  test('dolor torácico + disnea → AngioTAC tórax urgente', () => {
    const r = sugerirExamenes({
      edad: 68,
      sexo: 'M',
      sintomas: ['dolor torácico', 'disnea'],
    });
    const angio = r.sugeridos.find((e) => e.modalidad === 'angioTAC');
    expect(angio).toBeDefined();
    expect(angio?.prioridad).toBe('urgente');
    expect(r.sugeridos.some((e) => e.estudio.includes('Rx tórax'))).toBe(true);
  });

  test('TEC con pérdida de conciencia → TAC cerebro', () => {
    const r = sugerirExamenes({
      edad: 40,
      sexo: 'M',
      sintomas: ['cabeza', 'pérdida de conciencia'],
      modifiers: { trauma: true },
    });
    expect(r.sugeridos.some((e) => e.estudio.includes('TAC de cerebro'))).toBe(true);
  });

  test('lumbago >50 con fiebre → RM lumbar prioritaria', () => {
    const r = sugerirExamenes({
      edad: 62,
      sexo: 'F',
      sintomas: ['dolor lumbar'],
      modifiers: { fiebre: true },
    });
    expect(r.sugeridos.some((e) => e.estudio.includes('RM columna lumbar'))).toBe(true);
  });

  test('abdomen agudo en embarazo → eco primero, sin TAC', () => {
    const r = sugerirExamenes({
      edad: 28,
      sexo: 'F',
      sintomas: ['dolor abdominal'],
      modifiers: { embarazo: true },
    });
    expect(r.sugeridos[0].modalidad).toBe('eco');
    expect(r.sugeridos.some((e) => e.modalidad === 'tac')).toBe(false);
  });

  test('abdomen agudo con ERC → advierte alternativa sin contraste', () => {
    const r = sugerirExamenes({
      edad: 70,
      sexo: 'M',
      sintomas: ['dolor abdominal'],
      modifiers: { erc: true },
    });
    const tac = r.sugeridos.find((e) => e.modalidad === 'tac');
    expect(tac?.precaucion).toMatch(/ERC/);
  });

  test('trauma de rodilla → Rx AP + Lateral', () => {
    const r = sugerirExamenes({
      edad: 22,
      sexo: 'F',
      sintomas: ['rodilla'],
      modifiers: { trauma: true },
    });
    expect(r.sugeridos[0].estudio).toMatch(/Rx rodilla/);
  });

  test('cefalea en trueno → TAC sin contraste urgente', () => {
    const r = sugerirExamenes({
      edad: 45,
      sexo: 'F',
      sintomas: ['cefalea súbita'],
    });
    expect(r.sugeridos[0].estudio).toMatch(/TAC de cerebro/);
    expect(r.sugeridos[0].prioridad).toBe('urgente');
  });

  test('sin match → devuelve sugeridos vacíos con razonamiento', () => {
    const r = sugerirExamenes({
      edad: 30,
      sexo: 'M',
      sintomas: ['rinorrea'],
    });
    expect(r.sugeridos).toEqual([]);
    expect(r.razonamiento).toMatch(/No se encontró/);
  });

  test('entrada inválida lanza error', () => {
    expect(() => sugerirExamenes({ edad: -1, sexo: 'M', sintomas: ['x'] })).toThrow(RangeError);
    expect(() => sugerirExamenes({ edad: 30, sexo: 'M', sintomas: [] })).toThrow();
  });

  test('incluye disclaimer + versión', () => {
    const r = sugerirExamenes({ edad: 30, sexo: 'M', sintomas: ['dolor torácico'] });
    expect(r.version).toBe(ASISTENTE_VERSION);
    expect(r.disclaimer).toBeTruthy();
  });
});
