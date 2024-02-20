import { create } from 'zustand';

interface CharacterStoreInterface {
  characters: CharacterListTypes[] | [];
  server: string | null;
  serverList: { label: string; value: string }[] | [];
  setCharacters: (a: CharacterListTypes[]) => void;
  setServer: (a: string) => void;
  setServerList: (a: { label: string; value: string }[]) => void;
}

const useCharacterStore = create<CharacterStoreInterface>((set) => ({
  characters: [],
  server: null,
  serverList: [],
  setCharacters: (characters: CharacterListTypes[]) => set({ characters }),
  setServer: (server: string) => set({ server }),
  setServerList: (serverList: { label: string; value: string }[]) =>
    set({ serverList }),
}));

export default useCharacterStore;
