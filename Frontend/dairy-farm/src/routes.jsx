import { createBrowserRouter } from "react-router-dom";
import VetDashboard from "./pages/Veterinary/AnimmalDash";
import AnimalRegistry from "./pages/Veterinary/AnimalReg";
import Layout from "./pages/Sales/Layout";
import HomePage from "./pages/Sales/HomePage";
import CustomerSignUp from "./pages/Sales/CustomerSignUp";
import CustomerSignIn from "./pages/Sales/CustomerSignIn";
import ProtectedRoute from "./components/Sales/ProtectedRoute";
import ProductDetails from "./components/Sales/ProductDetails";
import CheckOut from "./components/Sales/CheckOut";
import ProductUpdate from "./pages/Sales/ProductUpdate";
import SalesDashboard from "./pages/Sales/SalesDashboard";
import MilkingDashboard from "./pages/Milking/MilkingDashboard";
import Employee from "./pages/Employees/Employee";
import CreateEmployee from "./pages/Employees/CreateEmployee";
import UpdateEmployee from "./pages/Employees/UpdateEmployee"
import SupplierDashbord from "./pages/Supplier/SupplierDashboard"
import FinanceMainDashboard from "./pages/Finance/FinanceMainDashboard"

//Production Management - Pages
import ProductionDashboard from "./pages/Production/ProductionDashboard";
import ProcessPlanning from "./pages/Production/ProcessPlanning";
import StorageRoom from "./pages/Production/StorageRoom"

import MilkingSessions from './pages/Milking/MilkingSessions';
import MilkingSessionSchedule from './pages/Milking/MilkingSessionSchedule';
import HomePageM from "./pages/HomeMain";
import FinanceTransactions from "./pages/Finance/FinanceTransactions";
import SupplierOrder from "./pages/Supplier/SupplierOrder";
import ItemDashboard from "./pages/Supplier/ItemDashboard";
import Health from "./pages/Veterinary/health";
import VaccineAnim from "./pages/Veterinary/vaccineAnim";
import BreedCard from "./pages/Veterinary/breedPage";
import PastureInfo from "../../dairy-farm/src/pages/Grazing/PastureInfo";
import OrderPage from "./pages/Sales/OrderPage";
import Task from "./pages/Employees/Task"
import CreateTask from "./pages/Employees/CreateTask"
import UpdateTask from "./pages/Employees/UpdateTask"
import AllEmployee from "./pages/Employees/AllEmployee";
import AllTask from "./pages/Employees/AllTask";
import MilkingData from './pages/Milking/MilkingData';
import AnimReport from "./pages/Veterinary/VetReport";
import EmployeeReport from "./pages/Employees/Employee_report";
import EmployeeR from "./pages/Employees/EmployeeR";
import MilkingStorage from "./pages/Milking/MilkingStorage";
import AddNewTank from "./pages/Milking/AddNewTank";
import PasturePage from "./pages/Grazing/PasturePage";
import SessionPage from "./pages/Grazing/SessionPage";
import Report from "./pages/Grazing/Report";
import EffluentPage from "./pages/Grazing/EffluentPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productdetails",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "/salesorders",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <CheckOut />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <CustomerSignUp />,
  },
  {
    path: "/signin",
    element: <CustomerSignIn />,
  },
  {
    path: "/productupdate",
    element: <ProductUpdate />,
  },
  {
    path: "/salesdashboard",
    element: <SalesDashboard />,
  },
  {
    path: "/vetdashboard",
    element: <VetDashboard />,
  },
  {
    path: "/VetReport",
    element: <AnimReport />,
  },
  {
    path: "/animalReg",
    element: <AnimalRegistry />,
  },
  {
    path: "/health",
    element: <Health />,
  },
  {
    path: "/vaccineAnim",
    element: <VaccineAnim />,
  },
  {
    path: "/breedAnim",
    element: <BreedCard />,
  },
  
  {
    path: "/milkingdashboard",
    element: <MilkingDashboard />,
  },
  {
    path: "/milkingData",
    element: <MilkingData />,
  },
  {
    path: "/employeedashboard",
    element: <Employee />,
  },
  {
    path: "/createEmployee",
    element: <CreateEmployee />,
  },
  {
    path: "/updateEmployee/:id",
    element: <UpdateEmployee />,
  },

  {
    path: "/supplierdashboard/",
    element: <SupplierDashbord />,
  },
  {
    path: "/order",
    element: <SupplierOrder />,
  },
  {
    path: "/item",
    element: <ItemDashboard />,
  },
  {
    path: "/financedashboard",
    element: <FinanceMainDashboard />,
  },
  {
    path: "/milkingSessions",
    element: <MilkingSessions />,
  },
  {
    path: "/milkingStorage",
    element: <MilkingStorage />,
  },
  {
    path: "/addNewTank",
    element: <AddNewTank />,
  },

  {
    path: "/homeM",
    element: <HomePageM />,
  },

  //Production Management Paths
  { path: "/productiondashboard", element: <ProductionDashboard /> },
  { path: "/processplanning", element: <ProcessPlanning /> },
  { path: "/StorageRoom", element: <StorageRoom /> } ,  

  {
    path: "/financetrans",
    element: <FinanceTransactions />,
  },
  {
    path: "/scheduleForm",
    element: <MilkingSessionSchedule />,
  },
  {
    path: "/milkingSessions",
    element: <MilkingSessions />,
  },
//grazing management
  {
    path: "/pastureinfo",
    element: <PastureInfo />,
  },
  {
    path: "/pasture",
    element: <PasturePage />,
  },
  
  {
    path: "/session",
    element: <SessionPage />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/waste",
    element: <EffluentPage />,
  },

  {
    path: "/task",
    element: <Task />,
  },
  {
    path: "/createtask",
    element: <CreateTask />,
  },
  {
    path: "/updateTask/:id",
    element: <UpdateTask />,
  },
  {
    path: "/allEmployee",
    element: <AllEmployee />,
  },
  {
    path: "/allTask",
    element: <AllTask />,
  },
  {
    path: "/ereport",
    element: <EmployeeR />,
  },
  {
    path: "/empreport",
    element: <EmployeeReport />,
  },
]);

export default router;