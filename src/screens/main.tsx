import { getStoreData } from '@src/libs/utils';
import useCharacterStore from '@src/stores/useCharacters';
import { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import CharacterBox from '@src/components/character';
import { CharacterListTypes } from '@src/types/characters';
import { useQueryClient } from '@tanstack/react-query';
import { useUserCharacterList } from '@src/api/api';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MainScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [characterList, setCharacterList] = useState<
    CharacterListTypes[] | null
  >(null);
  const [currentServer, setCurrentServer] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState<string | undefined>(
    undefined,
  );
  const { serverList, setServerList } = useCharacterStore();

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
    const fetchCharacterList = async () => {
      try {
        let cachedData = characterData;
        const storedServer = currentServer || (await getStoreData('server'));

        if (!characterData) {
          cachedData = await useUserCharacterList(
            queryClient,
            characterName as string,
          );
        }

        if (cachedData) {
          const serverList = getAllServers(cachedData);
          const filteredData = filterCharacters(
            cachedData,
            storedServer as string,
          );

          setCharacterList(filteredData);
          setServerList(serverList);
          setCurrentServer(storedServer as string);
        }
      } catch (error) {
        console.error('Error fetching character list:', error);
      }
    };

    fetchCharacterList();
  }, [currentServer]);

  if (!characterList) return;

  const dropDownPickerStyleProps = {
    style: {
      ...styles.input,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: 0,
    },
    containerStyle: { backgroundColor: colors.background },
    textStyle: { color: colors.primary, fontSize: 18 },
    listItemContainerStyle: {
      backgroundColor: colors.background,
      paddingHorizontal: 0,
    },
    listItemLabelStyle: { fontSize: 16 },
  };

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <SafeAreaView
        style={{ ...styles.container, backgroundColor: colors.background }}
      >
        <View style={styles.top}>
          <Text style={{ ...styles.title, color: colors.primary }}>
            레이드 현황
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.dropdownBox}>
          <DropDownPicker
            open={isOpen}
            value={currentServer}
            items={serverList}
            setOpen={setOpen}
            setValue={setCurrentServer}
            {...dropDownPickerStyleProps}
            ArrowDownIconComponent={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={26}
                style={{ color: colors.text }}
              />
            )}
          />
        </View>
        <FlatList
          style={styles.list}
          data={characterList}
          keyExtractor={(item) => item.CharacterName}
          renderItem={({ item }) => <CharacterBox data={item} />}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    marginVertical: 16,
    position: 'relative',
    zIndex: 100,
    padding: 0,
    width: 150,
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
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
  },
});
