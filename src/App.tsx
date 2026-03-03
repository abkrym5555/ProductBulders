import ProductCard from "./components/ProductCard";

interface IAppProps {}

function App({}: IAppProps) {
  return (
    <div
      className="m-4 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 rounded-md lg:grid-cols-3 xl:grid-cols-4
    "
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default App;
