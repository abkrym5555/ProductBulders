import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  const renderProuductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <div
      className="m-4 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 rounded-md lg:grid-cols-3 xl:grid-cols-4
    "
    >
      {renderProuductList}
    </div>
  );
}

export default App;
