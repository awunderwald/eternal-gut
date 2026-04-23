import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ScreenHeader';
import { colors, spacing, typography } from '../../theme/tokens';

const MENU = [
  { icon: '📊', label: 'Historial de cálculos', sub: '20 guardados' },
  { icon: '⭐', label: 'Favoritos', sub: '4 calculadoras · 7 guías' },
  { icon: '🏥', label: 'Hospital', sub: 'H. Sótero del Río — Imagenología' },
  { icon: '🔔', label: 'Notificaciones', sub: 'Suscripción activa · turno' },
  { icon: '⬇️', label: 'Contenido offline', sub: '18 MB guardados' },
  { icon: '🔒', label: 'Privacidad y datos', sub: 'Sin PII clínica' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
      <ScreenHeader title="Perfil" />
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>CB</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Camila Bustos</Text>
          <Text style={styles.sub}>TM · Imagenología · 4 años</Text>
        </View>
      </View>

      <Card style={styles.premium}>
        <Text style={styles.premiumLabel}>PREMIUM · SOLAREM</Text>
        <Text style={styles.premiumTitle}>Desbloquea protocolos RM</Text>
        <Text style={styles.premiumSub}>
          Cursos 2026: Neuro RM, Próstata PI-RADS 2.1, Cuerpo.
        </Text>
      </Card>

      <View style={styles.menu}>
        {MENU.map((m) => (
          <Card key={m.label}>
            <View style={styles.row}>
              <Text style={styles.icon}>{m.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>{m.label}</Text>
                <Text style={styles.subMenu}>{m.sub}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.text.primary, fontWeight: typography.weight.bold },
  name: { color: colors.text.primary, fontSize: typography.size.lg, fontWeight: typography.weight.semibold },
  sub: { color: colors.text.muted, fontSize: typography.size.sm },
  premium: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.brand.primary,
  },
  premiumLabel: {
    color: colors.bg.base,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 1.2,
  },
  premiumTitle: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    marginTop: spacing.xs,
  },
  premiumSub: { color: colors.text.primary, fontSize: typography.size.sm, marginTop: spacing.xs, opacity: 0.9 },
  menu: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: { fontSize: 22 },
  label: { color: colors.text.primary, fontSize: typography.size.md, fontWeight: typography.weight.semibold },
  subMenu: { color: colors.text.muted, fontSize: typography.size.xs, marginTop: 2 },
  chevron: { color: colors.text.muted, fontSize: 22 },
});
