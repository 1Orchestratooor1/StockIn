import Nav from "../components/Nav";
import ProductsPage from "../pages/Products";
import OrdersPage from "../pages/Orders";
import SuppliersPage from "./Supplier";


export default function Home() {
  const currentPath = window.location.pathname;

  const Page = () => {
    switch (currentPath) {
      case "/productos":
        return <ProductsPage />;
      case "/pedidos":
        return <OrdersPage />;
      case "/proveedores":
        return <SuppliersPage />; 
      default:
        return <ProductsPage />;
    }
  };

  return (
    <div className="flex h-screen">
      <Nav />
      <div className="flex-grow">{Page()}</div>
    </div>
  );
}
