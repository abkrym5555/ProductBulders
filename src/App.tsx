import { useState, type ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import ProductCard from "./components/ProductCard";
import { productList, formInputsList, colors, categories } from "./data";
import Model from "./ui/Model";
import Button from "./ui/Button";
import Input from "./ui/Input";
import type {
  ICategory,
  IProduct,
  IProductValditon,
} from "./interfaces/intrface";
import { productValidation } from "./validation";
import ErorrMassega from "./components/ErorrMassega";
import CircleColor from "./components/CircleColor";
import SelectMenue from "./ui/SelectMenue";

const initialProduct = {
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

const productValdErrMsg = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
};

function App() {
  //-------------states---------------------------//
  const [prouducts, setprouducts] = useState<IProduct[]>(productList);

  const [prouduct, setprouduct] = useState<IProduct>(initialProduct);

  const [errorMsgs, seterrorMsgs] =
    useState<IProductValditon>(productValdErrMsg);

  const [isOpen, setIsOpen] = useState(false);

  const [tempColors, settempColors] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[0],
  );

  //------------helper fun------------------------//
  function openModel() {
    setIsOpen(true);
  }

  function closeModel() {
    setIsOpen(false);
    setprouduct(initialProduct);
    seterrorMsgs(productValdErrMsg);
    settempColors([]);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setprouduct({ ...prouduct, [name]: value });
    seterrorMsgs({ ...errorMsgs, [name]: "" });
  }

  function onCancelHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    closeModel();
  }

  function onSubmitHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { price, description, imageURL, title } = prouduct;
    const errors = productValidation({ price, description, imageURL, title });
    const hasErrorMessage =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (!hasErrorMessage) {
      seterrorMsgs(errors);
      return;
    }
    console.log(prouduct);
    setprouducts((prev) => [
      {
        ...prouduct,
        id: uuid(),
        colors: tempColors,
        category: {
          name: selectedCategory.name,
          imageURL: selectedCategory.imageURL,
        },
      },
      ...prev,
    ]);
    closeModel();
  }

  //------------render------------------------//
  const renderProuductList = prouducts.map((product) => (
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
    <CircleColor
      bgColor={cl}
      key={cl}
      onClick={() =>
        settempColors((cls) =>
          cls.includes(cl) ? cls.filter((filcl) => cl !== filcl) : [...cls, cl],
        )
      }
    />
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
          <SelectMenue
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          {tempColors.length ? (
            <div className="flex gap-2 text-white flex-wrap font-semibold">
              {tempColors.map((slccol) => (
                <span
                  className="rounded-md p-1"
                  style={{ backgroundColor: slccol }}
                >
                  {slccol}
                </span>
              ))}
            </div>
          ) : null}
          <div className="flex gap-2 flex-wrap">{rendrAllColors}</div>
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
