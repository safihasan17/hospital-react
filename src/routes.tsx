import { createBrowserRouter } from "react-router";

import App from "./App.tsx";

import Dashboard from "./views/pages/Dashboard.tsx";
import NotFound from "./views/pages/NotFound.tsx";
import PatientManage from "./views/pages/patients/PatientManage.tsx";
import PatientAdd from "./views/pages/patients/PatientAdd.tsx";
import PatientEdit from "./views/pages/patients/PatientEdit.tsx";
import PatientDetails from "./views/pages/patients/PatientDetails.tsx";
import DoctorManage from "./views/pages/doctors/DoctorManage.tsx";
import DoctorAdd from "./views/pages/doctors/DoctorAdd.tsx";
import DoctorEdit from "./views/pages/doctors/DoctorEdit.tsx";
import DoctorDetails from "./views/pages/doctors/DoctorDetails.tsx";
import DepartmentManage from "./views/pages/departments/DepartmentManage.tsx";
import DepartmentDetails from "./views/pages/departments/DepartmentDetails.tsx";
import AppointmentManage from "./views/pages/appointments/AppointmentManage.tsx";
import AppointmentAdd from "./views/pages/appointments/AppointmentAdd.tsx";
import AppointmentEdit from "./views/pages/appointments/AppointmentEdit.tsx";
import AppointmentDetails from "./views/pages/appointments/AppointmentDetails.tsx";
import LabTestManage from "./views/pages/labtests/LabTestManage.tsx";
import LabTestDetails from "./views/pages/labtests/LabTestDetails.tsx";
import WardManage from "./views/pages/inpatient/wards/WardManage.tsx";
import WardAdd from "./views/pages/inpatient/wards/WardAdd.tsx";
import WardEdit from "./views/pages/inpatient/wards/WardEdit.tsx";
import WardDetails from "./views/pages/inpatient/wards/WardDetails.tsx";
import BedManage from "./views/pages/inpatient/beds/BedManage.tsx";
import BedAdd from "./views/pages/inpatient/beds/BedAdd.tsx";
import BedEdit from "./views/pages/inpatient/beds/BedEdit.tsx";
import BedDetails from "./views/pages/inpatient/beds/BedDetails.tsx";
import AdmissionManage from "./views/pages/inpatient/admissions/AdmissionManage.tsx";
import AdmissionAdd from "./views/pages/inpatient/admissions/AdmissionAdd.tsx";
import AdmissionEdit from "./views/pages/inpatient/admissions/AdmissionEdit.tsx";
import AdmissionDetails from "./views/pages/inpatient/admissions/AdmissionDetails.tsx";
import PrescriptionManage from "./views/pages/prescriptions/PrescriptionManage.tsx";
import PrescriptionAdd from "./views/pages/prescriptions/PrescriptionAdd.tsx";
import PrescriptionEdit from "./views/pages/prescriptions/PrescriptionEdit.tsx";
import PrescriptionDetails from "./views/pages/prescriptions/PrescriptionDetails.tsx";
import LabOrderManage from "./views/pages/labtests/LabOrderManage.tsx";
import LabOrderAdd from "./views/pages/labtests/LabOrderAdd.tsx";
import LabOrderEdit from "./views/pages/labtests/LabOrderEdit.tsx";
import LabOrderDetails from "./views/pages/labtests/LabOrderDetails.tsx";
import InvoiceManage from "./views/pages/billing/invoices/InvoiceManage.tsx";
import InvoiceAdd from "./views/pages/billing/invoices/InvoiceAdd.tsx";
import InvoiceEdit from "./views/pages/billing/invoices/InvoiceEdit.tsx";
import InvoiceDetails from "./views/pages/billing/invoices/InvoiceDetails.tsx";
import PaymentManage from "./views/pages/billing/payments/PaymentManage.tsx";
import PaymentEdit from "./views/pages/billing/payments/PaymentEdit.tsx";
import PaymentDetails from "./views/pages/billing/payments/PaymentDetails.tsx";
import MedicineManage from "./views/pages/pharmacy/medicines/MedicineManage.tsx";
import MedicineAdd from "./views/pages/pharmacy/medicines/MedicineAdd.tsx";
import MedicineEdit from "./views/pages/pharmacy/medicines/MedicineEdit.tsx";
import MedicineDetails from "./views/pages/pharmacy/medicines/MedicineDetails.tsx";
import SupplierManage from "./views/pages/pharmacy/suppliers/SupplierManage.tsx";
import SupplierAdd from "./views/pages/pharmacy/suppliers/SupplierAdd.tsx";
import SupplierEdit from "./views/pages/pharmacy/suppliers/SupplierEdit.tsx";
import SupplierDetails from "./views/pages/pharmacy/suppliers/SupplierDetails.tsx";
import MedicinePurchaseManage from "./views/pages/pharmacy/purchases/MedicinePurchaseManage.tsx";
import MedicinePurchaseAdd from "./views/pages/pharmacy/purchases/MedicinePurchaseAdd.tsx";
import MedicinePurchaseEdit from "./views/pages/pharmacy/purchases/MedicinePurchaseEdit.tsx";
import MedicinePurchaseDetails from "./views/pages/pharmacy/purchases/MedicinePurchaseDetails.tsx";
import UserManage from "./views/pages/users/UserManage.tsx";
import UserAdd from "./views/pages/users/UserAdd.tsx";
import UserEdit from "./views/pages/users/UserEdit.tsx";
import UserDetails from "./views/pages/users/UserDetails.tsx";
import RoleManage from "./views/pages/roles/RoleManage.tsx";
import RoleAdd from "./views/pages/roles/RoleAdd.tsx";
import RoleEdit from "./views/pages/roles/RoleEdit.tsx";
import RoleDetails from "./views/pages/roles/RoleDetails.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path:"/", element:<Dashboard/> },

      // Patient
      { path:"/patients", element:<PatientManage/> },
      { path:"/add-patient", element:<PatientAdd/> },
      { path:"/edit-patient/:id", element:<PatientEdit/> },
      { path:"/patient-details/:id", element:<PatientDetails/> },

      // Doctor
      { path:"/doctors", element:<DoctorManage/> },
      { path:"/add-doctor", element:<DoctorAdd/> },
      { path:"/edit-doctor/:id", element:<DoctorEdit/> },
      { path:"/doctor-details/:id", element:<DoctorDetails/> },

      // Department
      { path:"/departments", element:<DepartmentManage/> },
      { path:"/department-details/:id", element:<DepartmentDetails/> },

      // Appointment
      { path:"/appointments", element:<AppointmentManage/> },
      { path:"/add-appointment", element:<AppointmentAdd/> },
      { path:"/edit-appointment/:id", element:<AppointmentEdit/> },
      { path:"/appointment-details/:id", element:<AppointmentDetails/> },

      // LabTest
      { path:"/lab-tests", element:<LabTestManage/> },
      { path:"/lab-test-details/:id", element:<LabTestDetails/> },

      // Ward
      { path:"/wards", element:<WardManage/> },
      { path:"/add-ward", element:<WardAdd/> },
      { path:"/edit-ward/:id", element:<WardEdit/> },
      { path:"/ward-details/:id", element:<WardDetails/> },

      // Bed
      { path:"/beds", element:<BedManage/> },
      { path:"/add-bed", element:<BedAdd/> },
      { path:"/edit-bed/:id", element:<BedEdit/> },
      { path:"/bed-details/:id", element:<BedDetails/> },

      // Admission
      { path:"/admissions", element:<AdmissionManage/> },
      { path:"/add-admission", element:<AdmissionAdd/> },
      { path:"/edit-admission/:id", element:<AdmissionEdit/> },
      { path:"/admission-details/:id", element:<AdmissionDetails/> },

      // Prescription
      { path:"/prescriptions", element:<PrescriptionManage/> },
      { path:"/add-prescription", element:<PrescriptionAdd/> },
      { path:"/edit-prescription/:id", element:<PrescriptionEdit/> },
      { path:"/prescription-details/:id", element:<PrescriptionDetails/> },

      // LabOrder
      { path:"/lab-orders", element:<LabOrderManage/> },
      { path:"/add-lab-order", element:<LabOrderAdd/> },
      { path:"/edit-lab-order/:id", element:<LabOrderEdit/> },
      { path:"/lab-order-details/:id", element:<LabOrderDetails/> },

      // Invoice
      { path:"/invoices", element:<InvoiceManage/> },
      { path:"/add-invoice", element:<InvoiceAdd/> },
      { path:"/edit-invoice/:id", element:<InvoiceEdit/> },
      { path:"/invoice-details/:id", element:<InvoiceDetails/> },

      // Payment
      { path:"/payments", element:<PaymentManage/> },
      { path:"/edit-payment/:id", element:<PaymentEdit/> },
      { path:"/payment-details/:id", element:<PaymentDetails/> },

      // Medicine
      { path:"/medicines", element:<MedicineManage/> },
      { path:"/add-medicine", element:<MedicineAdd/> },
      { path:"/edit-medicine/:id", element:<MedicineEdit/> },
      { path:"/medicine-details/:id", element:<MedicineDetails/> },

      // Supplier
      { path:"/suppliers", element:<SupplierManage/> },
      { path:"/add-supplier", element:<SupplierAdd/> },
      { path:"/edit-supplier/:id", element:<SupplierEdit/> },
      { path:"/supplier-details/:id", element:<SupplierDetails/> },

      // MedicinePurchase
      { path:"/purchases", element:<MedicinePurchaseManage/> },
      { path:"/add-purchase", element:<MedicinePurchaseAdd/> },
      { path:"/edit-purchase/:id", element:<MedicinePurchaseEdit/> },
      { path:"/purchase-details/:id", element:<MedicinePurchaseDetails/> },

      // User
      { path:"/users", element:<UserManage/> },
      { path:"/add-user", element:<UserAdd/> },
      { path:"/users/:id/edit", element:<UserEdit/> },
      { path:"/users/:id", element:<UserDetails/> },

      // Role
      { path:"/roles", element:<RoleManage/> },
      { path:"/add-role", element:<RoleAdd/> },
      { path:"/edit-role/:id", element:<RoleEdit/> },
      { path:"/role-details/:id", element:<RoleDetails/> },
    ],
  },

  { path: "*", element: <NotFound/> },
]);
