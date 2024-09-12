import { ProductFile } from "../components/Product-file";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import ModalWidows from "../components/ModalWindows";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [modalProps, setModalProps] = useState({
    titleModal: "",
    buttonText: "",
    onClickFunction: () => {},
  });
  const [windowsModal, setWindowsModal] = useState(false);
  
  
  const abrirCerrarModal = (titleModal, buttonText, onClickFunction) => {
    console.log("Modal props:", { titleModal, buttonText, onClickFunction });
    setModalProps({
      titleModal,
      buttonText,
      onClickFunction,
    });
    setWindowsModal(!windowsModal);
  };

  useEffect(() => {
    fetch("http://localhost:3000/read-product", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, []);

  const handleAddProduct = (e) => {
    if (newProductName.trim() === "") {
      console.log("Please enter a product name");
      return;
    }
    e.preventDefault();

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name: newProductName,
    };

    fetch('http://localhost:3000/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Product added successfully') {
          setProducts([...products, newProduct]);
          setNewProductName("");
        }
      })
      .catch(err => {
        console.error("Error: ", err);
      });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="flex max-h-screen overflow-hidden">
      <Nav />
      <div className="py-6 px-10 w-full flex flex-col">
        <header className="flex mb-5 justify-between items-baseline border-b border pb-8">
          <h1 className="font-bold text-4xl">Productos</h1>
          <div className="flex gap-4">
            <input
              className="border border-gray-400 w-96 pl-2 rounded-md"
              type="search"
              placeholder="Buscar producto"
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <button className="bg-slate-400 py-1 px-2 rounded-md text-white hover:bg-slate-600">
              Buscar
            </button>
          </div>
        </header>
        
        <div className="flex-grow overflow-y-auto border border-gray-600">
          <table className="w-full border-collapse relative">
            <thead>
              <tr className="bg-gray-200 sticky top-0 left-0">
                <th className="py-2 text-left px-4">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <ProductFile
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                />
              ))}
            </tbody>
          </table>
        </div>
        <form action="/add-product" method="POST" className="mt-4">
        
          <input
            type="text"
            name="name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="border border-gray-400 p-2 rounded-md w-full"
            placeholder="Nombre del nuevo producto"
            required
          />

          <button

            type="submit"
            titletext="Ingrese un producto"
            buttontext="Agregar producto"
            //manejarclic={handleAddProduct}
            
            className="bg-slate-400 py-1 px-2 rounded-md text-white hover:bg-slate-600 mt-2"
          >
            Agregar Producto
          </button>

          <button
            onClick={() => abrirCerrarModal("Nuevo Producto", "Guardar", () => console.log("Función del botón clickeada"))}
          >
            Crear producto
          </button>

          <button
            onClick={() => abrirCerrarModal("Modificar Producto", "Modificar", () => console.log("Función del botón clickeada"))}
          >
            Modificar producto
          </button>

          <button
            onClick={() => abrirCerrarModal("Información Producto", "Mostrar", () => console.log("Función del botón clickeada"))}
          >
            Mostrar producto
          </button>

        </form>

      </div>

      

    </div>

  );
}
