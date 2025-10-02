import { useState } from "react";
import useCreateProduct from "../../../hooks/products/useCreateProduct.jsx";

const CreateProduct = () => {
  // El estado de form tiene los mismos campos pero vacios
  const [form, setForm] = useState({
    name: "",
    price: "",
    profitRate: "",
    description: "",
    status: "AVAILABLE",
    category: null,
    stock: "",
    highlighted: false,
  });
  const { createProduct, done, error, loading } = useCreateProduct();

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    console.log(form)
    /* Logica de uso del hook */
    const response = await createProduct(form);
    setForm({
    name: "",
    price: "",
    profitRate: "",
    description: "",
    status: "AVAILABLE",
    category: null,
    stock: "",
    highlighted: false,
  })
};

  return (
    <>
      <h2>Crear producto</h2>
      { loading && <h3> Creando producto... </h3> }
      <form onSubmit={handleCreateProduct}>
        <label htmlFor="name">Nombre</label>
        <input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="price">Precio</label>
        <input
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          value={form.price}
          type="number"
          id="price"
          name="price"
        />
        <label htmlFor="profitRate">Margen de ganancia</label>
        <input
          onChange={(e) => setForm({ ...form, profitRate: e.target.value })}
          value={form.profitRate}
          type="number"
          id="profitRate"
          name="profitRate"
          placeholder="Para un 10% de ganancia insertar 1.10"
          style={{ width: '250px' }}
        />
        <label htmlFor="description">Descripcion</label>
        <textarea onChange={(e) => setForm({ ...form, description: e.target.value })}
          value={form.description}
          id="description"
          name="description">
          </textarea>

        <label htmlFor="status">Estado</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          id="status"
          name="status"
        >
          <option value="AVAILABLE">Disponible</option>
          <option value="NOT AVAILABLE">No disponible</option>
          <option value="DISCONTINUED">Discontinuado</option>
        </select>

        <label htmlFor="category">Categoría</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          id="category"
          name="category"
        >
          <option value={form.category}>Ninguna</option>
        </select>

        <label htmlFor="stock">Stock</label>
        <input
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          value={form.stock}
          type="number"
          id="stock"
          name="stock"
        />

        <label htmlFor="highlighted">Destacado</label>
        <input
          type="checkbox"
          checked={form.highlighted}
          onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
          id="highlighted"
          name="highlighted"
        />

        <button type="submit"> Crear Producto </button> <br />
        <button type="reset"> Borrar todo </button>
      </form>

      {done ? <p>Producto creado!</p> : <></>}
      {error ? <p> {`Error: ${error}`} </p> : <></>}
    </>
  );
};

export default CreateProduct;
