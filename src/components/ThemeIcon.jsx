import React from 'react'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
/**
 * @param 
 * @description 控制主题切换
 * @returns Theme component
 */
export default function ThemeIcon({theme, lightIcon = SunOutlined, darkIcon = MoonOutlined, setTheme}) {
  const RenderIcon = theme === 'light' ? lightIcon : darkIcon
  const a = 1
  const changeTheme = () => {
    console.log('change theme', theme)
    setTheme()
  }

  return (
    <RenderIcon className='cursor-pointer' onClick={changeTheme}/>
  )
}
