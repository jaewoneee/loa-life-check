import axiosFetch from '@src/config/axios';
import { URL } from '@src/constants/url';
import { QueryClient } from '@tanstack/react-query';

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

export { useLostArkNews, useUserCharacterList };
