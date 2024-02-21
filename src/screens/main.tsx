import { useUserCharacterList } from '@src/api/api';
import { deleteStoreData, getStoreData, saveStoreData } from '@src/libs/utils';
import useCharacterStore from '@src/stores/useCharacters';
import { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import CharacterBox from '@src/components/character';
import { CharacterListTypes } from '@src/types/characters';

export default function MainScreen({ navigation }: { navigation: any }) {
  const { mutate, data } = useUserCharacterList();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { characters, serverList, setCharacters, setServerList } =
    useCharacterStore();
  const [currentServer, setCurrentServer] = useState<string | null>(null);

  const getAllServers = (data: CharacterListTypes[]) => {
    const rawList = data.map((v) => v.ServerName);
    const serverList = Array.from(new Set(rawList)).map((v) => {
      return { label: v, value: v };
    });

    return serverList;
  };

  const filterCharacters = (data: CharacterListTypes[], mainServer: string) => {
    // 유저가 입력한 대표캐릭터의 서버를 기준으로 한다
    const charactersByServer = data.filter((v) => v.ServerName === mainServer);

    // 레벨순으로 캐릭터를 재정렬한다
    const characatersByLevel = charactersByServer.sort(
      (a, b) =>
        Number(b.ItemMaxLevel.replace(',', '')) -
        Number(a.ItemMaxLevel.replace(',', '')),
    );

    return characatersByLevel;
  };

  useEffect(() => {
    if (currentServer && data) {
      saveStoreData('server', currentServer);
      const filteredData = filterCharacters(data, currentServer);
      setCharacters(filteredData);
    }
  }, [currentServer]);

  useEffect(() => {
    async function fetchCharacterList() {
      const name = await getStoreData('character');
      const storedServer = await getStoreData('server');

      if (name) {
        mutate(name, {
          onSuccess: (data: CharacterListTypes[]) => {
            let server;

            if (storedServer) {
              server = storedServer;
            } else {
              server = data.find((v) => v.CharacterName === name)?.ServerName;
            }

            saveStoreData('server', server);
            setCurrentServer(server as string);

            const filteredData = filterCharacters(data, server as string);
            const serverList = getAllServers(data);

            setCharacters(filteredData);
            setServerList(serverList);
          },
          onError: (err) => {
            console.error(err);
            deleteStoreData('server');
            deleteStoreData('characater');
          },
        });
      }
    }

    fetchCharacterList();
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => deleteStoreData('character')}>
        <Text>서버 초기화</Text>
      </TouchableOpacity>
      <View style={styles.top}>
        <Text style={styles.title}>레이드 현황</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownBox}>
        <DropDownPicker
          open={isOpen}
          value={currentServer}
          items={serverList}
          setOpen={setOpen}
          setValue={setCurrentServer}
        />
      </View>
      {/* 상위 6개 캐릭터만 보여주기 */}
      <FlatList
        style={styles.list}
        data={characters.slice(0, 6)}
        keyExtractor={(item) => item.CharacterName}
        renderItem={({ item }) => <CharacterBox data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBox: {
    marginTop: 16,
    position: 'relative',
    zIndex: 100,
  },
  list: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    padding: 16,
    borderRadius: 8,
  },
  linkBox: {
    marginTop: 20,
    gap: 12,
  },
  link: {
    color: 'orange',
    textAlign: 'center',
    fontWeight: '600',
  },
});
