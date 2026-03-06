import { useState, type ChangeEvent } from "react";
import ProductCard from "./components/ProductCard";
import { productList, formInputsList, colors } from "./data";
import Model from "./ui/Model";
import Button from "./ui/Button";
import Input from "./ui/Input";
import type { IProduct, IProductValditon } from "./interfaces/intrface";
import { productValidation } from "./validation";
import ErorrMassega from "./components/ErorrMassega";
import CircleColor from "./components/CircleColor";

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

const productValdErrMsg: IProductValditon = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
};

function App() {
  //-------------states---------------------------//
  const [prouduct, setprouduct] = useState(initialProduct);
  const [errorMsgs, seterrorMsgs] = useState(productValdErrMsg);
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
    seterrorMsgs({ ...errorMsgs, [name]: "" });
  }

  function onCancelHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setprouduct(initialProduct);
    seterrorMsgs(productValdErrMsg);
    closeModel();
  }

  function onSubmitHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { price, description, imageURL, title } = prouduct;

    seterrorMsgs(productValidation({ price, description, imageURL, title }));

    const hasErrorMessage = Object.values(errorMsgs).some((val) => val !== "");

    if (!hasErrorMessage) {
      console.log("has no error");
      return;
    }
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

      <ErorrMassega msg={errorMsgs[input.name]} key={input.id} />
    </div>
  ));

  const rendrAllColors = colors.map((cl) => (
    <CircleColor bgColor={cl} key={cl} />
  ));

  return (
    <div className="container">
      <Button
        className="bg-indigo-700 hover:bg-indigo-800 my-3 "
        onClick={openModel}
      >
        build product
      </Button>
      <div className="m-5 grid  grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2 rounded-md lg:grid-cols-3 xl:grid-cols-4">
        {renderProuductList}
      </div>

      <Model isOpen={isOpen} closeModel={closeModel} title="Add a new product">
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderAllInputList}
          <div className="flex gap-2">{rendrAllColors}</div>
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
