import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuIcon } from './config.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { setBreadCrumbList } from '../../store/feature/global.js'
import { Menu } from 'antd'
import { isEmpty } from 'lodash-es'

const traverseMenuList = (menuList) => {
  const updatedMenuList = menuList.map((element) => {
    const key = isEmpty(element.resourceUrl) ? `${element.resourceName}-${element.resourceId}` : element.resourceUrl
    const IconComponent = MenuIcon[element.resourceIcon]
    return {
      key,
      label: element.resourceName,
      icon: IconComponent ? <IconComponent /> : null,
      children: element.children ? traverseMenuList(element.children) : null,
    }
  })
  return updatedMenuList
}

// 根据key值找到在menuList中的路径
const findBreadCrumbList = (menuList, keyPath) => {
  function findRecursive(menuList, keyPath) {
    for (let i = 0; i < menuList.length; i++) {
      const element = menuList[i]
      const newPath = [element]// 更新路径

      if (element.resourceUrl === keyPath) {
        return newPath // 找到目标路径
      }

      if (element.children) {
        const result = findRecursive(element.children, keyPath, newPath)
        if (result) {
          return [...newPath, ...result] // 确保路径从根到目标的顺序
        }
      }
    }
    return null
  }
  return findRecursive(menuList, keyPath)
}

const SiderBar = () => {
  const [menuItems, setMenuItems] = useState([])
  const { menuList } = useSelector((state) => state.global)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchMenuItems = useCallback(() => {
    const updatedMenuList = traverseMenuList(menuList)
    setMenuItems(updatedMenuList)
  }, [menuList.length])

  useEffect(() => {
    fetchMenuItems()
  }, [menuList.length])

  useEffect(() => {
    const breadCrumbList = findBreadCrumbList(menuList, location.pathname)
    dispatch(setBreadCrumbList(breadCrumbList))
  }, [location.pathname])

  const handleMenuClick = (e) => {
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
