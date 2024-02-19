import { useUserCharacterList } from '@src/api/api';
import { deleteStoredData, getStoredData } from '@src/libs/utils';
import useCharacterStore from '@src/stores/useCharacters';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MainScreen({ navigation }: { navigation: any }) {
  const { mutate } = useUserCharacterList();
  const [list, setList] = useState<CharacterListTypes | []>([]);
  const { characters, setCharacters, setServer } = useCharacterStore();

  useEffect(() => {
    async function fetchCharacterList() {
      const name = await getStoredData('character').then((res) =>
        res?.replaceAll('"', ''),
      );

      if (name) {
        mutate(name, {
          onSuccess: (data: CharacterListTypes) => {
            console.log('data', data);
            const mainServer = data.find(
              (v) => v.CharacterName === name,
            )?.ServerName;

            setList(data);
            setCharacters(data);
            setServer(mainServer as string);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text>레이드 현황</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
