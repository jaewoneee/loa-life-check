import { CharacterListTypes } from '@src/types/characters';
import { create } from 'zustand';

interface CharacterStoreInterface {
  characters: CharacterListTypes[] | [];
  serverList: { label: string; value: string }[] | [];
  setCharacters: (a: CharacterListTypes[]) => void;
  setServerList: (a: { label: string; value: string }[]) => void;
}

const useCharacterStore = create<CharacterStoreInterface>((set) => ({
  characters: [],
  serverList: [],
  setCharacters: (characters: CharacterListTypes[]) => set({ characters }),
  setServerList: (serverList: { label: string; value: string }[]) =>
    set({ serverList }),
}));

export default useCharacterStore;
