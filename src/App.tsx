import { useState, type ChangeEvent } from "react";
import ProductCard from "./components/ProductCard";
import { productList, formInputsList } from "./data";
import Model from "./ui/Model";
import Button from "./ui/Button";
import Input from "./ui/Input";
import type { IProduct } from "./interfaces/intrface";
import { productValidation } from "./validation";

const initialProduct: IProduct = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
};

function App() {
  //-------------states---------------------------//
  const [prouduct, setprouduct] = useState(initialProduct);
  const [isOpen, setIsOpen] = useState(false);

  //------------helper fun------------------------//
  function openModel() {
    setIsOpen(true);
  }

  function closeModel() {
    setIsOpen(false);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setprouduct({ ...prouduct, [name]: value });
  }

  function onCancelHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setprouduct(initialProduct);
    closeModel();
  }

  function onSubmitHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const errors = productValidation({
      title: prouduct.title,
      description: prouduct.description,
      imageURL: prouduct.imageURL,
      price: prouduct.price,
    });
    console.log(errors);
  }

  //------------render------------------------//
  const renderProuductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderAllInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-px text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={prouduct[input.name]}
        onChange={onChangeHandler}
      />
    </div>
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
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderAllInputList}
          <div className="flex items-center gap-2">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onCancelHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
    </div>
  );
}

export default App;
