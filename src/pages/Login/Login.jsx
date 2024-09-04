import { createStyles } from 'antd-style'
import { useTranslation } from 'react-i18next'
import { useRequest } from 'ahooks'
import { loginApi } from '@/api/userServer'
import { useNavigate } from 'react-router-dom'
import { setMenuList, setBtnPermissions } from '../../store/feature/global'
import { setUser } from '@/store/feature/user'
import { useDispatch } from 'react-redux'

import LoginBg from '@/assets/images/loginBg.svg'
import { Form, Input, Space, Card, Image, Button, Flex, message, Spin } from 'antd'
import GLink from '../../components/GLink/GLink'

const useStyles = createStyles(({ token, css }) => ({
  page: css`
    width: 100vw;
    height: 100vh;
    background: ${token.colorBgContainer};
    display: flex;
  `,
  leftContent: css`
    width: 50%;
    height: 100%;
    @media (max-width: 768px) {
      display: none;
    }
  `,
  rightContent: css`
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  card: css`
    max-width: 550px; 
    width: 100%; 
    max-height: 600px;
    box-sizing: border-box;
    aspect-ratio: 16 / 9; 

    @media (max-width: 768px) {
      max-width: 80%; 
    }
  `,
  bg: css`
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    @media (max-width: 768px) {
      display: block;
    }
  `,
}))

export default function Login() {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, run } = useRequest(loginApi, {
    manual: true,
    loadingDelay: 1000,
    onSuccess: (res) => {
      // 登录成功
      const { menus, user, buttons, token } = res.data
      dispatch(setMenuList(menus))
      dispatch(setUser(user))
      dispatch(setBtnPermissions(buttons))
      localStorage.setItem('token', JSON.stringify(token))
      message.success(t('loginSuccess'))
      navigate('/')
    },
    onError: () => {
      message.error(t('loginError'))
    },
  })

  const onFinish = async () => {
    const params = form.getFieldValue()
    run(params)
  }

  return (
    <div className={[styles.page]}>
      {loading && <Spin className="absolute-center" />}
      <div className={styles.leftContent}>
        <Image
          width="100%"
          height="100%"
          className="w100-h100"
          src={LoginBg}
          preview={false}
        />
      </div>
      <div className={[styles.rightContent, 'w100-h100'].join(' ')}>
        <img src={LoginBg} className={['w100-h100', styles.bg].join(' ')}></img>
        <Card className={[styles.card, 'box-shadow'].join(' ')} title={t('login')}>
          <Form
            form={form}
            name="loginForm"
            onFinish={onFinish}
          >
            <Space direction="vertical" className="w100-h100">
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: t('loginPlaceholder'),
                  },
                ]}
              >
                <Input placeholder={t('loginPlaceholder')} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('passwordPlaceholder'),
                  },
                ]}
              >
                <div>
                  <Input placeholder={t('passwordPlaceholder')} />
                  <GLink text={t('forgetPassword')} path="/" />
                </div>
              </Form.Item>
              <Flex justify="space-between">
                <div></div>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {t('login')}
                  </Button>
                </Form.Item>
              </Flex>
            </Space>
          </Form>
        </Card>
      </div>
    </div>
  )
}
