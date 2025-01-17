import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from 'sonner'
import { Provider } from 'react-redux'
import store from './app/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode >
    <Provider store={store} >
    <Toaster richColors position='top-center'/>
    <App />
    </Provider>
  </StrictMode>
)
