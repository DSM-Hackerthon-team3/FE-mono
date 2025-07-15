import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StyledProvider } from './style/StyledProvider'

const root = createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <StyledProvider>
      <App />
    </StyledProvider>
  </StrictMode>,
)
