import { useParams } from "react-router-dom";
import productData from "../../mocks/topProductsData.json";
import { TopProductsType } from "../../types/Types";
function DetailProducts() {
  const { id } = useParams<{ id: string }>();
  const product = productData.find(
    (product: TopProductsType) => product.id.toString() === id
  );
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img className="w-full rounded-lg shadow-lg max-h-[600px]" src={product?.img} />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-4xl font-bold mb-4">{product?.title}</p>
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              {product?.price.toFixed(3)}₽
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProducts;
