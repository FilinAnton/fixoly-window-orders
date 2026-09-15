import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  error: {
    color: colors.danger,
    fontSize: 12,
  },
});
