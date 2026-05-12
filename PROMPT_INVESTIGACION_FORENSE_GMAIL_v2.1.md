# PROMPT DE INVESTIGACIÓN FORENSE GMAIL v2.1 — PROYECTO FINANZAS ANDRÉS WUNDERWALD

> **Cambios v2.0 → v2.1:**
>
> - Revisión obligatoria de TODOS los archivos adjuntos cuando existan
> - Procedimiento para abrir PDFs encriptados (clave en el cuerpo del email)
> - Patrones típicos de contraseñas de bancos chilenos
> - Inclusión de queries `has:attachment` en búsquedas relevantes
> - Columna "Adjuntos revisados" en formato de output

> **Instrucciones de uso:**
>
> 1. Abrir un chat NUEVO en Claude.ai dentro del proyecto "Finanzas Andrés".
> 2. Confirmar que el conector Gmail está habilitado (Settings → Connectors).
> 3. Adjuntar al chat los archivos base del proyecto en este orden estricto:
>    a) `INSTRUCCIONES_PROYECTO_FINANZAS_v2.md` (reglas operativas — primero)
>    b) `INFORME_BASE_DATOS_FINAL_v3.0.md` (contexto del caso — segundo)
>    c) `finanzas_andres_v2.0.xlsx` (base cuantitativa — tercero)
> 4. Copiar y pegar como primer mensaje el bloque completo entre "INICIO PROMPT" y "FIN PROMPT".
> 5. Esperar el reporte forense estructurado.

---

## INICIO PROMPT

Hola Claude. Soy Andrés Wunderwald. Vas a hacer una **investigación forense exhaustiva nivel máximo** de mi Gmail (andres.wunderwald@gmail.com) para el proyecto de coaching financiero que ya tienes cargado en los archivos del proyecto. Lee primero `INSTRUCCIONES_PROYECTO_FINANZAS_v2.md` para las reglas operativas, luego `INFORME_BASE_DATOS_FINAL_v3.0.md` para el contexto completo, y después ejecuta esta investigación.

### REGLAS INVIOLABLES (idénticas al resto del proyecto)

1. **Pacto de Honestidad Radical activo.** Etiqueta cada hallazgo:
   - `[DATO REAL + fuente: email asunto/fecha/remitente]`
   - `[CÁLCULO]` si derivas un número
   - `[INFERENCIA]` si interpretas algo sin confirmación
   - `[NO SÉ]` si no encuentras evidencia
2. **No inventes.** Si una búsqueda no devuelve resultados, declara explícitamente "sin resultados en Gmail".
3. **No omitas información incómoda.** Si encuentras algo que contradiga lo que ya está registrado en el informe, declárelo de frente.
4. **No me pidas permiso para buscar.** Tienes mi autorización explícita por este prompt para hacer TODAS las búsquedas listadas y cualquier búsqueda adicional que el contexto justifique.
5. **No transmitas mi info personal fuera del chat.** No envíes emails, no compartas docs, no exportes a terceros. Solo reportar a mí en este chat.
6. **Privacidad clínica:** ignora completamente cualquier email con información clínica de pacientes míos (estoy obligado por secreto profesional). Si aparecen en búsquedas, descártalos y no los menciones.

### REVISIÓN OBLIGATORIA DE ARCHIVOS ADJUNTOS

Este punto es crítico. La mayor parte de la información valiosa (contratos, estados de cuenta, escrituras, balances, pólizas, tablas de amortización, propuestas de consolidación) vive en archivos adjuntos, NO en el cuerpo del email. Por lo tanto:

**1. Procesamiento obligatorio.** Para cada email relevante que encuentres, revisa SIEMPRE si tiene adjuntos. Si los tiene, ábrelos, léelos completos y extrae los datos relevantes. Esto aplica a todos los formatos: PDF, Excel (.xls/.xlsx), Word (.doc/.docx), imágenes (.jpg/.png/.pdf de fotos), archivos comprimidos (.zip/.rar) cuando contengan documentos financieros, y archivos de texto plano.

**2. PDFs encriptados — clave en el cuerpo del email.** En Chile, los bancos casi siempre envían estados de cuenta, contratos y comprobantes como PDF protegidos con contraseña. **La clave está en el cuerpo del mismo email**, generalmente con frases como "el PDF se abre con", "tu clave de acceso es", "ingresa tu RUT sin puntos ni guion", etc. Lee SIEMPRE el cuerpo del email antes de intentar abrir el adjunto.

