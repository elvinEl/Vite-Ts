import { useParams } from "react-router-dom";
import productData from "../../mocks/topProductsData.json";
import { TopProductsType } from "../../types/Types";
import { addBasket } from "../../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Button from "../button/Button";
function DetailProducts() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const product = productData.find(
    (product: TopProductsType) => product.id.toString() === id
  );
  const handleAddBasket = (product: TopProductsType) => {
    dispatch(addBasket(product));
    toast.success("Товар добавлен в корзину");
  };
  if (!product) {
    return <div>Товар не найден</div>;
  }
  return (
    <div className="container mx-auto p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            className="w-full rounded-lg shadow-lg max-h-[600px]"
            src={product?.img}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-4xl font-bold mb-4">{product?.title}</p>
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              {product?.price.toFixed(3)}₽
            </p>
            <Button
              onClick={() => handleAddBasket(product)}
              className="px-5 py-2 mt-2 rounded-sm hover:bg-blue-800 duration-200 bg-[#365EDC]  uppercase text-white text-[14px]"
            >
              {product?.btnText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProducts;
