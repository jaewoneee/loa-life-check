import CommonButton from '@src/components/button';
import { deleteStoreData, getStoreData } from '@src/libs/utils';
import useCharacterStore from '@src/stores/useCharacters';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<{
    key?: string;
    name?: string;
  }>({});

  const deleteAllStoredData = async () => {
    await deleteStoreData('api_key');
    await deleteStoreData('character');
    await deleteStoreData('server');
    navigation.navigate('ApiKey');
  };

  const confirmDeletingData = () =>
    Alert.alert('설정 초기화', '설정값을 초기화 하시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteAllStoredData() },
    ]);

  useEffect(() => {
    async function getAllStoredData() {
      const key = await getStoreData('api_key');
      const name = await getStoreData('character');

      if (key && name) setData({ key, name });
    }
    getAllStoredData();
  }, []);

  if (!data.key && !data.name) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>나의 API KEY</Text>
        <Text
          style={styles.value}
        >{`${data.key?.slice(0, 10)}...${data.key?.slice(-10)}`}</Text>
      </View>
      <View style={[styles.box, styles.noBorder]}>
        <Text style={styles.title}>나의 대표 캐릭터</Text>
        <Text style={styles.value}>{data.name}</Text>
      </View>
      <CommonButton text={'설정 초기화'} callback={confirmDeletingData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  box: {
    gap: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cbcbcb',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 18,
  },
  value: { fontSize: 20, fontWeight: '600' },
});
