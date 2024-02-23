import { getStoreData } from '@src/libs/utils';
import { API_KEY } from '@src/constants/key';
import axios, { AxiosRequestConfig } from 'axios';
import handleAxiosError from './error';

const axiosFetch = async ({
  url,
  method = 'get',
  data,
}: {
  url: string;
  method?: string;
  data?: any;
}) => {
  const storedKey = await getStoreData('api_key');

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

  const result = await axios(sendOption)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const { status } = err.response;
      handleAxiosError(status);
    });

  return result;
};

export default axiosFetch;
