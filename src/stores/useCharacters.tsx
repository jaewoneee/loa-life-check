import { create } from 'zustand';

interface CharacterStoreInterface {
  characters: CharacterListTypes | [];
  server: string | null;
  setCharacters: (a: CharacterListTypes) => void;
  setServer: (a: string) => void;
}

const useCharacterStore = create<CharacterStoreInterface>((set) => ({
  characters: [],
  server: null,
  setCharacters: (characters: CharacterListTypes) => set({ characters }),
  setServer: (server: string) => set({ server }),
}));

export default useCharacterStore;
