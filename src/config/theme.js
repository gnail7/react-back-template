const darkTheme = () => {
  return {
    token: {
      colorBgLayout: '#20252b',
      colorBgContainer: '#282c34',
      colorBgElevated: '#32363e',
    },
  }
}
const lightTheme = () => {
  return {
    token: {
      colorBgLayout: '#fff',
      colorBgContainer: 'pink',
      colorBgElevated: '#32363e',
    },
  }
}

export default function getThemeByAppearance(appearance) {
  if (appearance === 'dark') {
    return darkTheme;
  } else {
    return lightTheme;
  }
}
