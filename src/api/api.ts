import axiosFetch from '@src/config/axios';
import { URL } from '@src/constants/url';
import { UseQueryResult, useMutation } from '@tanstack/react-query';

const getLostArkNews = async () =>
  await axiosFetch({
    url: `${URL}/news/notices`,
    method: 'get',
  });

const useLostArkNews = () =>
  useMutation({
    mutationFn: getLostArkNews,
  });

const getUserCharacterList = async (
  name: string,
): Promise<CharacterListTypes> =>
  await axiosFetch({
    url: `${URL}/characters/${name}/siblings`,
    method: 'get',
  });

const useUserCharacterList = () =>
  useMutation({
    mutationFn: (name: string) => getUserCharacterList(name),
  });

export { useLostArkNews, useUserCharacterList };
