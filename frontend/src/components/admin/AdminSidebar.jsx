import { Link, useLocation } from "react-router-dom";
import { useAdminLayout } from "./AdminLayoutContext"

function AdminSidebar() {
  const { isCollapsed, setIsCollapsed, isMobile } = useAdminLayout()
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: dashboardIcon() },
    { name: "Products", path: "/admin/products", icon: productIcon() },
    { name: "Orders", path: "/admin/orders", icon: orderIcon() },
    { name: "Customers", path: "/admin/customers", icon: customerIcon() },
    { name: "Testimonials", path: "/admin/testimonials", icon: testimonialIcon() },
    { name: "Settings", path: "/admin/settings", icon: settingsIcon() },
  ];

  return (
    <div className={`bg-[#F0E4CF] fixed left-0 top-0 h-screen shadow-sm transition-all duration-300 z-40 ${isCollapsed ? "w-20 sm:w-20 md:w-24" : "w-64"}`}>
      {/* Header */}
      <div className="p-4 sm:py-4 sm:px-4 md:p-4 md:pr-1 border-b-2 border-gray-100 flex items-center justify-between">
        <Link to="/admin" className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center pl-0 sm:pl-0 md:pl-2">
            <p className="rounded-full text-white text-center bg-[#B9703E] w-12 h-12 mb-2 flex items-center justify-center">
              FA
            </p>
            {!isCollapsed ? ( 
              <p className="text-black text-sm font-medium">Florart Admin</p>
              ) : (
                <p className="text-black text-sm font-medium">Admin</p>
              )}
          </div>
        </Link>

        <button
          onClick={() => !isMobile && setIsCollapsed(!isCollapsed)}
          disabled={isMobile}
          className="text-[#B9703E] hidden sm:hidden md:flex disabled:opacity-40"
          title={isMobile ? "Désactivé sur mobile" : "Réduire"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            {isCollapsed ? (
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center justify-center ${isCollapsed ? "md:justify-center" : "md:justify-start" } md:justify-start p-2 rounded-md transition-colors ${isActive(item.path) ? "bg-[#B9703E] text-white" : "text-gray-700 hover:bg-[#B9703E] hover:text-white"
                  }`}
              >
                <span className={`mr-0 sm:mr-0 md:mr-3 ${isCollapsed ? "md:mr-0" : "md:mr-3"}`}>{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Back to site */}
      <div className="absolute bottom-0 w-full p-4 border-t-2 border-gray-100">
        <Link
          to="/"
          className={`flex items-center p-2 text-gray-700 hover:bg-[#B9703E] hover:text-white rounded-md ${isCollapsed ? "justify-center" : ""}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {!isCollapsed && <span>Store</span>}
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;

//
// Icons
//
function dashboardIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
    </svg>
  );
}

function productIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function orderIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path
        fillRule="evenodd"
        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function customerIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  );
}

function testimonialIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function settingsIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

