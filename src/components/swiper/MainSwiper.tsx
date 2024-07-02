import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import swiperData from "../../mocks/swiperData.json";
import { SwiperType } from "../../types/Types";
export default function MainSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {swiperData.map((data: SwiperType) => (
          <SwiperSlide key={data.id}>
            <div className="bg-[#365EDC] rounded-[20px] flex justify-center items-center text-white p-4 my-8">
              <div className="flex flex-col justify-start items-start gap-4">
                <p className="text-[40px]">{data.title}</p>
                <p className="text-[22px] text-[#BDCDFF]">{data.description}</p>
                <button className="uppercase bg-[#E6A128] px-7 py-3 rounded-[10px]">
                  {data.btnText}
                </button>
              </div>
              <div>
                <img src="../img/chair.png" alt="" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
