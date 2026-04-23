import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ScreenHeader';
import { colors, spacing, typography } from '../../theme/tokens';

const POSTS = [
  {
    id: '1',
    categoria: 'PROTOCOLOS',
    titulo: 'TAC de tórax C+: truco para niños inquietos',
    extracto: 'Bajé el pitch a 0.8 y con el kV a 80 quedó sin movimiento en 2 segundos…',
    likes: 47,
    comentarios: 12,
  },
  {
    id: '2',
    categoria: 'TIPS',
    titulo: 'RM rodilla — evitar artefacto de movimiento con bobina flex',
    extracto: 'La clave está en el almohadillado lateral, no en la correa. Fotos del setup adentro.',
    likes: 31,
    comentarios: 5,
  },
  {
    id: '3',
    categoria: 'CASOS',
    titulo: 'Proyección sacroilíaca oblicua: ¿25° o 30°?',
    extracto: 'Tenemos debate con la jefa. ¿Qué hacen uds según la contextura del paciente?',
    likes: 24,
    comentarios: 34,
  },
];

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
      <ScreenHeader title="Comunidad" subtitle="Turnos compartidos. Protocolos reales." />
      <View style={styles.tabs}>
        {['Más útiles', 'Recientes', 'Seguidos'].map((t, i) => (
          <Text key={t} style={[styles.tab, i === 0 && styles.tabActive]}>
            {t}
          </Text>
        ))}
      </View>
      <View style={styles.list}>
        {POSTS.map((p) => (
          <Card key={p.id}>
            <Text style={styles.category}>{p.categoria}</Text>
            <Text style={styles.title}>{p.titulo}</Text>
            <Text style={styles.extract}>{p.extracto}</Text>
            <View style={styles.meta}>
              <Text style={styles.metaItem}>▲ {p.likes}</Text>
              <Text style={styles.metaItem}>💬 {p.comentarios}</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  tabs: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  tab: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    paddingVertical: spacing.xs,
  },
  tabActive: {
    color: colors.brand.primarySoft,
    borderBottomWidth: 2,
    borderBottomColor: colors.brand.primarySoft,
  },
  list: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  category: {
    color: colors.brand.primarySoft,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
  },
  extract: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginTop: spacing.xs,
    lineHeight: 19,
  },
  meta: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  metaItem: { color: colors.text.muted, fontSize: typography.size.sm },
});
