import React from 'react'
import { useEffect } from 'react'
import { Flex, Dropdown, Space } from 'antd'
import { createStyles } from 'antd-style'
import { useDispatch, useSelector } from 'react-redux'
import { toggleThemeMode } from '@/store/feature/user'
import { useTranslation } from 'react-i18next'
import { UserOutlined } from '@ant-design/icons'

import LanIcon from '../LanIcon'
import ThemeIcon from '../ThemeIcon'

const getUserDropdown = (t, userInfo) => {
  return [
    {
      label: <div>{t('hello') + ' ' + (userInfo?.username ?? t('user'))}</div>,
      key: 'hello0',
    },
    {
      label: t('setting'),
      key: 'setting1',
    },
  ]
}

const style = createStyles((token) => ({
  logo: {
    fontSize: 20,
    fontWeight: 600,
    background: token.colorBgContainer,
  },
  header: {
    width: '190px',
  },
}))

const UserAvatar = () => {
  const user = useSelector((state) => state.user)
  const { t, i18n } = useTranslation()
  const [menuItems, setMenuItems] = React.useState([])
  useEffect(() => {
    const res = getUserDropdown(t, user)
    setMenuItems(res)
  }, [i18n.language])

  return (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Click me
          <UserOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default function HeaderBar() {
  const theme = useSelector((state) => state.user.themeMode)
  const dispatch = useDispatch()
  return (
    <Flex className={['container', 'pd'].join(' ')} align="center" justify="space-between">
      <Flex align="center" justify="center" className={style.header} style={{ width: '190px' }}>LOGO</Flex>
      <Space size={20} style={{ height: 'auto' }}>
        <LanIcon />
        <ThemeIcon theme={theme} setTheme={() => dispatch(toggleThemeMode())}></ThemeIcon>
        <UserAvatar />
      </Space>
    </Flex>
  )
}
