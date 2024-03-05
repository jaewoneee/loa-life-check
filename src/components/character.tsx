import { useTheme } from '@react-navigation/native';
import { RaidDataTypes, raidData } from '@src/data/raid';
import { CharacterListTypes } from '@src/types/characters';
import { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function CharacterBox({
  data,
  lastItem,
}: {
  data: CharacterListTypes;
  lastItem: boolean;
}) {
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

  const checkRaid = useCallback((raid: RaidDataTypes) => {
    const targetRaid = raidList.find((v) => v.name === raid.name);

    if (!targetRaid) return;
    targetRaid.isChecked = !targetRaid.isChecked;

    setRaidList((state) => {
      const newArray = new Set([...state, targetRaid]);
      return [...newArray];
    });
  }, []);

  useEffect(() => {
    const raids = availableRaidList();
    if (raids) setRaidList(raids);
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        borderBottomColor: colors.border,
        borderBottomWidth: lastItem ? 0 : 1,
      }}
    >
      <View style={styles.name}>
        <Text style={{ ...styles.character, color: colors.text }}>
          {data.CharacterName}
        </Text>
        <Text style={{ ...styles.level, color: colors.title }}>
          {data.ItemMaxLevel}
        </Text>
      </View>
      <View style={styles.raid}>
        {raidList.map((item, index) => (
          <RaidCheckBox
            key={`${item.name}${index + 1}`}
            raid={item}
            lv={data.ItemMaxLevel}
            callback={checkRaid}
            lastItem={raidList.length - 1 === index}
          />
        ))}
        {/* <FlatList
          style={styles.raid}
          data={raidList}
          nestedScrollEnabled
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <RaidCheckBox
              raid={item}
              lv={data.ItemMaxLevel}
              callback={checkRaid}
              firstItem={index === 0}
            />
          )}
        /> */}
      </View>
    </View>
  );
}

function RaidCheckBox({
  lv,
  raid,
  callback,
  lastItem,
}: {
  lv: string;
  raid: RaidDataTypes;
  callback: (raid: RaidDataTypes) => void;
  lastItem: boolean;
}) {
  const { colors } = useTheme();
  const level = Number(lv.replaceAll(',', ''));

  const checkboxProps = (text: string) => ({
    size: 20,
    fillColor: colors.point,
    unfillColor: colors.border,
    text,
    style: { marginBottom: lastItem ? 0 : 14 },
    onPress: () => callback(raid),
    isChecked: raid.isChecked,
    innerIconStyle: { borderWidth: 0 },
    textStyle: { fontSize: 14, color: colors.text },
  });

  const renderCheckbox = (text: string) => (
    <BouncyCheckbox {...checkboxProps(text)} />
  );

  const renderBrelshaza = () => {
    if (raid.phase === 2) {
      return (
        <>
          {renderCheckbox(`${raid.name} ${raid.difficulty} 1-2`)}
          {renderCheckbox(`${raid.name} ${level >= 1550 ? '하드' : '노말'} 3`)}
          {renderCheckbox(`${raid.name} ${level >= 1560 ? '하드' : '노말'} 4`)}
        </>
      );
    }

    return (
      <>
        {renderCheckbox(`${raid.name} ${raid.difficulty} 1-3`)}
        {renderCheckbox(`${raid.name} ${level >= 1560 ? '하드' : '노말'} 4`)}
      </>
    );
  };

  const renderKamen = () => {
    if (raid.phase === 4) {
      return (
        <>
          {renderCheckbox(`${raid.name} ${raid.difficulty} 1-3`)}
          {renderCheckbox(`${raid.name} 하드 4`)}
        </>
      );
    }

    return <>{renderCheckbox(`${raid.name} ${raid.difficulty} 1-3`)}</>;
  };

  if (raid.name === '아브렐슈드') {
    return renderBrelshaza();
  }

  if (raid.name === '카멘') {
    return renderKamen();
  }

  return <>{renderCheckbox(`${raid.name} ${raid.difficulty}`)}</>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    flex: 1,
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
  raid: { flex: 1, flexDirection: 'column' },
});

// VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc.
// 불필요한 렌더링 방지용

export default memo(CharacterBox);
