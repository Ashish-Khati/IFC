import { Link } from "react-router-dom";

// vertical product card
export default function VerProductCard({
  item: { name, imagesRef, category, price, subCategory, id },
}) {
  return (
    <div className="flex lg:flex-col md:flex-col  flex-row gap-[14px] lg:w-[220px] lg:h-[400px] md:w-[220px] md:h-[400px] w-11/12 h-[100px]">
      <Link
        to={`product/${id}`}
        className="lg:w-full md:w-full w-[185x] lg:h-[373px] md:h-[373px] h-[150px] rounded-[9px] overflow-hidden"
      >
        <img src={imagesRef} className="w-full h-full object-cover" />
      </Link>
      <div className="flex flex-col gap-[12px] bg-[#373b29] md:h-fit h-[150px] text-white text-opacity-80 rounded-[10px] p-4 w-full">
        <span className="text-sm text-[#ffffff] text-bold">{name}</span>
        <div className="flex md:flex-nowrap flex-wrap items-center md:gap-[4px] gap-[12px] w-full">
          <span className="font-light text-xs capitalize">{category}</span>
          <span className="font-light text-xs block w-full">{`(${subCategory})`}</span>
        </div>
        {!!Number(price?.value) ? (
          <span className="font-semibold text-xs">
            From {price?.value}
            <span className="font-light">/{price?.unit}</span>
          </span>
        ) : (
          <p className="font-semibold text-xs">Not Fixed Price</p>
        )}
      </div>
    </div>
  );
}
