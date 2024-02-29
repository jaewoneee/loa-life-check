import CommonButton from '@src/components/button';
import { URL } from '@src/constants/url';
import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserCharacterList, useLostArkNews } from '@src/api/api';
import { getStoreData, deleteStoreData, saveStoreData } from '@src/libs/utils';
import { useQueryClient } from '@tanstack/react-query';
import { CharacterListTypes } from '@src/types/characters';
import { useTheme } from '@react-navigation/native';

export default function KeyScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isApiKeySaved, setApiKeySaved] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string | undefined>(
    undefined,
  );

  const OpenURLButton = () => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(URL);

      if (supported) {
        await Linking.openURL(URL);
      } else {
        Alert.alert(`Don't know how to open this URL: ${URL}`);
      }
    }, [URL]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>API KEY 확인하기</Text>
      </TouchableOpacity>
    );
  };

  const checkApiKeyAvailability = async () => {
    if (!apiKey) return alert('API KEY가 입력되지 않았습니다');

    // api key 저장
    saveStoreData('api_key', apiKey);

    try {
      const newsData = await useLostArkNews(queryClient);

      if (newsData) {
        setApiKeySaved(true);
      }

      if (!newsData) {
        deleteStoreData('api_key');
        alert('API KEY를 확인해 주세요.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveCharacterName = async () => {
    if (!characterName) return alert('캐릭터명을 입력해 주세요');

    try {
      const characterData: CharacterListTypes[] | undefined =
        await useUserCharacterList(queryClient, characterName);
      console.log(2);
      if (characterData) {
        const targetCharacter = characterData.find(
          (v) => v.CharacterName === characterName,
        );

        if (!targetCharacter) return;
        console.log('fetched character');
        saveStoreData('server', targetCharacter.ServerName);
        saveStoreData('character', targetCharacter.CharacterName);

        navigation.navigate('Main');
      }

      if (!characterData) {
        deleteStoreData('character');
        alert('존재하지 않는 캐릭터명입니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getStoredAllData = async () => {
      const key = await getStoreData('api_key');
      const character = await getStoreData('character');

      console.log('저장된 값', key, character, isApiKeySaved);

      if (key && !character) setApiKeySaved(false);
      if (key && character) navigation.navigate('Main');
    };
    console.log(1);
    getStoredAllData();
  }, []);

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <Text style={{ ...styles.title, color: colors.point }}>
        로아 생활 체크
      </Text>
      {!isApiKeySaved ? (
        <>
          <Text style={{ ...styles.text, color: colors.text }}>
            로생첵 서비스 이용을 위해 로스트아크 API KEY가 필요합니다.
          </Text>
          <TextInput
            placeholder="API KEY를 입력해 주세요"
            style={{
              ...styles.input,
              borderColor: colors.border,
              color: colors.text,
            }}
            value={apiKey}
            onChangeText={(val) => setApiKey(val)}
          />
          <CommonButton text={'다음'} callback={checkApiKeyAvailability} />
          <View style={styles.linkBox}>
            <Text style={{ ...styles.text, color: colors.text }}>
              로스트아크 API KEY가 없으시다면?
            </Text>
            <OpenURLButton />
          </View>
        </>
      ) : (
        <>
          <Text style={{ ...styles.text, color: colors.text }}>
            대표 캐릭터명을 입력해 주세요
          </Text>
          <TextInput
            placeholder="캐릭터명"
            style={styles.input}
            value={characterName}
            onChangeText={(val) => setCharacterName(val)}
          />
          <CommonButton text={'확인'} callback={saveCharacterName} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    gap: 16,
    paddingTop: 200,
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
