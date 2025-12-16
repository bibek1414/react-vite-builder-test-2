import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Test from './Test'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Test />

  </StrictMode>,
)
