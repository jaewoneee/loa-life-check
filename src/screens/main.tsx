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
import { useQueryClient } from '@tanstack/react-query';
import { useUserCharacterList } from '@src/api/api';

export default function MainScreen({ navigation }: { navigation: any }) {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { characters, serverList, setCharacters, setServerList } =
    useCharacterStore();
  const [currentServer, setCurrentServer] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState<string | undefined>(
    undefined,
  );
  const { refetch } = useUserCharacterList(characterName as string);
  const characterData: CharacterListTypes[] | undefined =
    queryClient.getQueryData(['character', characterName]);

  const getAllServers = (data: CharacterListTypes[]) => {
    const rawList = data.map((v) => v.ServerName);
    const serverList = [...new Set(rawList)].map((v) => {
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
    const setStateValue = async () => {
      const name = await getStoreData('character');
      setCharacterName(name as string);
    };

    setStateValue();
  }, []);

  useEffect(() => {
    async function fetchCharacterList() {
      const storedServer = currentServer || (await getStoreData('server'));

      if (!characterData) refetch();
      if (characterData) {
        const serverList = getAllServers(characterData);
        const filteredData = filterCharacters(
          characterData,
          storedServer as string,
        );

        setServerList(serverList);
        setCurrentServer(storedServer as string);
        setCharacters(filteredData);
      }
    }

    fetchCharacterList();
  }, [characterData]);

  if (!characterData) return null;

  return (
    <SafeAreaView style={styles.container}>
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
          style={styles.input}
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
    paddingTop: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
    color: '#333333',
  },
  text: {
    textAlign: 'center',
  },
  input: {
    borderColor: '#6c6c6c',
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
