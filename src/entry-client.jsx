import './index.css'
import './i18n'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
)
