import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ScreenHeader';
import { colors, spacing, typography } from '../../theme/tokens';

const CATEGORIAS = [
  { id: 'rayos', titulo: 'Rayos X', subtitulo: 'Proyecciones estándar y especiales' },
  { id: 'tac', titulo: 'TAC', subtitulo: 'Protocolos por región anatómica' },
  { id: 'rm', titulo: 'RM', subtitulo: 'Secuencias y parámetros' },
];

const DESTACADAS = [
  { titulo: 'Tórax PA', tecnica: '180 cm · vertical · kVp 120 · mAs 4', criterios: 10 },
  { titulo: 'Tórax lateral', tecnica: '180 cm · vertical · kVp 120 · mAs 8' },
  { titulo: 'Abdomen simple', tecnica: '100 cm · supino · kVp 80 · mAs 40' },
  { titulo: 'Columna cervical AP', tecnica: '100 cm · supino · kVp 75 · mAs 20' },
];

export default function GuidesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
      <ScreenHeader
        eyebrow="Guías · TM"
        title="Rayos · Guías"
        subtitle="Protocolos SERAM/ACR adaptados a LatAm"
      />

      <View style={styles.chipRow}>
        {CATEGORIAS.map((c) => (
          <Card key={c.id} style={styles.chip}>
            <Text style={styles.chipTitle}>{c.titulo}</Text>
            <Text style={styles.chipSub}>{c.subtitulo}</Text>
          </Card>
        ))}
      </View>

      <Text style={styles.section}>Destacadas</Text>
      <View style={styles.list}>
        {DESTACADAS.map((d) => (
          <Card key={d.titulo}>
            <Text style={styles.title}>{d.titulo}</Text>
            <Text style={styles.tech}>{d.tecnica}</Text>
            {d.criterios ? <Text style={styles.criterios}>{d.criterios} criterios de evaluación</Text> : null}
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chip: { flex: 1, minHeight: 80 },
  chipTitle: { color: colors.text.primary, fontSize: typography.size.md, fontWeight: typography.weight.bold },
  chipSub: { color: colors.text.muted, fontSize: typography.size.xs, marginTop: spacing.xs },
  section: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  list: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.sm },
  title: { color: colors.text.primary, fontSize: typography.size.lg, fontWeight: typography.weight.semibold },
  tech: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: spacing.xs },
  criterios: { color: colors.brand.primarySoft, fontSize: typography.size.xs, marginTop: spacing.sm },
});
