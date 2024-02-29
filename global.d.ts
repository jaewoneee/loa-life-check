import { Theme } from './src/styles/theme';

declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
