import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TonProvider from './ProviderTon.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonProvider>
      <App />
    </TonProvider>
  </StrictMode>,
)
