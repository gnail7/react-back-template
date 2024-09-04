// 登录拦截
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserInfoFromToken } from '@/api/userServer'
import { useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useToken } from './useToken'
import { setMenuList, setBtnPermissions } from '@/store/feature/global'
import { setUser } from '@/store/feature/user'

export function useLoginInterceptor() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user)
  const { t } = useTranslation()
  const { getToken, removeToken } = useToken()
  useEffect(() => {
    if (userInfo.hasLogin) {
      if (location.pathname == '/login') {
        navigate('/home', { state: { from: location.pathname } })
      }
    } else {
      if (getToken()) {
        getUserInfoFromToken().then((res) => {
          const { menus, user, buttons } = res.data
          dispatch(setMenuList(menus))
          dispatch(setUser(user))
          dispatch(setBtnPermissions(buttons))
          location.pathname === '/login' && navigate('/home', { state: { from: location.pathname } })
        }).catch(() => {
          removeToken()
          message.info('登录凭证已过期，请重新登录')
          navigate('/login', { state: { from: location.pathname }, replace: true })
        })
      } else {
        if (location.pathname !== '/login') {
          message.info(t('loginHint'))
          navigate('/login', { state: { from: location.pathname }, replace: true })
        }
      }
    }
  }, [location.pathname])
}
