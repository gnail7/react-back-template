import { ThemeProvider } from 'antd-style'
import { useSelector } from 'react-redux'
import getThemeByAppearance from './theme.js'
import { useTheme } from 'antd-style'
import Global from '../assets/styles/global.js'
const CustomThemeProvider = ({ children }) => {
  const theme = useTheme()
  console.log(theme)
  const themeMode = useSelector((state) => state.user.themeMode);
  return (
    <ThemeProvider themeMode={themeMode} theme={(appearance) => getThemeByAppearance(appearance)}>
      <Global />
      {children}
    </ThemeProvider>
  )
};

export default CustomThemeProvider;
