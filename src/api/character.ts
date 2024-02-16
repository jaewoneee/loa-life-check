import axiosFetch from '@src/config/axios';
import { URL } from '@src/constants/url';
import { UseQueryResult, useMutation } from '@tanstack/react-query';

const getLostArkNews = () =>
  useMutation({
    mutationFn: () => {
      return axiosFetch({
        url: `${URL}/news/notices`,
        method: 'get',
      });
    },
  });

const getUserCharacterList = () =>
  useMutation({
    mutationFn: (name: string): Promise<CharacterListTypes> => {
      console.log(`${URL}/characters/${name}/siblings`);
      return axiosFetch({
        url: `${URL}/characters/${name}/siblings`,
        method: 'get',
      });
    },
  });

export { getLostArkNews, getUserCharacterList };
