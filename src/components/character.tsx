import { View, Text, StyleSheet } from 'react-native';

export default function CharacterBox({ data }: { data: CharacterListTypes }) {
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text>{data.CharacterName}</Text>
        <Text>{data.ItemMaxLevel}</Text>
      </View>
      <View style={styles.raid}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'skyblue', marginBottom: 10 },
  name: {
    flexDirection: 'column',
  },
  raid: {},
});
