import { useTheme } from '@react-navigation/native';
import { RaidDataTypes, raidData } from '@src/data/raid';
import { CharacterListTypes } from '@src/types/characters';
import { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function CharacterBox({ data }: { data: CharacterListTypes }) {
  const { colors } = useTheme();
  const [raidList, setRaidList] = useState<RaidDataTypes[] | []>([]);

  const availableRaidList = () => {
    const characterLevel = Number(data.ItemMaxLevel.replaceAll(',', ''));
    let raidArray: RaidDataTypes[] = [];

    raidData.map((v: RaidDataTypes) => {
      if (characterLevel >= v.ilvl) {
        const isIncluded = raidArray.find((x) => x.name === v.name);
        !isIncluded && raidArray.push({ ...v, isChecked: false });
      }
    });
    return raidArray;
  };

  const checkRaid = (raid: RaidDataTypes) => {
    const targetRaid = raidList.find((v) => v.name === raid.name);

    if (!targetRaid) return;
    targetRaid.isChecked = !targetRaid.isChecked;

    setRaidList((state) => {
      const newArray = new Set([...state, targetRaid]);
      return [...newArray];
    });
  };

  useEffect(() => {
    const raids = availableRaidList();
    if (raids) setRaidList(raids);
  }, []);

  return (
    <View style={{ ...styles.container, borderBottomColor: colors.border }}>
      <View style={styles.name}>
        <Text style={{ ...styles.character, color: colors.text }}>
          {data.CharacterName}
        </Text>
        <Text style={{ ...styles.level, color: colors.primary }}>
          {data.ItemMaxLevel}
        </Text>
      </View>
      <View style={styles.raid}>
        <FlatList
          data={raidList}
          renderItem={({ item }) => (
            <RaidCheckBox
              raid={item}
              lv={data.ItemMaxLevel}
              callback={checkRaid}
            />
          )}
        />
      </View>
    </View>
  );
}

function RaidCheckBox({
  lv,
  raid,
  callback,
}: {
  lv: string;
  raid: RaidDataTypes;
  callback: (raid: RaidDataTypes) => void;
}) {
  const { colors } = useTheme();
  const level = Number(lv.replaceAll(',', ''));

  const checkboxProps = (text: string) => ({
    size: 20,
    fillColor: colors.border,
    unfillColor: colors.border,
    text,
    onPress: () => callback(raid),
    style: styles.checkbox,
    isChecked: raid.isChecked,
    textStyle: { fontSize: 14, color: colors.text },
  });

  const renderCheckbox = (text: string) => (
    <BouncyCheckbox {...checkboxProps(text)} />
  );

  const renderBrelshaza = () => {
    if (raid.phase === 2) {
      return (
        <View>
          {renderCheckbox(`${raid.name} ${raid.difficulty} 1-2`)}
          {renderCheckbox(`${raid.name} ${level >= 1550 ? '하드' : '노말'} 3`)}
          {renderCheckbox(`${raid.name} ${level >= 1560 ? '하드' : '노말'} 4`)}
        </View>
      );
    }

    return (
      <View>
        {renderCheckbox(`${raid.name} ${raid.difficulty} 1-3`)}
        {renderCheckbox(`${raid.name} ${level >= 1560 ? '하드' : '노말'} 4`)}
      </View>
    );
  };

  const renderKamen = () => {
    if (raid.phase === 4) {
      return (
        <View>
          {renderCheckbox(`${raid.name} ${raid.difficulty} 1-3`)}
          {renderCheckbox(`${raid.name} 하드 4`)}
        </View>
      );
    }

    return <View>{renderCheckbox(`${raid.name} ${raid.difficulty} 1-3`)}</View>;
  };

  if (raid.name === '아브렐슈드') {
    return renderBrelshaza();
  }

  if (raid.name === '카멘') {
    return renderKamen();
  }

  return <View>{renderCheckbox(`${raid.name} ${raid.difficulty}`)}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,

    paddingVertical: 8,
  },
  name: {
    flexDirection: 'column',
    flex: 1,
  },
  character: {
    color: '#333333',
    fontSize: 16,
  },
  level: { fontWeight: 'bold', marginTop: 6 },
  raid: { flex: 1 },
  checkbox: { marginBottom: 6 },
});

// VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc.
// 불필요한 렌더링 방지용

export default memo(CharacterBox);
