import './App.css';
import { Layout,  } from 'antd';
import {  Outlet } from 'react-router-dom';
import { useTheme } from 'antd-style';
import SiderBar from './components/_layouts/SiderBar'
import HeaderBar from './components/_layouts/HeaderBar'
import BreadCrumbWrapper from './components/_layouts/BreadCrumbWrapper';
const { Header, Footer, Sider, Content } = Layout

function App() {
  const theme = useTheme()
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  }
  const headerStyle = {
    textAlign: 'center',
    height: 64,
    lineHeight: '64px',
    background: theme.colorBgContainer,
    padding: 0,
  }
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '90px',
    width: 190,
    background: theme.colorBgContainer,
  }
  const contentStyle = {
    textAlign: 'center',
    height: '100%'
  }

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <HeaderBar theme={theme.appearance}/>
      </Header>
 
      <Layout>
        <Sider style={siderStyle}>
          <SiderBar/>
        </Sider>
        <Content style={contentStyle}>    
          <div className='container'>
            <BreadCrumbWrapper/>          
            <Outlet/>          
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
