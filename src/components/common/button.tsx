import { TouchableHighlight, Text, StyleSheet } from 'react-native';

export default function CommonButton({
  text,
  callback,
}: {
  text: string;
  callback?: () => void;
}) {
  return (
    <TouchableHighlight onPress={callback} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#333333',
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
