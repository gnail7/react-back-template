import React from 'react'
import { Flex } from 'antd'
import { createStyles } from 'antd-style'
import ThemeIcon from '../ThemeIcon'
import { useDispatch } from 'react-redux'
import {toggleThemeMode} from '@/store/feature/user'
import { Space } from 'antd'
import LanIcon from '../LanIcon'

const style = createStyles((token) => ({
  logo: {
    fontSize: 20,
    fontWeight: 600,
    background: token.colorBgContainer,
  },
  header: {
    width: '190px'
  }
}))

export default function HeaderBar({theme}) {
  const dispatch = useDispatch()

  return (
    <Flex className={['container', 'pd'].join(' ')} align='center' justify="space-between" >
      <Flex align='center' justify='center' className={style.header} style={{width: '190px'}}>LOGO</Flex>
      <Space size={20} style={{ height: 'auto' }}>
        <LanIcon />
        <ThemeIcon theme={theme} setTheme={() => dispatch(toggleThemeMode())}></ThemeIcon>
      </Space>
    </Flex>
  )
}
