import colors from '@/theme/colors';
import spacing from '@/theme/spacing';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  text: {
    fontSize: 14,
    color: colors.text,
  },
});