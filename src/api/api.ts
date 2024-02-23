import axiosFetch from '@src/config/axios';
import { URL } from '@src/constants/url';
import { CharacterListTypes } from '@src/types/characters';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const getLostArkNews = async () =>
  await axiosFetch({
    url: `${URL}/news/notices`,
  });

const useLostArkNews = () =>
  useQuery({
    queryKey: ['news'],
    queryFn: getLostArkNews,
    enabled: false,
  });

const getUserCharacterList = async (name: string) =>
  await axiosFetch({
    url: `${URL}/characters/${name}/siblings`,
  });

const useUserCharacterList = (
  name: string,
): UseQueryResult<CharacterListTypes[]> =>
  useQuery({
    queryKey: ['character', name],
    queryFn: () => getUserCharacterList(name as string),
    enabled: false,
  });

export { useLostArkNews, useUserCharacterList };
