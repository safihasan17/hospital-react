function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="app-navbar">
      <button className="btn btn-light d-lg-none" onClick={onToggleSidebar} aria-label="Toggle menu"><i className="bi bi-list fs-5" /></button>
      <div className="ms-auto d-flex align-items-center gap-3">
        <span className="text-muted small d-none d-sm-inline"><i className="bi bi-person-circle me-1" />Hospital Staff</span>
      </div>
    </header>
  );
}
export default Navbar;
