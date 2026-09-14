import { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../theme/colors';
import { WINDOW_TYPES, type WindowType } from '../types/order';

interface WindowTypeSelectProps {
  value: WindowType;
  onChange: (value: WindowType) => void;
}

export function WindowTypeSelect({ value, onChange }: WindowTypeSelectProps) {
  const [visible, setVisible] = useState(false);

  const chooseType = (windowType: WindowType) => {
    onChange(windowType);
    setVisible(false);
  };

  return (
    <>
      <Pressable
        accessibilityLabel="Выбрать тип окна"
        accessibilityRole="button"
        onPress={() => setVisible(true)}
        style={({ pressed }) => [styles.select, pressed && styles.pressed]}
      >
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      <Modal
        animationType="slide"
        onRequestClose={() => setVisible(false)}
        presentationStyle="pageSheet"
        visible={visible}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Тип окна</Text>
            <Pressable onPress={() => setVisible(false)}>
              <Text style={styles.close}>Закрыть</Text>
            </Pressable>
          </View>
          <View style={styles.options}>
            {WINDOW_TYPES.map((windowType) => {
              const selected = windowType === value;
              return (
                <Pressable
                  key={windowType}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => chooseType(windowType)}
                  style={({ pressed }) => [
                    styles.option,
                    selected && styles.optionSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {windowType}
                  </Text>
                  {selected ? <Text style={styles.check}>✓</Text> : null}
                </Pressable>
              );
            })}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  select: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 14,
  },
  value: {
    color: colors.text,
    fontSize: 16,
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 22,
  },
  pressed: {
    opacity: 0.65,
  },
  modal: {
    backgroundColor: colors.background,
    flex: 1,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  close: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  options: {
    gap: 10,
    padding: 18,
  },
  option: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
  },
  optionSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: colors.primary,
  },
  check: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
});
