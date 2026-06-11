# SETUP — Compilar y probar Animalitos en tu máquina

> ⚠️ El entorno de nube (Claude Code web) **no puede compilar apps nativas**: no
> tiene Android SDK ni Xcode. El empaque y las pruebas en dispositivo se hacen en
> **tu computador**. Esta guía te dice exactamente qué necesitas.

## 0. Probar solo la web (rápido, sin instalar nada nativo)

```bash
cd kids-animals
python3 -m http.server 8080   # abre http://localhost:8080
```

## 1. Qué necesitas instalado (verificación de entorno)

| Herramienta | Para qué | Cómo verificar |
|---|---|---|
| **Node.js LTS** (≥18) | Capacitor y scripts | `node -v` |
| **Android Studio** | Compilar/abrir Android | abre Android Studio |
| **Android SDK + Platform Tools** | build + `adb` | `adb --version` |
| **JDK 17** | Gradle/Android | `java -version` |
| **Emulador o teléfono Android** | probar | teléfono con *Depuración USB* o un AVD |
| **(iPhone) Mac + Xcode** | Compilar iOS | `xcodebuild -version` (solo macOS) |
| **(iPhone) CocoaPods** | dependencias iOS | `pod --version` |

> Para **iPhone necesitas un Mac** (Xcode no existe en Windows/Linux). Android se
> puede hacer en Windows, macOS o Linux.

## 2. Instalar dependencias del proyecto

Desde la raíz del repo:

```bash
npm install
```

## 3. Crear el proyecto Android y abrirlo

```bash
npx cap add android      # crea la carpeta android/ (envuelve kids-animals/)
npx cap sync             # copia la web + plugins al proyecto nativo
npx cap open android     # abre Android Studio
```

En Android Studio: elige un emulador o tu teléfono y pulsa **Run ▶**.

Cada vez que cambies algo en `kids-animals/`, vuelve a sincronizar:

```bash
npx cap sync
```

## 4. (Opcional) Crear el proyecto iOS (requiere Mac)

```bash
npx cap add ios
npx cap sync
npx cap open ios         # abre Xcode
```

## 5. Datos del proyecto (cámbialos cuando definas la marca)

- `appId`: `com.animalitos.kids`  → en `capacitor.config.json`
- `appName`: `Animalitos`

## 6. Costos de publicación (referencia)

- **Google Play**: pago único **US$25**.
- **App Store (Apple)**: **US$99 al año**.

## 7. Siguientes plugins (ver fases F3–F5 en CLAUDE.md)

- Descargas offline: `@capacitor/filesystem`
- Suscripciones: plugin de in-app purchases (Play Billing / StoreKit) — evaluar
  RevenueCat para simplificar ambas tiendas.
- Google Cast / AirPlay a TV.
