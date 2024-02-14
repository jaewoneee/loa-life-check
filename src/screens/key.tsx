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

export default function KeyScreen() {
  const [apiKey, setApiKey] = useState('');

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로아 생활 체크</Text>
      <Text style={styles.text}>
        로생첵 서비스 이용을 위해 로스트아크 API KEY가 필요합니다.
      </Text>
      <TextInput
        placeholder="API KEY를 입력해 주세요"
        style={styles.input}
        value={apiKey}
        onChangeText={(val) => setApiKey(val)}
      />
      <CommonButton text={'확인'} />
      <View style={styles.linkBox}>
        <Text style={styles.text}>로스트아크 API KEY가 없으시다면?</Text>
        <OpenURLButton />
      </View>
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
