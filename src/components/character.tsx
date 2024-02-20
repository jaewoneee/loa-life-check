import { RaidDataTypes, raidData } from '@src/data/raid';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function CharacterBox({ data }: { data: CharacterListTypes }) {
  const availableRaidList = () => {
    const characterLevel = Number(data.ItemMaxLevel.replaceAll(',', ''));
    let raidArray: RaidDataTypes[] = [];

    raidData.map((v: RaidDataTypes) => {
      if (characterLevel >= v.ilvl) {
        if (raidArray.length < 3) {
          const isIncluded = raidArray.find((x) => x.name === v.name);
          !isIncluded && raidArray.push(v);
        }
      }
    });
    console.log('level', characterLevel, raidArray);
    return raidArray;
  };
  console.log(data);
  availableRaidList();
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text>{data.CharacterName}</Text>
        <Text>{data.ItemMaxLevel}</Text>
      </View>
      <View style={styles.raid}>
        <FlatList
          data={availableRaidList()}
          renderItem={({ item }) => <RaidSelect raid={item} />}
        />
      </View>
    </View>
  );
}

function RaidSelect({ raid }: { raid: RaidDataTypes }) {
  return (
    <View>
      <Text>{raid.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    flexDirection: 'column',
  },
  raid: {},
});
