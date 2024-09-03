import { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { menuList } from './mock/menu'
import { MenuIcon } from './config.js'

const traverseMenuList = (menuList) => {
  const updatedMenuList = menuList.map((element) => {
    const key = 'menu-' + element.key
    const IconComponent = MenuIcon[element.icon]
    return {
      ...element,
      key,
      label: element.label,
      icon: IconComponent ? <IconComponent /> : null,
      children: element.children ? traverseMenuList(element.children) : null,
    }
  })
  return updatedMenuList
}

const SiderBar = () => {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    const fetchMenuItems = () => {
      const updatedMenuList = traverseMenuList(menuList)
      setMenuItems(updatedMenuList)
    }

    fetchMenuItems()
  }, [])

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
      items={menuItems}
    />
  )
}

export default SiderBar
