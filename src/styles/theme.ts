const DefaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(50, 52, 56)',
    background: 'rgb(249, 250, 251)',
    title: 'rgb(50, 52, 56)',
    text: 'rgb(51, 61, 75)',
    card: 'rgb(1, 42, 65)',
    border: 'rgb(176, 184, 193)',
    notification: 'rgb(255, 69, 58)',
    point: 'rgb(4, 116, 176)',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(0, 17, 26)',
    title: 'rgb(255, 255, 255)',
    text: 'rgb(200, 200, 200)',
    card: 'rgb(1, 42, 65)',
    border: 'rgb(0, 38, 52)',
    notification: 'rgb(255, 69, 58)',
    point: 'rgb(4, 116, 176)',
  },
};

export type Theme = typeof DefaultTheme;

export { DefaultTheme, DarkTheme };
