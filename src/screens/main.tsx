import { useUserCharacterList } from '@src/api/api';
import { deleteStoredData, getStoredData } from '@src/libs/utils';
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

export default function MainScreen({ navigation }: { navigation: any }) {
  const { mutate, data } = useUserCharacterList();
  const [isOpen, setOpen] = useState<boolean>(false);
  const {
    characters,
    server,
    serverList,
    setCharacters,
    setServer,
    setServerList,
  } = useCharacterStore();
  const [currentServer, setCurrentServer] = useState<string | ''>(server || '');

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
    if (data) {
      const filteredData = filterCharacters(data, currentServer);
      setCharacters(filteredData);
      setServer(currentServer);
    }
  }, [currentServer]);

  useEffect(() => {
    async function fetchCharacterList() {
      const name = await getStoredData('character').then((res) =>
        res?.replaceAll('"', ''),
      );

      if (name) {
        mutate(name, {
          onSuccess: (data: CharacterListTypes[]) => {
            const mainServer = data.find(
              (v) => v.CharacterName === name,
            )?.ServerName;

            if (!mainServer) return null;

            const filteredData = filterCharacters(data, currentServer);
            const serverList = getAllServers(data);

            // setList(data);
            setCharacters(filteredData);
            setServer(mainServer);
            setServerList(serverList);
          },
          onError: (err) => {
            console.error(err);
            deleteStoredData('characater');
          },
        });
      }
    }

    fetchCharacterList();
    return () => {};
  }, []);

  console.log('11', characters, currentServer);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text>레이드 현황</Text>
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
      <FlatList
        style={styles.list}
        data={characters}
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
    backgroundColor: 'red',
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginTop: 24,
    gap: 12,
  },
  link: {
    color: 'orange',
    textAlign: 'center',
    fontWeight: '600',
  },
});