**3. Patrones típicos de contraseñas en bancos chilenos.** Mi RUT es **16.469.922-6**. Las contraseñas suelen ser una de estas combinaciones:

- RUT completo sin puntos ni guion: `164699226`
- RUT sin puntos con guion: `16469922-6`
- Solo cuerpo del RUT sin dígito verificador: `16469922`
- Solo dígito verificador: `6`
- Últimos 4 dígitos del RUT: `9226`
- Primeros 4 dígitos del RUT: `1646`
- Combinación de fecha de nacimiento + RUT (si no la sabes, búscala en el cuerpo del email)
- Número de cuenta corriente o tarjeta de crédito (también suele venir mencionado)

Si la clave no es obvia en el cuerpo, prueba en orden los patrones listados arriba. Si tras agotar las combinaciones no logras abrir el PDF, registra el adjunto en una sección final "Adjuntos no procesables" para que yo lo abra manualmente y te devuelva el contenido.

**4. Excel y Word.** Cuando encuentres adjuntos .xlsx o .docx, revisa todas las pestañas y secciones, no solo la primera. Los balances tributarios, tablas de amortización y propuestas de consolidación suelen tener información clave en pestañas posteriores.

**5. Imágenes.** Si encuentras fotos de contratos, facturas físicas o pantallazos, descríbelas con detalle y extrae todos los datos legibles. Para PANORAMA CHILE, esto puede ser crucial si la promesa "sin intereses" quedó en una foto del vendedor o en un PDF de cotización.

**6. Queries con adjuntos.** Cuando ejecutes búsquedas en Gmail, prioriza queries que incluyan el operador `has:attachment` para emails relevantes, especialmente en los bloques 1 (contratos bancarios), 5 (tributario), 6 (inmueble) y 9 (documentos legales).

### VENTANA TEMPORAL DE BÚSQUEDA

Aplica esta jerarquía temporal a tus búsquedas:

- **Default:** últimos **24 meses** (mayo 2024 → mayo 2026) para gastos recurrentes, suscripciones, mensajes bancarios habituales, transferencias, cargos a aclarar.
- **Ventana ampliada de 5 años** (mayo 2021 → mayo 2026) para: contratos hipotecarios, escritura de Teresa Vial 1139 dpto 1504, contratos de seguros con vigencia plurianual, fundación y constitución de Servicios Médicos Quirúrgicos SpA, reclamos previos a SERNAC/CMF, demandas civiles o laborales, pensiones alimenticias, avales firmados.
- **Sin límite temporal** para: cualquier documento legal (escrituras, sentencias, mediaciones, convenios) y cualquier compromiso de aval o garantía vigente, aunque haya sido firmado hace más de 5 años.

Cuando reportes un hallazgo, indica la ventana temporal usada para encontrarlo.

### PROTOCOLO DE INTERRUPCIÓN CONTROLADA

Si durante la investigación encuentras cualquiera de los siguientes hallazgos —que califican como **ALERTA ROJA**—, **detén inmediatamente la investigación** y reportámelo antes de seguir con el siguiente bloque:

1. **Deuda oculta superior a $5.000.000** que no figure en el inventario actual del Informe Base v3.0 (secciones 4.A, 4.B, 4.C).
2. **Demanda activa o pendiente** (civil, laboral, comercial, juzgado de policía local) en mi contra o iniciada por mí.
3. **Embargo, medida precautoria o retención judicial** vigente sobre cuentas, bienes o sueldo.
4. **Aval o codeudoría firmada** que yo no haya mencionado, especialmente si está vigente.
5. **Pensión alimenticia** activa o adeudada (pasada o presente).
6. **Notificación DICOM, Equifax o Boletín Comercial** reciente (últimos 12 meses).
7. **Indicio de fraude** (suplantación, cargos no reconocidos por montos relevantes, accesos no autorizados a cuentas, phishing exitoso).
8. **Notificación del SII** por fiscalización, giro, requerimiento o multa que comprometa el acuerdo de pago mínimo vigente hasta septiembre 2026.

Cuando detectes una alerta roja:

- Reporta el hallazgo en un bloque separado titulado "🚨 ALERTA ROJA — INTERRUPCIÓN".
- Indica claramente bloque y subbloque donde ibas.
- Espera mi confirmación explícita ("continúa") antes de retomar la investigación.
- No mezcles esta alerta con el reporte normal del bloque en curso.

