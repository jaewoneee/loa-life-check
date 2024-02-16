import { API_KEY } from '@src/constants/key';
import axios, { AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosFetch = async ({
  url,
  method = 'get',
  data,
}: {
  url: string;
  method?: string;
  data?: any;
}) => {
  async function getApiKey() {
    let result = await SecureStore.getItemAsync('api_key');
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
      return JSON.stringify(result);
    } else {
      alert('No values stored under that key.');
    }
  }

  const sendOption: AxiosRequestConfig = {
    url,
    method,
    headers: {
      Authorization: `bearer ${getApiKey()}`,
    },
  };
  console.log(`bearer ${getApiKey()}`);

  if (data) {
    switch (method) {
      case 'get':
        sendOption.params = data;
        break;

      default:
        sendOption.data = data;
        break;
    }
  }

  const result = await axios(sendOption);

  return result.data;
};

export default axiosFetch;
