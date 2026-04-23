import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Disclaimer } from '../../components/Disclaimer';
import { InputField } from '../../components/InputField';
import { ScreenHeader } from '../../components/ScreenHeader';
import {
  CALCULATORS,
  CalcResult,
  ckdEpi2021,
  cockcroftGault,
  contrasteAdulto,
  volumenVejiga,
  eqd2,
  bmi,
  bsaMosteller,
  scrMgDlToUmolL,
} from '../../lib/calculators';
import { useSaveCalculation } from '../../lib/hooks';
import { colors, spacing, typography } from '../../theme/tokens';

type FieldSpec = {
  name: string;
  label: string;
  suffix?: string;
  placeholder?: string;
};

const FIELDS: Record<string, FieldSpec[]> = {
  'ckd-epi-2021': [
    { name: 'edad', label: 'Edad', suffix: 'años' },
    { name: 'scrMgDl', label: 'Creatinina sérica', suffix: 'mg/dL' },
    { name: 'sexo', label: 'Sexo (M/F)', placeholder: 'M' },
  ],
  'cockcroft-gault': [
    { name: 'edad', label: 'Edad', suffix: 'años' },
    { name: 'pesoKg', label: 'Peso', suffix: 'kg' },
    { name: 'scrMgDl', label: 'Creatinina', suffix: 'mg/dL' },
    { name: 'sexo', label: 'Sexo (M/F)', placeholder: 'M' },
  ],
  'contraste-adulto': [
    { name: 'pesoKg', label: 'Peso del paciente', suffix: 'kg' },
    { name: 'eGFR', label: 'eGFR', suffix: 'mL/min/1.73m²' },
  ],
  'volumen-vejiga': [
    { name: 'largoCm', label: 'Largo', suffix: 'cm' },
    { name: 'anchoCm', label: 'Ancho', suffix: 'cm' },
    { name: 'alturaCm', label: 'Altura', suffix: 'cm' },
  ],
  eqd2: [
    { name: 'dosisTotalGy', label: 'Dosis total', suffix: 'Gy' },
    { name: 'dosisPorFraccionGy', label: 'Dosis por fracción', suffix: 'Gy' },
    { name: 'alphaBeta', label: 'α/β', placeholder: '3' },
  ],
  bmi: [
    { name: 'pesoKg', label: 'Peso', suffix: 'kg' },
    { name: 'alturaCm', label: 'Altura', suffix: 'cm' },
  ],
  bsa: [
    { name: 'pesoKg', label: 'Peso', suffix: 'kg' },
    { name: 'alturaCm', label: 'Altura', suffix: 'cm' },
  ],
  'conv-creatinina': [{ name: 'mgDl', label: 'Creatinina', suffix: 'mg/dL' }],
};

function runCalculator(id: string, values: Record<string, string>): CalcResult {
  const num = (k: string) => Number(values[k]);
  const sexo = (values.sexo ?? 'M').toUpperCase() === 'F' ? 'F' : 'M';
  switch (id) {
    case 'ckd-epi-2021':
      return ckdEpi2021({ edad: num('edad'), scrMgDl: num('scrMgDl'), sexo });
    case 'cockcroft-gault':
      return cockcroftGault({ edad: num('edad'), pesoKg: num('pesoKg'), scrMgDl: num('scrMgDl'), sexo });
    case 'contraste-adulto':
      return contrasteAdulto({ pesoKg: num('pesoKg'), eGFR: num('eGFR') });
    case 'volumen-vejiga':
      return volumenVejiga({ largoCm: num('largoCm'), anchoCm: num('anchoCm'), alturaCm: num('alturaCm') });
    case 'eqd2':
      return eqd2({ dosisTotalGy: num('dosisTotalGy'), dosisPorFraccionGy: num('dosisPorFraccionGy'), alphaBeta: num('alphaBeta') });
    case 'bmi':
      return bmi({ pesoKg: num('pesoKg'), alturaCm: num('alturaCm') });
    case 'bsa':
      return bsaMosteller({ pesoKg: num('pesoKg'), alturaCm: num('alturaCm') });
    case 'conv-creatinina':
      return scrMgDlToUmolL(num('mgDl'));
    default:
      throw new Error(`Calculadora desconocida: ${id}`);
  }
}

export default function CalculatorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meta = useMemo(() => CALCULATORS.find((c) => c.id === id), [id]);
  const fields = FIELDS[id ?? ''] ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const saveCalc = useSaveCalculation();

  function onCalculate() {
    if (!id) return;
    try {
      const r = runCalculator(id, values);
      setResult(r);
      setError(null);
      saveCalc.mutate({ calculatorType: id, inputs: values, result: r });
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : 'Error de cálculo');
    }
  }

  function onReset() {
    setValues({});
    setResult(null);
    setError(null);
  }

  if (!meta) {
    return (
      <View style={styles.screen}>
        <ScreenHeader title="Calculadora" subtitle="No encontrada" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader eyebrow={meta.categoria.replace('_', ' ').toUpperCase()} title={meta.titulo} subtitle={meta.descripcion} />

        <Card style={styles.form}>
          {fields.map((f) => (
            <InputField
              key={f.name}
              label={f.label}
              suffix={f.suffix}
              placeholder={f.placeholder}
              keyboardType={f.name === 'sexo' ? 'default' : 'decimal-pad'}
              value={values[f.name] ?? ''}
              onChangeText={(t) => setValues((prev) => ({ ...prev, [f.name]: t }))}
              autoCapitalize={f.name === 'sexo' ? 'characters' : 'none'}
            />
          ))}
          <Button title="Calcular" onPress={onCalculate} />
          <Button title="Limpiar" variant="ghost" onPress={onReset} />
        </Card>

        {error && (
          <Card style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
          </Card>
        )}

        {result && (
          <Card emphasis="raised" style={styles.result}>
            <Text style={styles.resultLabel}>RESULTADO</Text>
            <Text style={styles.resultValue}>
              {result.value} <Text style={styles.resultUnit}>{result.unit}</Text>
            </Text>
            <Text style={styles.resultExplain}>{result.explanation}</Text>
            {result.warnings?.map((w, i) => (
              <Text key={i} style={styles.warn}>
                ⚠ {w}
              </Text>
            ))}
            <Text style={styles.version}>Fórmula: {result.version}</Text>
          </Card>
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
  result: { gap: spacing.sm, borderColor: colors.brand.primary, borderWidth: 1 },
  resultLabel: {
    color: colors.brand.primarySoft,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 1.2,
  },
  resultValue: { color: colors.text.primary, fontSize: typography.size.display, fontWeight: typography.weight.bold },
  resultUnit: { fontSize: typography.size.lg, color: colors.text.secondary, fontWeight: typography.weight.medium },
  resultExplain: { color: colors.text.secondary, fontSize: typography.size.sm },
  warn: { color: colors.state.warning, fontSize: typography.size.sm },
  version: { color: colors.text.muted, fontSize: typography.size.xs, marginTop: spacing.sm },
  errorCard: { borderColor: colors.state.danger, borderWidth: 1 },
  errorText: { color: colors.state.danger, fontSize: typography.size.sm },
});
