import { API_KEY } from '@src/constants/key';
import axios, { AxiosRequestConfig } from 'axios';
import { getApiKey } from '../lib/utils.js';

const axiosFetch = async ({
  url,
  method = 'get',
  data,
}: {
  url: string;
  method?: string;
  data?: any;
}) => {
  const storedKey = await getApiKey().then((res) => res?.replaceAll('"', ''));

  if (!storedKey) console.log('no saved key');

  const sendOption: AxiosRequestConfig = {
    url,
    method,
    headers: {
      Authorization: `bearer ${storedKey}`,
    },
  };
  console.log(`bearer ${storedKey}`, sendOption);

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
  console.log('result===>', result.data);
  return result.data;
};

export default axiosFetch;
