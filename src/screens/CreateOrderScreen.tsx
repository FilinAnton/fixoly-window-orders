import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '../components/FormField';
import { WindowTypeSelect } from '../components/WindowTypeSelect';
import type { RootStackParamList } from '../navigation/types';
import { useOrders } from '../store/OrdersContext';
import { colors } from '../theme/colors';
import { WINDOW_TYPES, type WindowType } from '../types/order';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateOrder'>;

interface FormValues {
  customerName: string;
  address: string;
  windowType: WindowType;
  width: string;
  height: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  customerName: '',
  address: '',
  windowType: WINDOW_TYPES[0],
  width: '',
  height: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const width = Number(values.width.replace(',', '.'));
  const height = Number(values.height.replace(',', '.'));

  if (!values.customerName.trim()) {
    errors.customerName = 'Укажите имя клиента';
  }
  if (!values.address.trim()) {
    errors.address = 'Укажите адрес';
  }
  if (!values.width.trim() || !Number.isFinite(width) || width <= 0) {
    errors.width = 'Введите положительное число';
  }
  if (!values.height.trim() || !Number.isFinite(height) || height <= 0) {
    errors.height = 'Введите положительное число';
  }

  return errors;
}

export function CreateOrderScreen({ navigation }: Props) {
  const { addOrder } = useOrders();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const isFormComplete = useMemo(
    () =>
      Boolean(
        values.customerName.trim() &&
          values.address.trim() &&
          values.width.trim() &&
          values.height.trim(),
      ),
    [values],
  );

  const updateField = <Key extends keyof FormValues>(
    key: Key,
    value: FormValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const submit = () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addOrder({
      customerName: values.customerName.trim(),
      address: values.address.trim(),
      windowType: values.windowType,
      width: Number(values.width.replace(',', '.')),
      height: Number(values.height.replace(',', '.')),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.intro}>
            <Text style={styles.introTitle}>Данные заказа</Text>
            <Text style={styles.introText}>
              Заполните информацию о клиенте и параметрах окна.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormField error={errors.customerName} label="Имя клиента">
              <TextInput
                autoCapitalize="words"
                onChangeText={(value) => updateField('customerName', value)}
                placeholder="Например, Анна Коваль"
                placeholderTextColor={colors.textMuted}
                returnKeyType="next"
                style={[styles.input, errors.customerName && styles.inputError]}
                value={values.customerName}
              />
            </FormField>

            <FormField error={errors.address} label="Адрес">
              <TextInput
                autoCapitalize="sentences"
                onChangeText={(value) => updateField('address', value)}
                placeholder="Улица, дом, квартира"
                placeholderTextColor={colors.textMuted}
                returnKeyType="next"
                style={[styles.input, errors.address && styles.inputError]}
                value={values.address}
              />
            </FormField>

            <FormField label="Тип окна">
              <WindowTypeSelect
                onChange={(value) => updateField('windowType', value)}
                value={values.windowType}
              />
            </FormField>

            <View style={styles.dimensionRow}>
              <View style={styles.dimensionField}>
                <FormField error={errors.width} label="Ширина, мм">
                  <TextInput
                    keyboardType="decimal-pad"
                    onChangeText={(value) => updateField('width', value)}
                    placeholder="1200"
                    placeholderTextColor={colors.textMuted}
                    style={[styles.input, errors.width && styles.inputError]}
                    value={values.width}
                  />
                </FormField>
              </View>
              <View style={styles.dimensionField}>
                <FormField error={errors.height} label="Высота, мм">
                  <TextInput
                    keyboardType="decimal-pad"
                    onChangeText={(value) => updateField('height', value)}
                    placeholder="1400"
                    placeholderTextColor={colors.textMuted}
                    style={[styles.input, errors.height && styles.inputError]}
                    value={values.height}
                  />
                </FormField>
              </View>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={submit}
            style={({ pressed }) => [
              styles.saveButton,
              !isFormComplete && styles.saveButtonIncomplete,
              pressed && styles.saveButtonPressed,
            ]}
          >
            <Text style={styles.saveButtonText}>Сохранить заказ</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 16,
    paddingBottom: 32,
  },
  intro: {
    gap: 5,
  },
  introTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  introText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 18,
    padding: 18,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  inputError: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
  },
  dimensionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dimensionField: {
    flex: 1,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  saveButtonIncomplete: {
    opacity: 0.62,
  },
  saveButtonPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.99 }],
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
