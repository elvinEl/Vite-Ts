import { AiOutlineMenu } from "react-icons/ai";

function Menu() {
  return (
    <>
      <button className="px-4 py-2 bg-[#E6A128] text-white rounded-[5px]">
        <p className="text-[22px] flex items-center gap-2">
          <span>
            <AiOutlineMenu  size={22}/>
          </span>
          КАТАЛОГ
        </p>
      </button>
    </>
  );
}

export default Menu;
