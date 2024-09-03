// 登录拦截
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useToken } from './useToken'
export default function useLoginInterceptor() {
  const location = useLocation()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user)
  const { t } = useTranslation()
  const { getToken, removeToken } = useToken()

  useEffect(() => {
    if (userInfo.hasLogin) {
      if (location.pathname !== '/login') {
        navigate('/home', { state: { from: location.pathname } })
      }
    } else {
      if (getToken()) {
        removeToken()
        message.info('token已过期，请重新登录')
      } else {
        if (location.pathname !== '/login') {
          message.info(t('loginHint'))
          navigate('/login', { state: { from: location.pathname }, replace: true })
        }
      }
    }
  }, [])
}
