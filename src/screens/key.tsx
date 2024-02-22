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
import * as SecureStore from 'expo-secure-store';
import { useLostArkNews } from '@src/api/api';
import { getStoreData, deleteStoreData, saveStoreData } from '@src/libs/utils';

export default function KeyScreen({ navigation }: { navigation: any }) {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isApiKeySaved, setApiKeySaved] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string | undefined>(
    undefined,
  );
  const { mutate: news } = useLostArkNews();

  const OpenURLButton = () => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(URL);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
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

    // 뉴스 조회가 되지 않을시 유효한 api key가 아님
    news(undefined, {
      onSuccess: () => {
        setApiKeySaved(true);
      },
      onError: (err) => {
        alert('API KEY를 확인해 주세요');
        deleteStoreData('api_key');
      },
    });
  };

  const saveCharacterName = async () => {
    if (!characterName) return alert('캐릭터명을 입력해 주세요');
    // 대표 캐릭터명 저장
    await SecureStore.setItemAsync('character', characterName as string);
    navigation.navigate('Main');
  };

  useEffect(() => {
    async function getStoredAllData() {
      const key = await getStoreData('api_key');
      const character = await getStoreData('character');

      if (key && !character) setApiKeySaved(true);
      if (key && character) navigation.navigate('Main');
    }

    getStoredAllData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로아 생활 체크</Text>
      {!isApiKeySaved ? (
        <>
          <Text style={styles.text}>
            로생첵 서비스 이용을 위해 로스트아크 API KEY가 필요합니다.
          </Text>
          <TextInput
            placeholder="API KEY를 입력해 주세요"
            style={styles.input}
            value={apiKey}
            onChangeText={(val) => setApiKey(val)}
          />
          <CommonButton text={'다음'} callback={checkApiKeyAvailability} />
          <View style={styles.linkBox}>
            <Text style={styles.text}>로스트아크 API KEY가 없으시다면?</Text>
            <OpenURLButton />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.text}>대표 캐릭터명을 입력해 주세요</Text>
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
