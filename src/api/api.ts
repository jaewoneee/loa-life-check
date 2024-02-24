import axiosFetch from '@src/config/axios';
import { URL } from '@src/constants/url';
import { CharacterListTypes } from '@src/types/characters';
import { QueryClient, UseQueryResult, useQuery } from '@tanstack/react-query';

const getLostArkNews = async () =>
  await axiosFetch({
    url: `${URL}/news/notices`,
  });

const getUserCharacterList = async (name: string) =>
  await axiosFetch({
    url: `${URL}/characters/${name}/siblings`,
  });

const useLostArkNews = async (qc: QueryClient) => {
  return await qc.fetchQuery({
    queryKey: ['news'],
    queryFn: getLostArkNews,
  });
};

const useUserCharacterList = async (qc: QueryClient, characterName: string) => {
  return await qc.fetchQuery({
    queryKey: ['character', characterName],
    queryFn: () => getUserCharacterList(characterName),
  });
};

// const useUserCharacterList = (
//   name: string,
// ): UseQueryResult<CharacterListTypes[]> =>
//   useQuery({
//     queryKey: ['character', name],
//     queryFn: () => getUserCharacterList(name as string),
//     enabled: false,
//   });

export {
  getLostArkNews,
  getUserCharacterList,
  useLostArkNews,
  useUserCharacterList,
};
