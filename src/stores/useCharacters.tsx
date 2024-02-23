import { CharacterListTypes } from '@src/types/characters';
import { create } from 'zustand';

interface CharacterStoreInterface {
  mainCharacter: string;
  characters: CharacterListTypes[] | [];
  serverList: { label: string; value: string }[] | [];
  setMainCharacter: (a: string) => void;
  setCharacters: (a: CharacterListTypes[]) => void;
  setServerList: (a: { label: string; value: string }[]) => void;
}

const useCharacterStore = create<CharacterStoreInterface>((set) => ({
  mainCharacter: '',
  characters: [],
  serverList: [],
  setMainCharacter: (mainCharacter) => set({ mainCharacter }),
  setCharacters: (characters: CharacterListTypes[]) => set({ characters }),
  setServerList: (serverList: { label: string; value: string }[]) =>
    set({ serverList }),
}));

export default useCharacterStore;
