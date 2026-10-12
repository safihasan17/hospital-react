import { NavLink } from "react-router";

type Item = { to: string; label: string; icon: string; end?: boolean };
const groups: { title: string; items: Item[] }[] = [
  { title: "", items: [{ to: "/", label: "Dashboard", icon: "speedometer2", end: true }] },
  {
    title: "Clinic",
    items: [
      { to: "/patients", label: "Patients", icon: "people" },
      { to: "/doctors", label: "Doctors", icon: "person-vcard" },
      { to: "/departments", label: "Departments", icon: "diagram-3" },
      { to: "/appointments", label: "Appointments", icon: "calendar-check" },
      { to: "/prescriptions", label: "Prescriptions", icon: "file-medical" },
      { to: "/lab-tests", label: "Lab Tests", icon: "eyedropper" },
      { to: "/lab-orders", label: "Lab Orders", icon: "clipboard2-pulse" },
    ],
  },
  {
    title: "Inpatient",
    items: [
      { to: "/admissions", label: "Admissions", icon: "box-arrow-in-right" },
      { to: "/wards", label: "Wards", icon: "building" },
      { to: "/beds", label: "Beds", icon: "layout-sidebar" },
    ],
  },
  {
    title: "Billing",
    items: [
      { to: "/invoices", label: "Invoices", icon: "receipt" },
      { to: "/payments", label: "Payments", icon: "cash-coin" },
    ],
  },
  {
    title: "Pharmacy",
    items: [
      { to: "/medicines", label: "Medicines", icon: "capsule" },
      { to: "/suppliers", label: "Suppliers", icon: "truck" },
      { to: "/purchases", label: "Purchases", icon: "cart-plus" },
    ],
  },
  {
    title: "Administration",
    items: [
      { to: "/users", label: "Users", icon: "person-badge" },
      { to: "/roles", label: "Roles", icon: "shield-lock" },
    ],
  },
];

function Sidebar() {
  return (
    <nav className="app-sidebar" aria-label="Main navigation">
      <div className="brand"><i className="bi bi-hospital-fill" /><span>Hospital MS</span></div>
      {groups.map((g) => (
        <div key={g.title || "top"} className="mb-2">
          {g.title && <div className="nav-group">{g.title}</div>}
          <ul className="nav flex-column">
            {g.items.map((l) => (
              <li className="nav-item" key={l.to}>
                <NavLink to={l.to} end={l.end} className="nav-link"><i className={`bi bi-${l.icon}`} />{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
export default Sidebar;
