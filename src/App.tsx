import { useState, type ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import ProductCard from "./components/ProductCard";
import { productList, formInputsList, colors, categories } from "./data";
import Model from "./ui/Model";
import Button from "./ui/Button";
import Input from "./ui/Input";
import type { ICategory, IProduct } from "./interfaces/intrface";
import { productValidation } from "./validation";
import ErorrMassega from "./components/ErorrMassega";
import CircleColor from "./components/CircleColor";
import SelectMenue from "./ui/SelectMenue";
import type { TProductNames } from "./types";

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

  const [prouductIndex, setprouductIndex] = useState<number>(0);

  const [productToEdit, setproductToEdit] = useState<IProduct>(initialProduct);

  const [errorMsgs, seterrorMsgs] = useState(productValdErrMsg);

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenEditModel, setIsOpenEditModel] = useState(false);

  const [isOpeDeletModel, setisOpeDeletModel] = useState(false);

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

  const openEditModel = () => {
    setIsOpenEditModel(true);
  };

  const closeEditModel = () => {
    setIsOpenEditModel(false);
  };

  const closeDeleteModel = () => {
    setisOpeDeletModel(false);
  };

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setprouduct({ ...prouduct, [name]: value });
    seterrorMsgs({ ...errorMsgs, [name]: "" });
  }

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setproductToEdit({ ...productToEdit, [name]: value });
    seterrorMsgs({ ...errorMsgs, [name]: "" });
  };

  function onCancelHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    closeModel();
  }

  function onSubmitHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { price, description, imageURL, title, colors } = prouduct;
    const errors = productValidation({
      price,
      description,
      imageURL,
      title,
      colors,
    });
    const hasErrorMessage =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (!hasErrorMessage) {
      seterrorMsgs(errors);
      return;
    }
    setprouducts((prev) => [
      {
        ...prouduct,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    closeModel();
  }

  const onSubmitEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { price, description, imageURL, title, colors } = productToEdit;
    const errors = productValidation({
      price,
      description,
      imageURL,
      title,
      colors,
    });
    const hasErrorMessage =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (!hasErrorMessage) {
      seterrorMsgs(errors);
      return;
    }

    const UpProducts = [...prouducts];
    UpProducts[prouductIndex] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setprouducts(UpProducts);

    setproductToEdit(initialProduct);
    settempColors([]);
    closeEditModel();
  };

  const closeConfirmModal = () => {
    setisOpeDeletModel(false);
  };

  const removeProductHandler = () => {
    setprouducts((prods) => prods.filter((prod, idx) => idx !== prouductIndex));
    setisOpeDeletModel(false);
  };

  //------------render------------------------//
  const renderProuductList = prouducts.map((product, idx) => (
    <ProductCard
      idx={idx}
      key={product.id}
      product={product}
      setproductToEdit={setproductToEdit}
      openEditModel={openEditModel}
      setprouductIndex={setprouductIndex}
      setisOpeDeletModel={setisOpeDeletModel}
    />
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
      onClick={() => {
        if (tempColors.includes(cl)) {
          settempColors((prevcls) => prevcls.filter((filcl) => cl !== filcl));
          return;
        }
        if (productToEdit.colors.includes(cl)) {
          settempColors((prevcls) => prevcls.filter((filcl) => cl !== filcl));
          return;
        }
        settempColors((prevcls) => [...prevcls, cl]);
      }}
    />
  ));

  const renderAllInputEditModel = (
    id: string,
    label: string,
    name: TProductNames,
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-px text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input
          id={id}
          type="text"
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErorrMassega msg={errorMsgs[name]} />
      </div>
    );
  };

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

      {/* open add product model */}
      <Model isOpen={isOpen} closeModel={closeModel} title="Add a new product">
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderAllInputList}
          <SelectMenue
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex gap-2 flex-wrap">{rendrAllColors}</div>
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

      {/* open edit product model */}
      <Model
        isOpen={isOpenEditModel}
        closeModel={closeEditModel}
        title="Edit the product"
      >
        <form className="space-y-3" onSubmit={onSubmitEditHandler}>
          {renderAllInputEditModel("title", "Product title", "title")}
          {renderAllInputEditModel(
            "description",
            "Product description",
            "description",
          )}
          {renderAllInputEditModel("imageURL", "Product imageURL", "imageURL")}
          {renderAllInputEditModel("price", "Product price", "price")}

          <SelectMenue
            selected={productToEdit.category}
            setSelected={(value) =>
              setproductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="flex gap-2 flex-wrap">{rendrAllColors}</div>

          <div className="flex gap-2 text-white flex-wrap font-semibold">
            {tempColors.concat(productToEdit.colors).map((slccol) => (
              <span
                className="rounded-md p-1"
                style={{ backgroundColor: slccol }}
              >
                {slccol}
              </span>
            ))}
          </div>

          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
        </form>
      </Model>

      {/* open edit product model */}
      <Model
        isOpen={isOpeDeletModel}
        closeModel={closeDeleteModel}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Model>
    </div>
  );
}

export default App;
