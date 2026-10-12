import { useState } from "react";
import { Outlet } from "react-router";
import Footer from "./views/layout/Footer";
import Navbar from "./views/layout/Navbar";
import Sidebar from "./views/layout/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* clicking a menu link closes the mobile sidebar */}
      <div onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setSidebarOpen(false); }}>
        <Sidebar />
      </div>
      <div className="app-backdrop" onClick={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Navbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="content">
          <div className="container-fluid"><Outlet /></div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
export default App;
