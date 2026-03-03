import Button from "../ui/Button";
import Image from "./Image";

interface IProductCardProps {}

function ProductCard({}: IProductCardProps) {
  return (
    <div className="flex  flex-col p-2 border rounded-md">
      <Image
        url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="product one"
        className="rounded-md mb-2"
      />
      <h3>product one</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
        dignissimos animi architecto necessitatibus a quo eos vero
        molestias{" "}
      </p>
      <div className="flex gap-1 items-center my-4">
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-amber-800 rounded-full cursor-pointer"></span>
      </div>

      <div className="flex  justify-between items-center">
        <span className="">5000$</span>
        <Image
          url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="product one"
          className="w-10 h-10 rounded-full"
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
