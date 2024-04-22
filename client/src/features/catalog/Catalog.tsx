import { Product } from "../../app/models/Product";

interface Props {
    products: Product[];
    addProduct: () => void;
}
export default function Catalog({products, addProduct}: Props) {
  return (
    <>
      <h1>Catalog</h1>
        {products &&
            products.map((product) => (
            <li key={product.id}>
                {product.name}
                {product.price}
            </li>
            ))}
        <button onClick={addProduct}>Add new product </button>
    </>
  );
}
