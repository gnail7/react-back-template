import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom'
import CustomThemeProvider from './config/CustomThemeProvider.jsx'
import store from './store/index.js'
import router from './router/index.jsx'
import './config/i18next.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
      </CustomThemeProvider>
    </Provider>
  </StrictMode>,
)
