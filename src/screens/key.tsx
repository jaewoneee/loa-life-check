import { getLostArkNews, getUserCharacterList } from '@src/api/character';
import CommonButton from '@src/components/common/button';
import { URL } from '@src/constants/url';
import { useCallback, useState } from 'react';
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

export default function KeyScreen({ navigation }: { navigation: any }) {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isApiKeyConfirmed, setApiKeyConfirmed] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string | undefined>(
    undefined,
  );
  const news = getLostArkNews();
  const { mutate: list } = getUserCharacterList();

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

  const saveApiKeyStorage = async () => {
    await SecureStore.setItemAsync('api_key', apiKey as string);
    console.log('saved');
  };

  const checkApiKeyAvailability = () => {
    if (!apiKey) return alert('API KEY가 입력되지 않았습니다');

    saveApiKeyStorage();
    news.mutate();

    if (news.isSuccess) setApiKeyConfirmed(true);
    if (news.isError) alert('Fail');
  };

  const fetchUserCharaterList = () => {
    if (!characterName) return;
    list(characterName, {
      onSuccess: (data) => {
        console.log('data', data);
        navigation.navigate('Main');
      },
      onError: (err) => console.error(err),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로아 생활 체크</Text>
      {!isApiKeyConfirmed ? (
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
          <CommonButton text={'확인'} callback={fetchUserCharaterList} />
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
