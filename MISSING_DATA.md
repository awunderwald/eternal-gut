# Datos / decisiones pendientes

Lo que necesito de tu lado para cerrar el MVP. Marcado por bloqueador (🔴 crítico, 🟠 importante, 🟢 nice-to-have).

## 🔴 Críticos para lanzamiento

1. **Cuenta Supabase**
   - URL del proyecto + anon key (van a `.env`).
   - Confirmar región (recomiendo `sa-east-1` São Paulo por latencia LatAm).
2. **Validación clínica de fórmulas**
   - ¿Quién firma como revisor médico/TM senior cada fórmula? Necesito al menos:
     - Contraste adulto (la curva 1.0/0.8/0.5 mL/kg vs eGFR).
     - EQD2 (¿qué α/β default mostramos? ¿3 para tejido tardío, 10 para tumor?).
   - ¿Agregamos contraste pediátrico? Necesito la fórmula institucional (típica: 2 mL/kg, máx 100 mL).
3. **Cuentas de stores**
   - Apple Developer Program activo (Team ID).
   - Google Play Console activo (organizational vs personal).
4. **Logo + assets**
   - Marca PI·WU · Simbiosis Lab en SVG.
   - Iconos `assets/icon.png` (1024×1024), `adaptive-icon.png`, `splash.png`, `favicon.png`.
5. **Política de privacidad + Términos**
   - URLs públicas (Apple y Google las exigen).
   - Mención explícita: NO almacenamos datos clínicos identificables.

## 🟠 Importantes

6. **Catálogo de guías iniciales** (objetivo: 50)
   - Por cada guía: título, categoría (rayos/TAC/RM), kVp, mAs, DFP, colimación, criterios de evaluación, imagen de ejemplo.
   - Plantilla JSON disponible en el tipo `Guide` (`types/index.ts`).
   - ¿Quién las redacta? ¿Existe ya un Notion/Google Doc con borradores?
7. **Asistente de exámenes (AI-assist)**
   - ¿Mapa síntomas → exámenes manual (lookup table) o LLM?
   - Si LLM: ¿Claude vía Anthropic API, costos compartidos quién paga?
   - Casos de uso prioritarios (ej: dolor torácico + disnea + 60 años, HTA → AngioTAC tórax).
8. **Modelo de monetización Solarem**
   - Precio confirmado: $9.990 CLP/mes.
   - ¿Qué bloquea exactamente el paywall? Sugerencia actual: guías premium + contenido de cursos RM.
   - Procesador: ¿Apple/Google IAP (30% comisión) o web checkout (Webpay/Stripe)?
9. **Categorías y nomenclatura del foro**
   - Confirmar: tips · protocolos · casos · nomenclatura.
   - Moderación: ¿automática (perspective API), manual, o reportes?
10. **Onboarding**
    - 3 pantallas. Necesito el copy final.

## 🟢 Nice-to-have

11. Tema light "Clínico" — tokens definidos pero falta paleta.
12. Notificaciones push (turnos, respuestas en foro) — requiere expo-notifications + APNs/FCM.
13. Modo accesibilidad alta-visibilidad para guardia nocturna.
14. Búsqueda full-text en guías (Postgres `tsvector` o Algolia).
15. Analytics (PostHog self-hosted recomendado por privacidad).

## Decisiones que ya tomé (avísame si querés cambiar)

| Decisión | Valor | Por qué |
|----------|-------|---------|
| Bundle ID | `cl.piwu.tecnologone` | Convención reverse-DNS chilena |
| Color brand | `#005EB8` (azul) + `#00A86B` (verde) | De tu prompt |
| Tipografía | Inter | De tu prompt; aún hay que cargar las fuentes en `app/_layout.tsx` |
| Default Sci (dark) | sí | El kit muestra dark-first |
| Cap contraste | 50-150 mL | Práctica común LatAm + tu spec |
| α/β default RT | 3 (tejido sano), 10 (tumor) | Pero el campo es libre — confirma si pre-rellenamos |
| Sin factor raza CKD-EPI | sí | Recomendación NKF/ASN 2021, mejor para LatAm |
| RLS | habilitado en todas | Compliance ISP |
| Realtime | foro_posts + foro_comments | Para feed live |
