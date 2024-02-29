import type { Theme } from './src/theme';

declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
