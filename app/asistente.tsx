import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Disclaimer } from '../components/Disclaimer';
import { InputField } from '../components/InputField';
import { ScreenHeader } from '../components/ScreenHeader';
import { AsistenteResult, sugerirExamenes } from '../lib/assistant';
import { colors, radius, spacing, typography } from '../theme/tokens';

const QUICK_SINTOMAS = [
  'dolor torácico',
  'disnea',
  'dolor abdominal',
  'dolor lumbar',
  'cefalea súbita',
  'rodilla',
  'pérdida de conciencia',
];

const MODIFIERS = [
  { key: 'trauma', label: 'Trauma' },
  { key: 'fiebre', label: 'Fiebre' },
  { key: 'embarazo', label: 'Embarazo' },
  { key: 'erc', label: 'ERC' },
  { key: 'alergia_contraste', label: 'Alergia contraste' },
] as const;

const PRIORIDAD_COLOR = {
  urgente: colors.state.danger,
  prioritario: colors.state.warning,
  diferido: colors.brand.primarySoft,
} as const;

export default function AsistenteScreen() {
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');
  const [sintomas, setSintomas] = useState<string[]>([]);
  const [modifiers, setModifiers] = useState<Record<string, boolean>>({});
  const [libre, setLibre] = useState('');
  const [result, setResult] = useState<AsistenteResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allSintomas = useMemo(
    () => [...sintomas, ...libre.split(',').map((s) => s.trim()).filter(Boolean)],
    [sintomas, libre]
  );

  function toggleSintoma(s: string) {
    setSintomas((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }
  function toggleMod(k: string) {
    setModifiers((prev) => ({ ...prev, [k]: !prev[k] }));
  }

  function onSubmit() {
    try {
      const r = sugerirExamenes({
        edad: Number(edad),
        sexo,
        sintomas: allSintomas,
        modifiers,
      });
      setResult(r);
      setError(null);
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : 'Error');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          eyebrow="Paso 2 · experimental"
          title="¿Qué examen pedir?"
          subtitle="Lookup clínico basado en reglas SERAM/ACR. No es diagnóstico."
        />

        <Card style={styles.form}>
          <View style={styles.row}>
            <InputField
              label="Edad"
              value={edad}
              onChangeText={setEdad}
              suffix="años"
              keyboardType="number-pad"
              style={styles.flex}
            />
            <View style={styles.sexo}>
              <Text style={styles.sexoLabel}>Sexo</Text>
              <View style={styles.sexoRow}>
                {(['M', 'F'] as const).map((s) => (
                  <Text
                    key={s}
                    onPress={() => setSexo(s)}
                    style={[styles.chip, sexo === s && styles.chipActive]}
                  >
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.label}>Síntomas frecuentes</Text>
          <View style={styles.chipWrap}>
            {QUICK_SINTOMAS.map((s) => (
              <Text
                key={s}
                onPress={() => toggleSintoma(s)}
                style={[styles.chip, sintomas.includes(s) && styles.chipActive]}
              >
                {s}
              </Text>
            ))}
          </View>

          <InputField
            label="Otros síntomas (separados por coma)"
            value={libre}
            onChangeText={setLibre}
            placeholder="hemoptisis, taquicardia…"
          />

          <Text style={styles.label}>Contexto</Text>
          <View style={styles.chipWrap}>
            {MODIFIERS.map((m) => (
              <Text
                key={m.key}
                onPress={() => toggleMod(m.key)}
                style={[styles.chip, modifiers[m.key] && styles.chipActive]}
              >
                {m.label}
              </Text>
            ))}
          </View>

          <Button title="Sugerir exámenes" onPress={onSubmit} />
        </Card>

        {error && (
          <Card style={{ borderColor: colors.state.danger, borderWidth: 1 }}>
            <Text style={{ color: colors.state.danger }}>{error}</Text>
          </Card>
        )}

        {result && (
          <View style={{ gap: spacing.sm }}>
            <Text style={styles.sectionLabel}>SUGERENCIAS</Text>
            {result.sugeridos.length === 0 && (
              <Card>
                <Text style={styles.empty}>{result.razonamiento}</Text>
              </Card>
            )}
            {result.sugeridos.map((e, i) => (
              <Card key={i}>
                <View style={styles.studyHeader}>
                  <Text style={[styles.priority, { color: PRIORIDAD_COLOR[e.prioridad] }]}>
                    {e.prioridad.toUpperCase()}
                  </Text>
                  <Text style={styles.modality}>{e.modalidad.toUpperCase()}</Text>
                </View>
                <Text style={styles.studyTitle}>{e.estudio}</Text>
                <Text style={styles.studyReason}>{e.justificacion}</Text>
                {e.precaucion && <Text style={styles.warning}>⚠ {e.precaucion}</Text>}
              </Card>
            ))}
            <Card emphasis="raised">
              <Text style={styles.sectionLabel}>RAZONAMIENTO</Text>
              <Text style={styles.reasoning}>{result.razonamiento}</Text>
              <Text style={styles.version}>Versión: {result.version}</Text>
            </Card>
          </View>
        )}

        <Disclaimer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, gap: spacing.md },
  form: { gap: spacing.md },
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-end' },
  flex: { flex: 1 },
  sexo: { width: 120, gap: spacing.xs },
  sexoLabel: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sexoRow: { flexDirection: 'row', gap: spacing.xs },
  label: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: {
    color: colors.text.secondary,
    backgroundColor: colors.bg.muted,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    overflow: 'hidden',
    fontSize: typography.size.sm,
  },
  chipActive: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
    color: colors.text.primary,
  },
  sectionLabel: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  empty: { color: colors.text.secondary, fontSize: typography.size.sm },
  studyHeader: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xs },
  priority: { fontSize: typography.size.xs, fontWeight: typography.weight.bold, letterSpacing: 1 },
  modality: {
    fontSize: typography.size.xs,
    color: colors.text.muted,
    letterSpacing: 1.2,
    fontWeight: typography.weight.semibold,
  },
  studyTitle: { color: colors.text.primary, fontSize: typography.size.md, fontWeight: typography.weight.semibold },
  studyReason: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: spacing.xs },
  warning: { color: colors.state.warning, fontSize: typography.size.xs, marginTop: spacing.sm },
  reasoning: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: spacing.xs },
  version: { color: colors.text.muted, fontSize: typography.size.xs, marginTop: spacing.sm },
});
