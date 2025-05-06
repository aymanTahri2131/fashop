import { createContext, useContext, useState, useEffect } from "react"

const AdminLayoutContext = createContext()

export const useAdminLayout = () => useContext(AdminLayoutContext)

export const AdminLayoutProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsCollapsed(mobile)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <AdminLayoutContext.Provider value={{ isCollapsed, setIsCollapsed, isMobile }}>
      {children}
    </AdminLayoutContext.Provider>
  )
}
