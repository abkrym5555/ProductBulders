import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import Model from "./ui/Model";
import Button from "./ui/Button";

function App() {
  //-------------states---------------------------//
  const [isOpen, setIsOpen] = useState(false);

  //------------helper fun------------------------//
  function openModel() {
    setIsOpen(true);
  }

  function closeModel() {
    setIsOpen(false);
  }

  //------------render------------------------//
  const renderProuductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <div className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModel}>
        open model
      </Button>
      <div
        className="m-5 grid  grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2 rounded-md lg:grid-cols-3 xl:grid-cols-4
      "
      >
        {renderProuductList}
      </div>
      <Model isOpen={isOpen} closeModel={closeModel} title="Add a new product">
        <div className="flex items-center gap-2">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button
            className="bg-gray-300 hover:bg-gray-400"
            onClick={closeModel}
          >
            Cancel
          </Button>
        </div>
      </Model>
    </div>
  );
}

export default App;
