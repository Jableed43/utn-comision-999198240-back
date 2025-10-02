import { useEffect, useState } from "react";
import "../App.css";
import useFetchProducts from "../hooks/products/useFetchProducts";
import { CreateProduct } from "../components/products/CreateProduct";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
   const { done, error, fetchProducts, loading } = useFetchProducts()
    
   const statusMap = {
        "AVAILABLE": "Disponible",
        "NOT AVAILABLE": "No disponible",
        "DISCONTINUED": "Descontinuado"
    };

   useEffect(() => {
    const loadProducts = async () => {
      let res = null;
      if(!done){
      res = await fetchProducts();
      }
      if (res) {
        setProducts(res);
      }
    };
    loadProducts()
  }, [done]);

  return (
    <div>
      {error ? <p>error</p> : <></>}
      <h1> Productos </h1>
      {loading ? (
        <p> Cargando Productos </p>
      ) : (
        <div className="user-card-wrapper">
          {products.map((product) => (
            <div className="user-card" key={product._id}>
              <h2> {product.name} </h2>
              <h2> ${product.price} </h2>
              <h3> {product.profitRate}% </h3>
              <h4>{product.description}</h4>
              <h4>{statusMap[product.status]}</h4>
              <h4>{product.category ==! null ? product.category : "Sin categoria" }</h4>
              {/* <h4>{ !product.category ? "Sin categoria con !" : product.category }</h4> */}
              <h4>Stock: {product.stock}</h4>
              <h4 className={ product.highlighted === true ? "highlighted" : "no-highlighted" } >{product.highlighted === true ? "Destacado" : "No destacado" }</h4>

              {/* <button onClick={() => handleEdit(product)}>Editar Producto</button>
              <button onClick={() => handleDelete(product._id)}>Eliminar Producto</button> */}
            </div>
          ))}
        </div>
      )}
    <CreateProduct />
    </div>
  );
}

export default ProductsPage;


