import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import CustomThemeProvider from './config/CustomThemeProvider.jsx'
import store from './store/index.js'
import FilterRouter from '@/router/index.jsx'
import InternationalProvider from './config/InternationalProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import './config/i18next.js'
import './assets/iconfont/iconfont.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CustomThemeProvider>
      <InternationalProvider>
        <BrowserRouter>
          <FilterRouter>
            <App />
          </FilterRouter>
        </BrowserRouter>
      </InternationalProvider>
    </CustomThemeProvider>
  </Provider>,
)
