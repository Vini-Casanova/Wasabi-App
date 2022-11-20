import { BrowserRouter } from 'react-router-dom'
import { SidebarContextProvider } from './context/SidebarContext'
import { Router } from './routes'

import './styles/global.css'

export function App() {
  return (
    <BrowserRouter>
      <SidebarContextProvider>
        <Router />
      </SidebarContextProvider>
    </BrowserRouter>
  )
}
