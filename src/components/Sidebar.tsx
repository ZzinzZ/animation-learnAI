import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Book,
  ListChecks,
  MessageSquare,
  Settings,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: Book },
    { name: "Assignments", href: "/assignments", icon: ListChecks },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] backdrop-blur-md bg-white/20 shadow-xl border-r border-white/20 transition-all duration-300 z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group hover:text-[#3b81fb] relative flex items-center space-x-3 px-3 py-2.5 rounded-xl overflow-hidden transition-all duration-300 ease-in-out
     ${
       isActive
         ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg"
         : "text-white/80 hover:text-white hover:bg-white/10"
     }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${
                    isActive ? "text-white" : "text-black/60"
                  } ${collapsed ? "mx-auto" : ""}`}
                />
                {!collapsed && (
                  <span
                    className={`font-medium truncate transition-all duration-500 ${
                      isActive ? "text-white" : `text-black/60`
                    } ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
                  >
                    {item.name}
                  </span>
                )}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full
                  aria-hidden ${isActive ? "bg-white" : "bg-[#3b81fb]"}`}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
