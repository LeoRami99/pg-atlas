import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TonProvider from './ProviderTon'
import ProviderRainbowKit from './ProviderRainbow'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <TonProvider>
      <ProviderRainbowKit>
        <App />
      </ProviderRainbowKit>
    </TonProvider>
  </StrictMode>,
)
