import type { IProduct } from "../interfaces/intrface";
import Button from "../ui/Button";
import { textSlicer } from "../utils";
import Image from "./Image";

interface IProductCardProps {
  product: IProduct;
}

function ProductCard({ product }: IProductCardProps) {
  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 flex flex-col p-2 border rounded-md">
      <Image
        url={product.imageURL}
        alt={product.title}
        className=" rounded-md w-full h-52 lg:object-cover"
      />

      <h3>{product.title}</h3>
      <p className="line-clamp-1">{textSlicer(product.description)}</p>
      <div className="flex space-x-2 items-center my-4">
        {product.colors.map((color) => (
          <span
            className={`w-5 h-5 rounded-full cursor-pointer`}
            style={{ backgroundColor: `${color}` }}
          ></span>
        ))}
      </div>

      <div className="flex  justify-between items-center">
        <span className="">5000$</span>
        <Image
          url={product.imageURL}
          alt={product.title}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>

      <div className="flex items-center gap-2 mt-5">
        <Button className=" bg-indigo-700 ">edit </Button>
        <Button className=" bg-red-700 ">destroy</Button>
      </div>
    </div>
  );
}

export default ProductCard;
