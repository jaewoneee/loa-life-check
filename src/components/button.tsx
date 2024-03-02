import { useTheme } from '@react-navigation/native';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

export default function CommonButton({
  text,
  callback,
}: {
  text: string;
  callback?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <TouchableHighlight
      onPress={callback}
      style={{ ...styles.container, backgroundColor: colors.card }}
    >
      <Text style={{ ...styles.text }}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f9fafb',
  },
});
