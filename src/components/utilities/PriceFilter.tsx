import { PriceFilterType } from "../../types/Types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const PriceFilter: React.FC<PriceFilterType> = ({
  minCount,
  setMinCount,
  maxCount,
  setMaxCount,
  // selectedCategory,
  // setSelectedCategory,
  // categories,
}) => {
  // const location = useLocation();
  // const isProductSlug = location.pathname.startsWith("/all-products/");
  const theme = useSelector((state: RootState) => state.theme.colorScheme);

  return (
    <div
      className={`flex gap-4 bg-[#FAFAFA] border-[2px] border-[#E6A128] p-4 ${
        theme === "dark" ? "bg-[#121212]" : ""
      }`}
    >
      {/* {!isProductSlug && (
        <select
          className="outline-none px-3 py-1 border-[1px]"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category, index) => (
            <option value={category.name} key={index}>
              {category.name}
            </option>
          ))}
        </select>
      )} */}
      <input
        value={minCount}
        onChange={(e) => setMinCount(e.target.value)}
        className="border-[1px] outline-none px-1 text-black"
        type="number"
        placeholder="min"
      />
      <input
        value={maxCount}
        onChange={(e) => setMaxCount(e.target.value)}
        className="border-[1px] outline-none px-1 text-black"
        type="number"
        placeholder="max"
      />
    </div>
  );
};

export default PriceFilter;
