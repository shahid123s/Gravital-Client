import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from 'sonner'
import { Provider } from 'react-redux'
import store from './app/store.js'


createRoot(document.getElementById('root')).render(
  // <StrictMode >
    <Provider store={store} >
    <Toaster  position='bottom-center' toastOptions={{
      className: 'border-none bg-[#828282] text-white aling-center'
    }}  />
    <App />
    </Provider>
  // </StrictMode>
)
