import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TonProvider from './ProviderTon'
import ProviderRainbowKit from './ProviderRainbow'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonProvider>
      <ProviderRainbowKit>
        <App />
      </ProviderRainbowKit>
    </TonProvider>
  </StrictMode>,
)
