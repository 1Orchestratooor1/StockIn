import { StockInLogo } from "./Stokin-logo"
import { SalesIcon } from "./Sales-icon"
import { EmployeeIcon } from "./Employee-icon"
import { ReportIcon } from "./Report-icon"
import { ProductIcon } from "./Product-icon"
import { DashboardIcon } from "./Dashboard-icon"

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon/>},
  { text: "Productos", icon: <ProductIcon/>},
  { text: "Empleados", icon: <EmployeeIcon/>},
  { text: "Reportes", icon: <ReportIcon/>},
  { text: "Ventas", icon: <SalesIcon/>}
]

export default function Nav() {
  return (
    <nav className="bg-blue-600 w-72 h-[100vh] py-6 px-1">
      <div className="flex items-center ml-6 mb-4">
        <StockInLogo color="#fff" width="35px"/>
        <span className="ml-2 mb-1 inline-block text-white font-bold text-2xl">StockIn</span>
      </div>
      <hr className="mb-4 w-[90%] mx-auto border-blue-200"/>
      <span className="font-bold text-xs uppercase inline-block ml-6 mb-2 text-blue-200">admin</span>
      <ul>
        {
          navItems.map((item) => (
            <li className="px-6 py-3 mb-1 rounded-lg text-blue-100 font-medium flex items-center gap-3 text-base transition-colors hover:bg-blue-700 hover:text-white cursor-pointer">{item.icon}{item.text}</li>
          ))
        }
      </ul>
    </nav>
  )
}