import { SunOutlined, MoonOutlined } from '@ant-design/icons'
/**
 * @param
 * @description 控制主题切换
 * @returns Theme component
 */

export default function ThemeIcon({ theme, lightIcon = SunOutlined, darkIcon = MoonOutlined, setTheme }) {
  const RenderIcon = theme === 'light' ? lightIcon : darkIcon
  const changeTheme = () => {
    setTheme()
  }

  return (
    <div className="hover-placeholder">
      <RenderIcon className="cursor-pointer" onClick={changeTheme} />
    </div>
  )
}
