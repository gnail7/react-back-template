import { ThemeProvider } from 'antd-style'
import getThemeByAppearance from './theme.js'
import Global from '../assets/styles/global.js'
import { useSelector, useDispatch } from 'react-redux'
import { setThemeMode } from '../store/feature/user.js'
import { useEffect } from 'react'
import { useTheme } from 'antd-style/lib/index.js'

const CustomThemeProvider = ({ children }) => {
  const { themeMode } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const theme = useTheme()
  useEffect(() => {
    const localThemeMode = localStorage.getItem('themeMode') ? localStorage.getItem('themeMode') : 'auto'
    dispatch(setThemeMode(localThemeMode))

    theme.appearance = localThemeMode
  }, [themeMode])

  return (
    <ThemeProvider themeMode={themeMode} theme={(themeMode) => getThemeByAppearance(themeMode)}>
      <Global />
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
