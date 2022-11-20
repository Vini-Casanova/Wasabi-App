import { createContext, useState } from 'react'

type PropsThemeContext = {
  sidebar: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<PropsThemeContext>({
  sidebar: false,
  toggleSidebar: () => {},
})

export const SidebarContextProvider = ({ children }: any) => {
  const [sidebar, setSidebar] = useState(false)

  const toggleSidebar = () => {
    setSidebar((curr) => !curr)
  }

  return (
    <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
