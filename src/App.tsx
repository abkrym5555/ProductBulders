import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  const renderProuductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <div className="container">
      <div
        className="m-5 grid  grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2 rounded-md lg:grid-cols-3 xl:grid-cols-4
      "
      >
        {renderProuductList}
      </div>
    </div>
  );
}

export default App;
