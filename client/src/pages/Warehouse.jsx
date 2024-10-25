// Propósito: Nos permite mostrar y gestionar las bodegas

import { useEffect, useState } from "react";
import WarehouseRow from "../components/warehouses/WarehouseRow"; // Cambiado a WarehouseRow
import { ModalWarehouse } from "../components/warehouses/ModalWarehouse"; // Cambiado a ModalWarehouse
import supabase from "../utils/supabase";
import MessageConfirmation from "../components/MessageConfirmation";
import AddIcon from "../assets/AddIcon";

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [searchWarehouse, setSearchWarehouse] = useState("");
  const [modalProps, setModalProps] = useState({
    titleModal: "",
    buttonText: "",
    onClickFunction: () => {},
    warehouseId: "",
    option: "",
  });
  const [windowsModal, setWindowsModal] = useState(false);
  const [error, setError] = useState(null);

  const abrirCerrarModal = (
    titleModal,
    buttonText,
    onClickFunction,
    warehouseId = "",
    option = ""
  ) => {
    setModalProps({
      titleModal,
      buttonText,
      onClickFunction,
      warehouseId,
      option,
    });
    setWindowsModal((prev) => !prev);
  };

  const fetchWarehouses = async () => {
    const { data, error } = await supabase
      .from("warehouse") // Cambiado a "warehouse"
      .select(
        `
        id, 
        name, 
        cant_actual, 
        cant_max_product 
      `
      )
      .eq("state", true); // Filtrar por estado activo

    if (error) {
      console.error("Error fetching warehouses: ", error);
      setError("Error al cargar las bodegas.");
      setWarehouses([]);
    } else {
      setWarehouses(data || []);
      setError(null);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const filteredWarehouses = Array.isArray(warehouses)
    ? warehouses.filter((warehouse) => {
        if (searchWarehouse === "") return true;
        return warehouse.name
          .toLowerCase()
          .includes(searchWarehouse.toLowerCase());
      })
    : [];

  return (
    <div className="flex max-h-screen overflow-hidden">
      <div className="py-6 px-10 w-full flex flex-col">
        <header className="flex justify-between items-baseline pb-8">
          <h1 className="font-bold text-4xl">Bodegas</h1>
          <input
            className="flex-auto border border-gray-400 h-9 rounded-lg pl-3 ml-9"
            type="search"
            placeholder="Buscar bodega"
            onChange={(e) => setSearchWarehouse(e.target.value)}
          />
          <button
            className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg w-48 h-9 ml-9 hover:bg-blue-700 transition-all duration-300 ease"
            onClick={() => abrirCerrarModal("Nueva Bodega", "", "create")}
          >
            <AddIcon />
          </button>
        </header>
        <MessageConfirmation />
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex-grow overflow-y-auto border rounded-lg">
          <table className="w-full border-collapse relative">
            <thead>
              <tr className="bg-slate-200 sticky top-0 left-0">
                <th className="py-2 text-left px-4">Nombre de la Bodega</th>
                <th className="py-2 text-center px-4">Cantidad Actual</th>
                <th className="py-2 text-center px-4">Capacidad Máxima</th>
                <th className="py-2 text-left px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredWarehouses.map((warehouse, index) => (
                <WarehouseRow
                  key={warehouse.id}
                  id={warehouse.id}
                  name={warehouse.name}
                  quantity={warehouse.cant_actual}
                  maxQuantity={warehouse.cant_max_product}
                  className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  onUpdate={fetchWarehouses}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {windowsModal && (
        <ModalWarehouse
          open={windowsModal}
          onClose={() => setWindowsModal(false)}
          title={modalProps.titleModal}
          warehouseId={modalProps.warehouseId}
          option={modalProps.option}
          onUpdate={fetchWarehouses}
        />
      )}
    </div>
  );
}
