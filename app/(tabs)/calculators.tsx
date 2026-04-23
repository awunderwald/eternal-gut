import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CALCULATORS } from '../../lib/calculators';
import { colors, radius, spacing, typography } from '../../theme/tokens';

export default function CalculatorsListScreen() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      CALCULATORS.filter((c) =>
        (c.titulo + ' ' + c.descripcion).toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Calculadoras" subtitle="8 herramientas esenciales · todo offline" />
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar calculadora o guía…"
          placeholderTextColor={colors.text.muted}
          style={styles.search}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/calculators/[id]', params: { id: item.id } }} asChild>
            <Card onPress={() => {}}>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.subtitle}>{item.descripcion}</Text>
              <Text style={styles.tag}>{item.categoria.replace('_', ' ')}</Text>
            </Card>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  searchWrap: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  search: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    color: colors.text.primary,
    fontSize: typography.size.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginTop: spacing.xs,
  },
  tag: {
    color: colors.brand.primarySoft,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: spacing.sm,
  },
});
