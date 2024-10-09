import Input from "../input/Input";

function Search() {
  return (
    <>
      <Input
        className="border-[2px]  w-full border-[#E6A128] px-4 outline-none"
        type="text"
        placeholder="Поиск товаров по категориям"
      />
    </>
  );
}

export default Search;
