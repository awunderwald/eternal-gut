# Tecnolog One

App móvil para Tecnólogos Médicos (TM) en Chile y LatAm. Unifica calculadoras médicas críticas, guías técnicas de imagenología y comunidad. **Offline-first** y cumplimiento **ISP Decreto Exento N° 25/2026**.

- **Stack:** React Native + Expo SDK 51, TypeScript estricto, Supabase (Auth + Postgres + Realtime + Edge Functions), Zustand, TanStack Query.
- **Estado:** Core lógico verificado (26/26 tests verdes). UI scaffold completo. Falta conectar Supabase real y llenar contenido de guías.

## Estructura

```
tecnolog-one/
├── app/                           Expo Router (file-based nav)
│   ├── _layout.tsx                Root (providers, stack)
│   ├── (tabs)/                    Tabs principales
│   │   ├── _layout.tsx
│   │   ├── index.tsx              Home
│   │   ├── calculators.tsx        Lista de calculadoras + búsqueda
│   │   ├── guides.tsx             Guías (rayos / TAC / RM)
│   │   ├── community.tsx          Foro (feed)
│   │   └── profile.tsx            Perfil + Premium Solarem
│   └── calculators/[id].tsx       Detalle dinámico de calculadora
├── components/                    Design system
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Disclaimer.tsx             ⚠ obligatorio ISP
│   ├── InputField.tsx
│   └── ScreenHeader.tsx
├── lib/
│   ├── supabase.ts                Cliente + persistencia AsyncStorage
│   └── calculators/               8 calculadoras puras + tests
│       ├── ckd-epi.ts             TFG CKD-EPI 2021 (sin factor raza)
│       ├── cockcroft-gault.ts
│       ├── contraste.ts           Contraste adulto (50-150 mL)
│       ├── vejiga.ts              Volumen elipsoide
│       ├── rt-dose.ts             EQD2 (LQ)
│       ├── antropometria.ts       IMC + BSA Mosteller
│       ├── conversiones.ts        Scr mg/dL ↔ μmol/L, mGy → mSv
│       ├── types.ts
│       ├── index.ts               Metadata + handlers
│       └── __tests__/
├── theme/tokens.ts                Colores #005EB8 / #00A86B, Inter
├── types/index.ts                 Profile, Guide, ForumPost…
├── supabase/
│   └── migrations/0001_init.sql   Schema + RLS + Realtime + audit
├── assets/                        (pendiente: íconos + splash)
├── app.json
├── babel.config.js
├── package.json
└── tsconfig.json
```

## Setup

```bash
# 1. Instalar dependencias (requiere Node 20+)
npm install

# 2. Variables de entorno
cp .env.example .env
# Editar .env con las credenciales de tu proyecto Supabase

# 3. Desarrollo
npm start          # Expo Dev Client (QR)
npm run ios        # iPhone simulator (requiere Xcode en macOS)
npm run android    # Emulador Android
npm run web        # Web preview

# 4. Tests y tipos
npm test           # Jest — calculadoras
npm run typecheck  # tsc --noEmit
```

## Supabase

1. Crear proyecto en [supabase.com](https://supabase.com) (Free tier suficiente: 500 MB DB, 1 GB storage, 50k MAU).
2. **SQL Editor → New query →** pegar `supabase/migrations/0001_init.sql` y ejecutar.
3. **Authentication → Providers →** habilitar Email + Google.
4. **Settings → API →** copiar `Project URL` y `anon public key` a `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Si usas CLI:

```bash
npm i -g supabase
supabase link --project-ref <tu-ref>
supabase db push
```

## Calculadoras incluidas (8)

| ID | Fórmula | Versión auditable |
|----|---------|-------------------|
| `ckd-epi-2021` | eGFR CKD-EPI 2021 sin factor raza | `CKD-EPI-2021-race-free-v1` |
| `cockcroft-gault` | CrCl clásica | `CockcroftGault-1976-v1` |
| `contraste-adulto` | 1.0/0.8/0.5 mL/kg × peso, cap 50-150 mL | `Contraste-Adulto-2026-v1` |
| `volumen-vejiga` | 0.52 × L × A × H (elipsoide) | `Vejiga-Elipsoide-v1` |
| `eqd2` | D × (d + α/β) / (2 + α/β) | `EQD2-LQ-v1` |
| `bmi` | peso / altura² + clasif. OMS | `BMI-WHO-v1` |
| `bsa` | Mosteller √((p × h) / 3600) | `BSA-Mosteller-v1` |
| `conv-creatinina` | × 88.4 | `Conv-Creatinina-v1` |

Cada resultado incluye `explanation`, `warnings`, `disclaimer` y `version` para trazabilidad ISP. Las versiones viven también en la tabla `formula_versions` (Supabase) para auditoría.

## Deployment

### iOS (TestFlight)

```bash
npm i -g eas-cli
eas login
eas build:configure
eas build -p ios --profile preview     # internal
eas submit -p ios --latest             # → App Store Connect → TestFlight
```

Pre-requisitos: Apple Developer Account ($99 USD/año), bundle ID `cl.piwu.tecnologone`.

### Android (Play Console)

```bash
eas build -p android --profile preview   # APK/AAB interno
eas submit -p android --latest           # → Google Play Console → Internal testing
```

Pre-requisitos: Google Play Console ($25 USD one-time), package `cl.piwu.tecnologone`.

### OTA updates

```bash
eas update --branch production --message "Fix cálculo X"
```

Los JS updates salen sin revisión de store (ideal para correcciones de contenido de guías).

## Costos estimados (MVP · 5.000 MAU)

| Servicio | Plan | Costo mensual USD |
|----------|------|-------------------|
| Supabase | Pro | ~25 (DB + Auth + Realtime + 100 GB egress) |
| EAS Build | Priority | 19 (opcional, Free tier 30 builds/mes alcanza al inicio) |
| Expo OTA | Included | 0 |
| Apple Developer | — | ~8 (99/año) |
| Google Play | — | 0 (one-time 25) |
| **Total** | | **~35-55 USD/mes** |

## Compliance (ISP · Decreto Exento 25/2026)

- ✅ Disclaimer visible en cada calculadora (`components/Disclaimer.tsx`).
- ✅ Versión de cada fórmula emitida en el resultado y persistida en `formula_versions`.
- ✅ No se almacenan datos identificables de paciente — solo inputs numéricos en `calculation_history` bajo `user_id`.
- ✅ RLS habilitado en todas las tablas.
- ✅ Log de uso agregado en `usage_log`.

## Tests

```bash
npm test
```

**26/26 tests pasan** (CKD-EPI, Cockcroft-Gault, contraste, vejiga, EQD2, IMC, BSA, conversiones + disclaimer obligatorio).

## Roadmap

- **Fase 1 (actual):** Auth + 8 calculadoras + historial ✅ (lógica lista, falta integrar UI con Supabase)
- **Fase 2:** 50 guías de rayos/TAC/RM (JSON offline)
- **Fase 3:** Foro con Realtime + Premium Solarem + onboarding pulido

Detalle de lo que aún falta: [MISSING_DATA.md](./MISSING_DATA.md).
