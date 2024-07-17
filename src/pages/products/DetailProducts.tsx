import { useState } from "react";
import { useParams } from "react-router-dom";
import productData from "../../mocks/topProductsData.json";
import { TopProductsType } from "../../types/Types";
import { addBasket } from "../../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button/Button";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

function DetailProducts() {
  const allProducts = productData.categories.flatMap(
    (category) => category.items
  );
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find(
    (product: TopProductsType) => product.id.toString() === id
  );
  const [selectedImg, setSelectedImg] = useState(product?.img[0]);
  const handleAddBasket = (product: TopProductsType) => {
    dispatch(addBasket(product));
    toast.success("Товар добавлен в корзину");
  };
  if (!product) {
    return <div>Товар не найден</div>;
  }

  const handleNextImage = () => {
    const currentIndex = product.img.indexOf(selectedImg || "") || 0;
    const nextIndex = (currentIndex + 1) % product.img.length;
    setSelectedImg(product?.img[nextIndex]);
  };
  const handlePrevImage = () => {
    const currentIndex = product.img.indexOf(selectedImg || "") || 0;
    const prevIndex =
      (currentIndex - 1 + product.img.length) % product.img.length;
    setSelectedImg(product?.img[prevIndex]);
  };
  return (
    <div className="container mx-auto p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative img-card">
            <img
              className="w-full rounded-lg shadow-lg h-[600px]"
              src={selectedImg}
            />
            <Button
              onClick={handleNextImage}
              className="arrow hidden absolute top-1/2 transform -translate-y-1/2 right-0 -translate-x-8 cursor-pointer bg-gray-400 rounded-[50%] p-1 text-white"
            >
              <FiArrowRight size={32} />
            </Button>
            <Button
              onClick={handlePrevImage}
              className="arrow hidden absolute top-1/2 transform -translate-y-1/2 left-0 translate-x-8 cursor-pointer bg-gray-400 rounded-[50%] p-1 text-white"
            >
              <FiArrowLeft size={32} />
            </Button>
          </div>

          <div className="flex mt-4">
            {product.img.map((imgSrc, index) => (
              <img
                key={index}
                className="w-20 h-20 mr-2 cursor-pointer border border-gray-300 rounded"
                src={imgSrc}
                onClick={() => setSelectedImg(imgSrc)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-4xl font-bold mb-4">{product?.title}</p>
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              {product?.price}₽
            </p>
            <Button
              onClick={() => handleAddBasket(product)}
              className="px-5 py-2 mt-2 rounded-sm hover:bg-blue-800 duration-200 bg-[#365EDC] uppercase text-white text-[14px]"
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
