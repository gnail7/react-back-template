import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
export default function InternationalProvider({ children }) {
  const { i18n } = useTranslation()
  useEffect(() => {
    dayjs.locale(i18n.language === 'en' ? 'en' : 'zh-cn')
  }, [i18n.language])
  return (
    <ConfigProvider locale={i18n.language === 'en' ? enUS : zhCN}>{children}</ConfigProvider>
  )
}
