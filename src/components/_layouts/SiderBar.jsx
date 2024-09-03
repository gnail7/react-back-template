import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuIcon } from './config.js'
import { useNavigate } from 'react-router-dom'
import { setBreadCrumbList } from '../../store/feature/global.js'
import { Menu } from 'antd'

const traverseMenuList = (menuList) => {
  const updatedMenuList = menuList.map((element) => {
    const key = element.key
    const IconComponent = MenuIcon[element.icon]
    return {
      key,
      label: element.name,
      icon: IconComponent ? <IconComponent /> : null,
      children: element.children ? traverseMenuList(element.children) : null,
    }
  })
  return updatedMenuList
}

const findBreadCrumbList = (menuList, keyPath) => {
  const acc = []
  menuList.forEach((element) => {
    if (keyPath.includes(element.key)) {
      acc.push({
        key: element.key,
        title: element.name,
      })
    }
    if (element.children) {
      acc.push(...findBreadCrumbList(element.children, keyPath))
    }
  })
  return acc
}

const SiderBar = () => {
  const [menuItems, setMenuItems] = useState([])
  const { menuList } = useSelector((state) => state.global)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMenuItems = () => {
      const updatedMenuList = traverseMenuList(menuList)
      setMenuItems(updatedMenuList)
    }

    fetchMenuItems()
  }, [])

  const handleMenuClick = (e) => {
    const breadCrumbList = findBreadCrumbList(menuList, e.keyPath)
    dispatch(setBreadCrumbList(breadCrumbList))
    navigate(e.key)
  }
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
      items={menuItems}
      onClick={handleMenuClick}
    />
  )
}

export default SiderBar
