-- Seed de 10 guías de Rayos X iniciales
-- Parámetros basados en SERAM / ACR 2024 + práctica chilena.
-- El TM siempre ajusta según equipo y paciente. Valores son punto de partida.

insert into public.guides (category, title, slug, content, is_premium) values
  ('rayos', 'Tórax PA', 'torax-pa', jsonb_build_object(
    'posicion', 'Bipedestación frente al bucky. Mentón elevado, hombros descendidos y rotados anteriormente para alejar escápulas. Manos en dorso de la cresta ilíaca.',
    'dfp', '180 cm',
    'receptor', 'Chasis 35×43 cm vertical',
    'rayo_central', 'Perpendicular, a la altura de T7 (ángulo inferior de escápula)',
    'kvp', '120',
    'mas', '4',
    'colimacion', 'Ajustada al tórax dejando 1 cm de margen',
    'respiracion', 'Inspiración profunda mantenida',
    'proteccion', 'Delantal gonadal si paciente en edad reproductiva',
    'criterios', jsonb_build_array(
      'Clavículas equidistantes a la columna',
      '10 arcos costales posteriores visibles sobre el diafragma',
      'Escápulas fuera del campo pulmonar',
      'Tráquea en línea media',
      'Ángulos costofrénicos incluidos',
      'Mediastino y silueta cardíaca nítidos',
      'Sin rotación (cabezas claviculares simétricas)'
    ),
    'notas', 'Si no se logra inspiración: pedir segunda exposición antes de reprocesar. En gestantes solo con justificación y con delantal plomado abdomino-pelviano.'
  ), false),

  ('rayos', 'Tórax Lateral izquierdo', 'torax-lateral', jsonb_build_object(
    'posicion', 'De pie, costado izquierdo contra bucky. Brazos elevados sobre la cabeza, tomados con la mano del otro lado.',
    'dfp', '180 cm',
    'receptor', 'Chasis 35×43 cm vertical',
    'rayo_central', 'Perpendicular, a la altura de T7',
    'kvp', '120',
    'mas', '8',
    'colimacion', 'Desde C7 hasta el final de las bases pulmonares',
    'respiracion', 'Inspiración profunda mantenida',
    'criterios', jsonb_build_array(
      'Superposición de arcos costales posteriores',
      'Esternón de perfil',
      'Espacio retrocardíaco y retroesternal visibles',
      'Sin superposición de brazos sobre campos pulmonares'
    ),
    'notas', 'Complementa la PA para lesiones retrocardíacas y derrames pequeños.'
  ), false),

  ('rayos', 'Abdomen simple supino', 'abdomen-simple-supino', jsonb_build_object(
    'posicion', 'Decúbito supino, brazos a los lados.',
    'dfp', '100 cm',
    'receptor', 'Chasis 35×43 cm longitudinal',
    'rayo_central', 'Perpendicular a nivel de crestas ilíacas',
    'kvp', '80',
    'mas', '40',
    'colimacion', 'Desde cúpulas diafragmáticas hasta sínfisis púbica',
    'respiracion', 'Apnea espiratoria',
    'proteccion', 'Delantal gonadal si posible sin interferir el campo',
    'criterios', jsonb_build_array(
      'Cúpulas diafragmáticas y sínfisis púbica incluidas',
      'Columna lumbar centrada',
      'Psoas visibles simétricos',
      'Sin rotación pélvica'
    ),
    'notas', 'Si abdomen agudo: sumar proyección en bipedestación o decúbito lateral izquierdo para evaluar niveles hidroaéreos y neumoperitoneo.'
  ), false),

  ('rayos', 'Columna cervical AP', 'columna-cervical-ap', jsonb_build_object(
    'posicion', 'De pie o sentado, espalda contra bucky. Mentón elevado ligeramente.',
    'dfp', '100 cm',
    'receptor', 'Chasis 18×24 cm vertical',
    'rayo_central', 'Angulado 15-20° cefálico, dirigido a C4 (cartílago tiroides)',
    'kvp', '75',
    'mas', '20',
    'colimacion', 'Desde base del cráneo hasta T1',
    'respiracion', 'Apnea',
    'criterios', jsonb_build_array(
      'Visualización de C3 a T1',
      'Procesos espinosos en línea media',
      'Espacios discales abiertos',
      'Sin superposición de la mandíbula sobre las vértebras'
    ),
    'notas', 'En trauma mantener inmovilización cervical. Complementar con odontoides y lateral.'
  ), false),

  ('rayos', 'Columna cervical Lateral', 'columna-cervical-lateral', jsonb_build_object(
    'posicion', 'De pie, hombro en contacto con bucky. Mentón elevado. Hombros deprimidos (tracción manual si necesario para ver C7).',
    'dfp', '180 cm',
    'receptor', 'Chasis 18×24 cm vertical',
    'rayo_central', 'Perpendicular a C4',
    'kvp', '75',
    'mas', '15',
    'colimacion', 'Base del cráneo a T1',
    'criterios', jsonb_build_array(
      'Visualización de C1 a C7 (incluir unión cervicotorácica)',
      'Arcos posteriores superpuestos',
      'Alineación de líneas cervicales (anterior vertebral, posterior vertebral, espinolaminar)',
      'Partes blandas prevertebrales evaluables'
    ),
    'notas', 'Si no se logra ver C7: proyección del nadador (swimmer).'
  ), false),

  ('rayos', 'Rodilla AP', 'rodilla-ap', jsonb_build_object(
    'posicion', 'Decúbito supino, extremidad en extensión. Pie perpendicular al chasis. Rotación interna 5° para alinear cóndilos.',
    'dfp', '100 cm',
    'receptor', 'Chasis 24×30 cm',
    'rayo_central', 'Perpendicular, 1-2 cm bajo el polo inferior de rótula',
    'kvp', '65',
    'mas', '10',
    'colimacion', '5 cm sobre y bajo la rótula',
    'criterios', jsonb_build_array(
      'Interlínea articular abierta',
      'Rótula centrada sobre el fémur distal',
      'Cóndilos simétricos',
      'Sin rotación (cabeza del peroné parcialmente superpuesta a la tibia)'
    ),
    'notas', 'En trauma evaluar también proyección intercondílea (Rosenberg) si se buscan cuerpos libres.'
  ), false),

  ('rayos', 'Rodilla Lateral', 'rodilla-lateral', jsonb_build_object(
    'posicion', 'Decúbito lateral sobre el lado a estudiar. Rodilla flexionada 20-30°. Rodilla contralateral adelantada.',
    'dfp', '100 cm',
    'receptor', 'Chasis 24×30 cm',
    'rayo_central', 'Angulado 5° cefálico, 2 cm bajo el polo inferior de rótula',
    'kvp', '65',
    'mas', '12',
    'criterios', jsonb_build_array(
      'Cóndilos femorales superpuestos',
      'Interlínea fémoro-tibial abierta',
      'Patela de perfil',
      'Fondo de saco suprapatelar visible (evaluar derrame)'
    )
  ), false),

  ('rayos', 'Mano PA', 'mano-pa', jsonb_build_object(
    'posicion', 'Sentado, antebrazo y mano sobre la mesa, palma hacia abajo. Dedos separados.',
    'dfp', '100 cm',
    'receptor', 'Chasis 24×30 cm',
    'rayo_central', 'Perpendicular a la cabeza del 3er metacarpiano',
    'kvp', '55',
    'mas', '2.5',
    'criterios', jsonb_build_array(
      'Falanges sin superposición',
      'Cabeza de metacarpianos separadas',
      'Articulaciones metacarpofalángicas abiertas',
      'Escafoides parcialmente escorzado'
    ),
    'notas', 'Completar con oblicua. Para escafoides usar proyecciones dedicadas.'
  ), false),

  ('rayos', 'Cadera AP', 'cadera-ap', jsonb_build_object(
    'posicion', 'Decúbito supino, extremidades en extensión. Pies rotados internamente 15° para proyectar cuello femoral en su máxima longitud.',
    'dfp', '100 cm',
    'receptor', 'Chasis 35×43 cm',
    'rayo_central', 'Perpendicular, 2.5 cm distal al punto medio entre EIAS y sínfisis púbica',
    'kvp', '80',
    'mas', '25',
    'colimacion', 'Incluir articulación coxofemoral y tercio proximal del fémur',
    'proteccion', 'Gonadal en varones si no interfiere el campo',
    'criterios', jsonb_build_array(
      'Cuello femoral sin escorzo',
      'Trocánter mayor de perfil, menor poco visible',
      'Articulación coxofemoral abierta',
      'Pelvis sin rotación (forámenes obturadores simétricos)'
    ),
    'notas', 'En fractura sospechada NO rotar internamente. Agregar proyección axial (cross-table lateral).'
  ), false),

  ('rayos', 'Sacroilíaca oblicua', 'sacroiliaca-oblicua', jsonb_build_object(
    'posicion', 'Decúbito supino. Rotar el lado a estudiar 25-30° arriba con apoyo bajo la nalga.',
    'dfp', '100 cm',
    'receptor', 'Chasis 24×30 cm',
    'rayo_central', 'Perpendicular, 2.5 cm medial a la EIAS elevada',
    'kvp', '80',
    'mas', '30',
    'criterios', jsonb_build_array(
      'Articulación sacroilíaca abierta y perfilada',
      'Ala sacra visible',
      'Sin superposición con pala ilíaca del lado contralateral'
    ),
    'notas', 'Sospecha de espondiloartritis: sumar oblicua contralateral. Considerar RM si Rx normal y clínica sugerente.'
  ), false);
