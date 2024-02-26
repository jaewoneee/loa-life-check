import { Theme } from '@react-navigation/native';

const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(20, 20, 20)',
    background: 'rgb(255, 255, 255)',
    text: 'rgb(31, 31, 31)',
    card: 'rgb(18, 18, 18)',
    border: 'rgb(25,25,25)',
    notification: 'rgb(255, 69, 58)',
  },
};

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(8, 8, 8)',
    text: 'rgb(200, 200, 200)',
    card: 'rgb(18, 18, 18)',
    border: 'rgb(50, 50, 50)',
    notification: 'rgb(255, 69, 58)',
  },
};

export { DefaultTheme, DarkTheme };
