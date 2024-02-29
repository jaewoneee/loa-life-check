const DefaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(20, 20, 20)',
    background: 'rgb(255, 255, 255)',
    text: 'rgb(31, 31, 31)',
    card: 'rgb(1, 42, 65)',
    border: '',
    notification: 'rgb(255, 69, 58)',
    point: 'rgb(1, 76, 117)',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(0, 17, 26)',
    text: 'rgb(200, 200, 200)',
    card: 'rgb(1, 42, 65)',
    border: 'rgb(0, 34, 52)',
    notification: 'rgb(255, 69, 58)',
    point: 'rgb(1, 76, 117)',
  },
};

export type Theme = typeof DefaultTheme;

export { DefaultTheme, DarkTheme };