Para hallazgos importantes pero no calificados como alerta roja, continúa la investigación normalmente y agrégalos a la sección F del reporte final.

### OBJETIVO

Encontrar TODO lo que yo no te he contado por sesgo, olvido, vergüenza, costumbre o porque "no me parecía importante". Especialmente:

- **Deudas/compromisos** que no figuran en mi inventario actual
- **Datos contractuales** de deudas conocidas (CAE, plazo, cuotas exactas)
- **Cargos recurrentes** que no he detectado
- **Reclamos pasados** o disputas con bancos/comercios
- **Documentos clave** que viven solo en mi correo (y específicamente en adjuntos)
- **Compromisos futuros** (pagos diferidos, garantías, avales)
- **Posibles ingresos** olvidados o irregulares
- **Patrones de comportamiento** que solo se ven con perspectiva multi-año

Vas a actuar como **auditor forense + investigador privado + abogado financiero**. Nivel paranoide. Si hay un detalle anormal, lo encuentras. Si está en un adjunto encriptado, lo desencriptas y lo lees.

---

## BLOQUE 1 — CONTRATOS Y DOCUMENTOS BANCARIOS (CRÍTICO)

Busca en Gmail y reporta para cada uno: existencia (sí/no), fecha del email, asunto, remitente, **si hay PDF adjunto (revisarlo obligatoriamente)**, y los datos clave del contrato. Aplica ventana ampliada de 5 años para contratos originales. **Usa `has:attachment` en las queries.**

### 1.1 Santander

- Contrato **Crédito Consumo 1826** — busca: monto original, fecha de otorgamiento, CAE, tasa, plazo, número de cuotas, primer vencimiento. Queries sugeridas: `from:santander contrato crédito consumo has:attachment`, `santander 1826`, `mutuo dinero consumo`, `cuotas mensuales $1.328.006`
- Contrato **Crédito Comercial SpA 420051579886** (otorgado 07/05/2026, $3.750.000) — tasa, plazo, primer vencimiento, tabla amortización (probablemente en Excel adjunto)
- Contrato **Hipotecario 1008** (Teresa Vial 1139 dpto 1504) — tasa, dividendo desglosado, seguro desgravamen, primer dividendo pagado. La escritura debe estar como PDF adjunto.
- Contrato **LCA empresa 002986917** — tasa, condiciones
- Contrato **Línea Crédito Personal Santander** $3.000.000 — tasa, condiciones
- Cualquier **traspaso a cuotas** de la TC Worldmember 5807 (especialmente el del 04/04/2026 por $3.667.520) — confirmar tasa
- Aumentos/disminuciones de cupo en TC o LC últimos 12 meses
- **Estados de cuenta PDF mensuales** de TC Worldmember, cta cte personal, cta cte SpA — TODOS encriptados típicamente con RUT

### 1.2 Banco de Chile

- Toda comunicación con **Mónica Jeannette Aqueveque Pontigo** (maqueveque@bancochile.cl) — `from:maqueveque@bancochile.cl OR to:maqueveque@bancochile.cl`
- Toda comunicación con **Carolina Beatriz Aliste Carren** (Banca Preferencial)
- Propuesta de **compra de cartera $94,4MM** — buscar PDF original adjunto, tasa exacta (¿0,79% mensual o anual? necesito confirmación), CAE oficial, condiciones, vigencia, cláusulas finas
- Contrato **LC personal BCh** — tasa, condiciones
- Cualquier otra oferta del BCh (refinanciamiento, ampliación, productos cruzados)
- **Cartolas BCh mensuales** — buscar adjuntos `has:attachment from:bancochile`

### 1.3 TENPO

- Contrato **TC TENPO 4098** — CAE, condiciones, política de cuotas
- **Estados de cuenta mensuales** TENPO 2025-2026 completos (PDFs adjuntos, posiblemente encriptados)
- Información sobre **Mercado Pago 4 Tcom** cuota $2.130.574 (¿qué fue la compra original?)
- Información sobre **Otrospagos.com** $106.638/mes (¿qué servicio?)
- Información sobre **Encuadrado** $39.405/mes + cargo anómalo **SUMUP*ENCUADRADO $120.000** (marzo 2026)
- **Pago De Servicios Tenpo** $54.430 (09/05/2026) — ¿comisión recurrente?

### 1.4 MACH (BCI)

