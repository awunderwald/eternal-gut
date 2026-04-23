import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import { Button } from '../../components/Button';
import { colors, radius, spacing, typography } from '../../theme/tokens';

const SLIDES = [
  {
    icon: '🧮',
    titulo: 'Calculadoras en 10 segundos',
    texto: 'TFG, contraste, volúmenes. Guarda tus más usadas en favoritos y ábrelas con un toque.',
  },
  {
    icon: '📸',
    titulo: 'Guías técnicas al alcance',
    texto: 'Proyecciones estándar, kVp, mAs y criterios de evaluación. Todo offline para tu turno.',
  },
  {
    icon: '👥',
    titulo: 'Comunidad TM real',
    texto: 'Comparte protocolos, haz preguntas, aprende de colegas de toda LatAm. Sin spam.',
  },
];

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const list = useRef<FlatList>(null);

  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const i = viewableItems[0]?.index;
    if (typeof i === 'number') setIndex(i);
  }).current;

  function next() {
    if (index < SLIDES.length - 1) {
      list.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.replace('/(tabs)');
    }
  }

  return (
    <View style={styles.screen}>
      <FlatList
        ref={list}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewable}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.text}>{item.texto}</Text>
          </View>
        )}
      />
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
      <View style={styles.cta}>
        <Button title={index === SLIDES.length - 1 ? 'Continuar' : 'Siguiente'} onPress={next} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  icon: { fontSize: 72 },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    textAlign: 'center',
  },
  text: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 22,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border.subtle,
  },
  dotActive: { backgroundColor: colors.brand.primarySoft, width: 24 },
  cta: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
});
