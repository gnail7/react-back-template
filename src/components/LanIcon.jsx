import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanIcon() {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language
  const lanIconName = currentLanguage === 'en' ? 'icon-zhongyingwenyingwen-01' : 'icon-zhongwen2-02'
  const toggleLanguage = () => {
    i18n.changeLanguage(currentLanguage === 'en' ? 'zh' : 'en')
  }

  return (
    <div className='hover-placeholder flex-center'>
      <i className={['iconfont', lanIconName, 'cursor-pointer'].join(' ')} onClick={() => toggleLanguage()}></i>
    </div>
  )
}