- Contrato **MACH TC ****2970/2966** — condiciones, política cuotas, qué pasó con tarjetas anteriores ****5872/****1524
- **PANORAMA CHILE** ⚠️ CRÍTICO: busca TODO lo relacionado — cotización original (probablemente PDF), contrato, factura, comunicación promesa "sin intereses", emails con vendedor, garantía, instalación, fotos. Compra del 24/12/2025 por $7.826.521. Es el reclamo más importante abierto. **Cualquier adjunto que mencione "sin intereses" o "cuotas sin recargo" es prueba clave.**
- **EBN HOTMART** — 3 compras en MACH: $390.979 (28/12/2025), $1.142.566 (12/01/2026), $1.530.000 total. ¿Qué cursos exactamente? Buscar emails de Hotmart con detalles de los cursos comprados (Hotmart suele enviar PDF de factura/comprobante).
- **ALO** $231.250 (27/12/2025) — ¿qué fue?
- **UPAGO** $51.074 (24/01/2026) — identificar
- **ARIA - TU AGENCIA IA** $25.971 — ¿suscripción adicional IA?
- **Estados de cuenta MACH mensuales** — adjuntos PDF

### 1.5 Scotiabank (Karla — D-IND-01)

- Cualquier email recibido sobre el crédito conjunto contraído con Karla (puede estar dirigido a Karla pero copiado a mí, o en mi bandeja como aval/codeudor)
- Buscar: `scotiabank`, `crédito karla`, `del río lobos`, `codeudor`, `from:scotiabank has:attachment`
- Si hay comunicaciones del banco para Karla en mi correo, eso revelaría que soy aval/codeudor (cambia mi exposición legal — calificaría como ALERTA ROJA)
- Identificar año del crédito, monto original, plazo, cuotas restantes, CAE
- **Cualquier PDF adjunto del Scotiabank es altamente valioso** — el contrato original definirá si soy aval o no

---

## BLOQUE 2 — SEGUROS (potencial mina de oro de gastos no rastreados)

### 2.1 Seguros identificados a verificar

- **METLIFE CHILE SEGUROS** $904.605 (06/03/2026, TC Santander) — ¿qué póliza? ¿vida, salud, AVI, desgravamen, complementario? Buscar `from:metlife has:attachment`
- **SEG AUTO SANTANDER** $43.756/mes — póliza completa, vigencia, condiciones de cancelación
- **CONSEJO-TRANSDATA** $201.577/mes — ¿Colegio Médico Chile, Fondo Solidario Gremial, o seguro complementario padres? Identificar inequívocamente
- **Flow Colmena Seguro** $118.027/mes — qué cubre, vigencia
- **PAC Seg Fraude SpA** 9001118979 $7.170/mes — utilidad real

### 2.2 Seguros que podría tener y no haber mencionado

Buscar agresivamente con ventana ampliada (5 años, ya que pólizas pueden ser plurianuales):

- Seguro de vida personal (otro distinto a desgravamen hipotecario)
- Seguro complementario de salud (suplementario al ISAPRE)
- Seguro escolar/médico de la **hija**
- Seguro de hogar/contenido depto Teresa Vial
- Seguro de **responsabilidad civil profesional médica** (obligatorio para muchos cirujanos)
- Seguros agrupados Colegio Médico (típicamente vienen empaquetados)
- Seguros oncológicos o de enfermedades graves
- Seguro de cesantía/desempleo
- Seguros de viaje internacionales recurrentes
- AVI (Asistencia en Viaje Internacional)
- Cualquier "póliza" con vigencia plurianual que yo no esté tracking

Queries: `póliza has:attachment`, `seguro de`, `prima mensual`, `vencimiento póliza`, `renovación seguro`, `metlife`, `chilena consolidada`, `bci seguros`, `consorcio`, `mapfre`, `liberty`, `hdi`, `zurich`

Las pólizas formales casi siempre vienen como PDF adjunto — revísalas todas.

---

## BLOQUE 3 — DEUDAS Y CRÉDITOS NO INVENTARIADOS (PUNTO CIEGO PRINCIPAL)

⚠️ **Este es el bloque más importante.** Aquí es donde aparecen las cosas que olvido o no menciono. Cualquier hallazgo de deuda superior a $5MM no inventariada en este bloque dispara ALERTA ROJA — detente y avísame.

### 3.1 Otras instituciones financieras

Buscar emails de cualquiera de estas entidades (ventana 5 años), priorizando los que traigan adjuntos:

- **Banco Estado** (cuenta RUT, BancoEstado Microempresas, créditos)
- **Banco Falabella** (CMR, créditos)
- **Banco Ripley**
- **Banco Internacional**
- **Banco Itaú**
- **Banco BICE**
- **Banco Consorcio**
- **Banco Security**
- **Coopeuch**
- **Cooperativas**
- **Cajas de Compensación** (Los Andes, La Araucana, 18 de Septiembre)
- **Fintech**: Khipu, Fintual, Racional, Buda, CryptoMarket, Lirium, OrionX, Nubank, Mach, Tenpo (ya listado), Tapp, MercadoPago, Klap
- **Casas comerciales con crédito**: Cencosud Scotiabank (Jumbo/Paris), CMR Falabella, Líder, La Polar, Hites, ABCDIN, Corona, Tricot, Dijon, Easy

### 3.2 Avales y garantías

Ventana sin límite — cualquier aval firmado en cualquier momento sigue vigente hasta su extinción.

- ¿He firmado como **aval o codeudor** de algún crédito (familia, amigos, socios)?
- ¿He **garantizado** algún arriendo, contrato comercial, deuda comercial?
- Búsqueda: `aval has:attachment`, `codeudor`, `fiador`, `garantía solidaria`, `aval simple`
- **Los avales suelen estar formalizados como PDF firmado — revisa adjuntos exhaustivamente.**
- **Cualquier aval vigente que yo no haya mencionado = ALERTA ROJA**

### 3.3 Deudas con personas (no instituciones)

- Préstamos de/a familiares: padres, hermanos, suegros
- Préstamos entre socios médicos
- **Cristobal Sali** (aparece con $303.450 + $606.900 en febrero 2026) — buscar todo
- **Sociedad de Sal** (entrada $9.254.507 en enero) — buscar todo

### 3.4 Cobranzas, demoras, DICOM

- Cualquier email de **cobranzas extrajudiciales** (Recsa, Cobranzas SP, etc.)
- Notificaciones de **mora** en cualquier banco
- Notificaciones **DICOM** / Equifax / Sinacofi / Boletín Comercial — **ALERTA ROJA si reciente (12 meses)**
- Demandas civiles de cobro — **ALERTA ROJA**
- Embargos preventivos — **ALERTA ROJA**

### 3.5 Hija — gastos no inventariados

- Colegio/jardín actual (mensualidades + matrícula + uniforme)
- Pediatra particular
- Actividades extraprogramáticas
- Plan futuro educacional (matrículas reservadas, ahorro)
- Cuenta vista de la hija (si existe)

---

## BLOQUE 4 — INGRESOS (auditoría espejo)

⚠️ Buscar ingresos que pueda tener y no haber declarado en el sistema:

### 4.1 Pagadores médicos

- **Nueva Santa** (pagador principal conocido) — confirmar nombre legal completo, frecuencia, contrato (debe haber PDF firmado)
- **Telemedicina** (~$600K/mes con boleta) — qué empresa, contrato, condiciones
- Otras clínicas/hospitales que me hayan transferido en los últimos 24 meses
- Honorarios de consultas privadas
- **Cirugías particulares** (sin clínica intermediaria)
- Peritajes médicos (juzgado, FONASA, ISAPRE)
- Asesorías a laboratorios farmacéuticos
- Capacitaciones/charlas remuneradas
- Royalties por publicaciones académicas

### 4.2 Empresa Glisodin (con Karla)

- Clientas conocidas en archivo: Caterin Reyes, Carrasco Leiva, Romero, Uribe, Damary, Elisa Neira, Cesar Valdivia
- ¿Hay otras clientas que no estén listadas?
- Facturas emitidas
- Cobros pendientes
- Costos de proveedores (Glisodin polvo, packaging, envíos)
- **SOS MI PYME** (pago inicial empresa nueva) — qué empresa exactamente

### 4.3 Otros ingresos pasivos posibles

- Arriendos cobrados (¿hay otra propiedad?)
- Dividendos de acciones/fondos
- Intereses de depósitos a plazo
- Cashback significativo
- Refunds/devoluciones grandes
- Bonos de productividad de Nueva Santa o similar
- Aguinaldos / bonos navideños / fiestas patrias

---

## BLOQUE 5 — TRIBUTARIO

⚠️ **Adjuntos críticos en este bloque.** Balances, F22, F29, carpetas tributarias — todos vienen como PDF adjunto. Revísalos exhaustivamente.

### 5.1 Mijael Robles (Contamedica)

- TODOS los emails con mijael.robles@contamedica.cl últimos 24 meses
- Balances SpA 2024 y 2025 (PDF adjunto, posiblemente Excel)
- F22 (renta anual) últimos 3 años (PDF SII)
- F29 (IVA mensual) últimos 12 meses (PDF SII)
- Carpeta tributaria personal SII (PDF)
- Carpeta tributaria SpA (PDF)
- Pago provisional mensual (PPM) histórico
- Cualquier alerta de pago o atraso
- Honorarios cobrados por Contamedica (facturas)

### 5.2 SII

- Notificaciones del SII (giros, requerimientos, fiscalizaciones) — **ALERTA ROJA si comprometen el acuerdo de pago mínimo**
- Multas SII
- Devoluciones (renta anual)
- Estado del **acuerdo de pago mínimo hasta septiembre 2026** — cualquier comunicación oficial
- Documentación del **PPM en cuotas TENPO** ($136.691/mes sin interés)

### 5.3 Cotizaciones previsionales

- PREVIRED histórico (suele venir con PDF certificado de pago)
- AFP (cuál es la mía, saldo aproximado, cuenta obligatoria + APV si hay)
- ISAPRE 12,612 UF — cuál ISAPRE, plan, beneficiarios, cargas (PDF de contrato de salud)
- Cualquier deuda con AFP, ISAPRE, Fonasa, mutualidad
- Cualquier **APV** activo

---

## BLOQUE 6 — INMUEBLE Y VIVIENDA

⚠️ **Escrituras, contratos y reglamento de copropiedad son adjuntos PDF críticos.**

### 6.1 Teresa Vial 1139 dpto 1504

Aplica ventana sin límite para escritura y contrato hipotecario originales.

- Escritura de compraventa (PDF — debe estar adjunto en algún email de la notaría o del corredor)
- Contrato hipotecario completo
- **Sala de Ventas** — promesa de compraventa (PDF), pie pagado ($20MM Santander + $241K/mes TENPO), entrega
- Pagos al condominio (administración)
- Gastos comunes históricos (PDF de la administración)
- Multas del condominio
- Contribuciones (cuotas SII)
- ENEL (electricidad)
- Aguas Andinas / sanitaria
- Gas (Lipigas, Abastible, Metrogas)
- Internet (qué proveedor, monto, plazo)
- Servicios adicionales del edificio (estacionamiento, bodega)
- Reglamento de copropiedad (PDF)

### 6.2 Otras propiedades

- ¿Tengo otro inmueble (propiedad familiar, herencia, terreno)?
- ¿Estoy pagando arriendo de otra cosa? (consultorio, oficina, bodega)

---

## BLOQUE 7 — SUSCRIPCIONES Y MENTORÍAS (ROI)

### 7.1 Cursos/mentorías activas verificar

Buscar emails de confirmación, factura y promesa de valor de:

- Universidad San Sebastián diplomado (cuál, modalidad, certificado, costo total)
- Centro Educativo Alemán curso inversión inmobiliaria
- Flow Tus Finanzas (mentoría dropshipping)
- Flow Axis Marketing (mentoría marca personal)
- Coach Social (mentoría coaching personal)
- EBN HOTMART (3 compras — qué cursos exactos)
- Cualquier otra mentoría/curso que esté pagando y no esté en lista

### 7.2 Suscripciones digitales con factura

Verificar facturas reales emitidas a SpA por:

- Apple ($143.990), Plaud.ai ($223.600), Claude.ai ($111.581), Hostinger ($25.730), Grok ($27.848), YouTube ($21.700), OpenAI ($18.718), Manychat ($14.065), Scribd ($13.435)
- ¿Las facturas están a nombre de la SpA RUT 77.753.188-3? Si están a mi nombre personal, no son deducibles.
- **Plaud.ai** $223.600 — ¿qué es exactamente? ¿lo uso? buscar emails de la plataforma con uso real

### 7.3 Suscripciones que podría tener olvidadas

Búsqueda profunda de cargos recurrentes en USD que se ven en pesos chilenos por:

- Netflix, Disney+, HBO Max, Amazon Prime, Spotify, Tidal, Deezer, Audible, Apple Music (¿separado de Apple iCloud?), Apple TV+
- Microsoft 365, Adobe Creative Cloud, Notion, Canva, Figma, Dropbox, Google One
- LinkedIn Premium, Twitter/X Premium, Coursera, Udemy, Masterclass, Skillshare
- VPN: ExpressVPN, NordVPN, Surfshark
- Servicios médicos profesionales: UpToDate, Medscape, AccessMedicine, PubMed Plus
- Software médico/quirúrgico licenciado
- Plataformas chilenas: Mercado Libre Plus, Cornershop Premium, Rappi Prime, Uber One, Pedidos Ya Plus
- iCloud familiar (¿beneficiarios?)

---

## BLOQUE 8 — TRANSACCIONES SOSPECHOSAS / ANÓMALAS

### 8.1 Transferencias grandes a verificar

- Sociedad de Sal $9.254.507 (entrada 19/01/2026) — origen, naturaleza
- Cristobal Sali transferencias múltiples febrero
- Café Talysos K $286.731 (16/01/2026 cta SpA) — ¿qué fue?
- Pago Cotizaciones Nuev $494.017 (23/01/2026 MACH) — distinto al de Santander
- SB 617 $194.494 (19/03/2026 TC Santander) — identificar
- MERPAGO*DORELJUVENILECHIL — identificar
- Cualquier transferencia >$1MM no identificada en últimos 12 meses

### 8.2 Cargos disputados o reversados

- Cualquier reverso de compra
- Cargos reclamados al banco
- Reembolsos de comercios
- Disputas con Mercado Libre/Mercado Pago

### 8.3 Patrones de gastos no obvios

- **Apuestas online** (1xBet, Bet365, casino online) — busca con cuidado
- Compras en sitios adultos (privacidad, pero registrar si afectan el flujo)
- Trading/criptomonedas (Buda, CryptoMarket, OrionX, Lirium, Binance) — saldos, pérdidas
- Donaciones recurrentes
- Cargos en USD que cambian de monto por tipo de cambio
- **Indicios de cargos no reconocidos por montos relevantes = ALERTA ROJA (posible fraude)**

---

## BLOQUE 9 — DOCUMENTOS LEGALES (potencial bomba)

Ventana sin límite temporal. **Cualquier hallazgo en este bloque tiende a calificar como ALERTA ROJA** — evalúa caso a caso. **Los documentos legales formales SIEMPRE vienen como PDF adjunto.**

- Demandas civiles, laborales, comerciales (yo como demandante o demandado) — **ALERTA ROJA si activa**
- Resoluciones judiciales
- Mediaciones
- Convenios extrajudiciales
- Notificaciones de receptores judiciales
- Comparendos
- Procesos en juzgados de policía local (multas, accidentes)
- **Pensiones alimenticias** (yo pagando o recibiendo, propias o anteriores) — **ALERTA ROJA**
- Subrogaciones
- Liquidaciones judiciales
- Reorganizaciones financieras (Ley 20.720)

Queries útiles: `from:pjud.cl`, `from:poderjudicial`, `notificación judicial has:attachment`, `demanda has:attachment`, `embargo`, `medida precautoria`

---

## BLOQUE 10 — RECLAMOS Y DISPUTAS PREVIAS (precedentes útiles)

Ventana 5 años. Los reclamos antiguos son precedentes útiles para el reclamo PANORAMA CHILE.

- Reclamos previos a **SERNAC**
- Reclamos previos a **CMF** (Comisión para el Mercado Financiero)
- Reclamos a **bancos** (defensoría del cliente, CCC)
- Reclamos a **ISAPRE / Superintendencia de Salud**
- Quejas formales a comercios
- Documentación de promesas comerciales escritas (clave para PANORAMA CHILE) — buscar especialmente fotos, capturas y PDFs adjuntos de cotizaciones

---

## BLOQUE 11 — KARLA (datos cruzados)

Con respeto a la privacidad de Karla pero relevante al panorama familiar:

- Karla del Río Lobos — emails dirigidos a ella en mi bandeja (CC, reenviados, compartidos)
- Cualquier comunicación bancaria de Karla que llegue a mi correo
- Empresa nueva en construcción con Karla — emails con proveedores, registros, RUT
- ¿Karla tiene boletas de honorarios emitidas? Si sí, eso significa ingreso formal
- ¿Karla recibe algún ingreso recurrente que yo no sepa?
- Hija — gastos médicos, escolares, recurrentes

---

## BLOQUE 12 — META: EMAILS ELIMINADOS / FILTRADOS / SPAM

⚠️ Crítico:

- Revisar **Papelera / Trash** últimos 30 días
- Revisar **Spam** últimos 60 días por emails legítimos clasificados mal (bancos, SII, comercios)
- Revisar **archivados** que no aparezcan en bandeja principal
- Revisar **filtros automáticos** que yo haya creado y puedan estar ocultando emails importantes
- Revisar **labels / etiquetas** que use

---

## FORMATO DE OUTPUT ESPERADO

Entrégame el reporte en este formato exacto:

### A) RESUMEN EJECUTIVO (máx 1 página)

- 5 hallazgos más importantes
- 3 alertas críticas
- 3 oportunidades inmediatas

### B) HALLAZGOS POR BLOQUE

Para cada bloque (1-12), una tabla:

| Item buscado | Resultado | Fuente (asunto email + fecha + remitente) | Ventana temporal | Adjuntos revisados | Datos extraídos | Etiqueta Pacto |
|---|---|---|---|---|---|---|
| … | Encontrado / No encontrado / Sin acceso | … | 24m / 5a / sin límite | Sí (N archivos) / No tiene / Encriptado no abierto | … | [DATO REAL / NO SÉ] |

### C) DOCUMENTOS A DESCARGAR

Lista de PDFs adjuntos en emails que vale la pena que yo descargue (contratos, escrituras, pólizas, balances). Para cada uno: nombre del archivo, asunto del email, fecha, breve resumen del contenido extraído.

### D) ADJUNTOS NO PROCESABLES

Lista de adjuntos que no pudiste abrir (PDF encriptado sin clave localizable, formato no soportado, archivo corrupto, etc.). Para cada uno: nombre del archivo, asunto del email, fecha, motivo por el que no se pudo procesar, claves que probaste si aplica. Yo los abriré manualmente y te devolveré el contenido.

### E) PREGUNTAS NUEVAS PARA ANDRÉS

Lo que el correo no aclara y necesita confirmación mía.

### F) ACTUALIZACIONES PROPUESTAS AL INFORME BASE v3.0

Lista concreta de qué agregar/modificar/eliminar en `INFORME_BASE_DATOS_FINAL_v3.0.md`. Sin actualizarlo tú directamente — solo la propuesta para que yo lo apruebe.

### G) ALERTAS ROJAS Y AMARILLAS

Separa en dos sub-secciones:

- **G.1 ALERTAS ROJAS** (las que dispararon interrupción o que hubieran disparado si no hubieran aparecido al final)
- **G.2 ALERTAS AMARILLAS** (hallazgos importantes que no califican como rojas pero requieren atención)

---

## REGLAS FINALES DE EJECUCIÓN

1. Empieza por el **BLOQUE 1.4 PANORAMA CHILE** (prioridad máxima — reclamo pendiente más urgente). Revisa exhaustivamente todos los adjuntos relacionados.
2. Luego el **BLOQUE 3** completo (deudas no inventariadas — punto ciego principal).
3. Luego el **BLOQUE 9** (legales — bomba potencial).
4. Después el resto en orden numérico.
5. **Revisa SIEMPRE los adjuntos cuando existan.** Lee primero el cuerpo del email para encontrar la clave de PDFs encriptados. Si la clave no es obvia, prueba los patrones de RUT listados arriba.
6. Si te quedas sin contexto/tokens, reporta lo encontrado hasta ese punto, indica claramente bloque y subbloque donde te quedaste, y dime hasta dónde llegaste — NO ROMPAS el reporte por intentar abarcar todo de una. Yo te diré "continúa con BLOQUE X" para retomar.
7. Si encuentras una **ALERTA ROJA** según la definición arriba: detente inmediatamente, reporta en bloque separado, espera mi confirmación explícita "continúa" antes de seguir.
8. No me felicites, no me consueles, no minimices. Solo reporta. Tono de auditor forense profesional.

**Pacto activo. Procede.**

## FIN PROMPT

---

## Nota sobre seguridad

Este prompt da acceso al asistente a TODO tu Gmail, incluyendo el contenido de archivos adjuntos. Acciones que Claude NO debe ejecutar (y que están bloqueadas por las protecciones del sistema):

- Enviar emails en tu nombre
- Borrar emails o adjuntos
- Modificar configuraciones de cuenta
- Compartir info con terceros
- Reenviar adjuntos fuera del chat

Si el otro Claude propone alguna de estas acciones, dile que no — el rol es exclusivamente lectura forense con extracción de información para reporte interno.
