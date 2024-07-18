import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TopProductsType, CurrencyRates } from "../../types/Types";
import { addBasket } from "../../redux/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button/Button";
// import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import useConvertCurrency from "../../components/utilities/convertCurrency";
import { RootState } from "../../redux/store";
import axios from "axios";
import { renderStars } from "../../components/utilities/renderStars";
function DetailProducts() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const currencyRates: CurrencyRates = useConvertCurrency();
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.selectedCurrency
  );
  const convertPrice = (price: number) => {
    if (currencyRates[selectedCurrency]) {
      return (price / currencyRates[selectedCurrency].value).toFixed(0);
    }
    return price;
  };
  const [product, setProduct] = useState<TopProductsType | null>(null);
  const getProductsWithId = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductsWithId();
  }, []);
  const handleAddBasket = (product: TopProductsType) => {
    dispatch(addBasket(product));
    toast.success("Товар добавлен в корзину");
  };
  if (!product) {
    return <div>Товар не найден</div>;
  }
  // const [selectedImg, setSelectedImg] = useState(product?.image);
  // const handleNextImage = () => {
  //   const currentIndex = product.image.indexOf(selectedImg || "") || 0;
  //   const nextIndex = (currentIndex + 1) % product.image.length;
  //   setSelectedImg(product?.image[nextIndex]);
  // };
  // const handlePrevImage = () => {
  //   const currentIndex = product.image.indexOf(selectedImg || "") || 0;
  //   const prevIndex =
  //     (currentIndex - 1 + product.image.length) % product.image.length;
  //   setSelectedImg(product?.image[prevIndex]);
  // };
  return (
    <div className="container mx-auto p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <div>
          <div className="relative image-card">
            <image
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
            {product.image.map((imgSrc, index) => (
              <img
                key={index}
                className="w-20 h-20 mr-2 cursor-pointer border border-gray-300 rounded"
                src={imgSrc}
                onClick={() => setSelectedImg(imgSrc)}
              />
            ))}
          </div>
        </div> */}
        <div>
          <img
            className=" rounded-lg shadow-lg h-[600px]"
            src={product.image}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-4xl font-bold mb-4">{product.title}</p>
            <p className="mb-4 uppercase font-bold">{product.category}</p>
            <p className="mb-4">{product.description}</p>
            <p className="text-[18px] line-clamp-2 mb-4 flex items-center gap-1">
              {product.rating.rate}
              <span className="flex">{renderStars(product.rating.rate)}</span>
            </p>
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              {convertPrice(product.price)} {selectedCurrency}
            </p>

            <Button
              onClick={() => handleAddBasket(product)}
              className="px-5 py-2 mt-2 rounded-sm hover:bg-[#ca9334] bg-[#E6A128] duration-200  uppercase text-white text-[14px]"
            >
              Add Basket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProducts;
