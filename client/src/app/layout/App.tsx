import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "New Product" + prevState.length + 1,
        description: "New Description",
        price: prevState.length * 100 * 100,
        pictureUrl: "https://via.placeholder.com/150",
        brand: "New Brand",
      },
    ]);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div>
      <h1>Welcome to Cenrer-Market </h1>
      <Catalog products={products} addProduct ={addProduct}/>
    
    </div>
  );
}

export default App;
