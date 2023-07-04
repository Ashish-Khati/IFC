import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/store/cartSlice";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import { openQuotationModal } from "../redux/store/modalSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();

  const getImageUrl = async (path) => {
    const image = await getDownloadURL(ref(storage, path));
    setImageUrl(image);
    console.log(imageUrl);
  };

  useEffect(() => {
    async function getImage() {
      await getImageUrl(product.imagesUrl[0]);
    }
    product.imagesUrl && getImage();
  }, [imageUrl]);

  const star = 4; //value of star rating
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    return (
      <span key={index}>
        {star > index ? (
          <div className="w-[20px] h-[20px]">
            <img src="/images/blackstar.png" alt="rating in stars" />
          </div>
        ) : (
          <div className="w-[20px] h-[20px]">
            <img src="/images/emptystar.png" alt="rating in stars" />
          </div>
        )}
      </span>
    );
  });

  function handleDetail() {
    navigate(`/product/${product.id}`, { state: product });
  }

  return (
    <>
      <div className="w-full lg:hidden md:hidden border-1 border-gray-400 rounded-xl flex flex-col p-2">
        <div className="flex">
          <div className="h-[180px] w-1/2">
            <img
              style={{ objectFit: "contain" }}
              className="w-full h-full m-0 rounded-xl bg-[#F9F9F9] object-cover"
              src={imageUrl || null}
              alt="product"
            />
          </div>
          <div className="w-1/2 p-2 flex flex-col justify-between">
            <span>
              <h1 className="text-xl font-semibold">{product.name}</h1>
              <p className="text-sm text-gray-400 mt-1">
                {product.description}
              </p>
            </span>
            <span className="mt-2">
              <p className="text-sm text-gray-400 capitalize">
                {product.category}
              </p>
              <p className="text-sm text-gray-400 mt-1 capitalize">
                {product.subCategory}
              </p>
            </span>
            <span className="mt-2">
              <h4 className="text-sm text-gray-400">
                {product.location?.addressLine}
              </h4>
              <h1 className="text-lg font-semibold mt-1">
                {!!Number(product.price?.value)
                  ? `${product.price?.value} / ${product.price?.unit}`
                  : "Not fixed Price"}
              </h1>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center pt-2 w-full gap-[12px]">
          <button
            onClick={() => dispatch(openQuotationModal(product))}
            className="bg-[#F5F5F5] h-[47px] flex flex-row w-full justify-center items-center rounded-xl py-[12px] pl-[12px] pr-[12px] gap-[8px]"
          >
            <span className="font-poppins font-bold text-[15px] leading-[22.5px] text-[#151515] order-1">
              Send Requirement
            </span>
          </button>
          <button
            onClick={handleDetail}
            className="flex flex-row bg-[#7AC93B] h-[47px] justify-center w-full rounded-xl py-[12px] pr-[20px] pl-[20px] gap-[12px] items-center"
          >
            <span className=" text-white font-poppins font-bold py-[12px] text-[15px] leading-[22px]">
              Product Detail
            </span>
            <img src="/images/arrow.png" alt=">" />
          </button>
        </div>
      </div>
      <div className="lg:flex md:flex hidden flex-row border w-[869px] h-[280px] border-[#d1d1d1] rounded-xl overflow-hidden ">
        <div className="w-[268px] h-full">
          <img
            className="w-full h-full m-0 bg-[#F9F9F9] rounded-xl rounded-tr-none rounded-br-none object-cover"
            src={imageUrl || null}
            style={{ objectFit: "contain" }}
            alt="product"
          />
        </div>

        <div className="flex flex-col justify-start w-[269px] h-[212px] mt-[32px] ml-[32px] gap-[25px]">
          <div className="flex flex-col justify-start w-full h-[75px] gap-[8px] ">
            <div className="flex flex-col w-full h-[47px] gap-[4px]">
              <div className="font-poppins text-[18px] not-italic font-semibold leading-[27px] items-center text-[#151515]">
                {product.name}
              </div>
              <div className="font-sans text-[12px] not-italic leading-[16px] text-[#575757]">
                {product.description}
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full h-[112px] items-start justify-start ">
            <div className="w-[106px] h-[112px] flex flex-col gap-[8px] ">
              <div className="font-sans font-normal text-sm text-[#A9A9A9] leading-5">
                Category
              </div>
              <div className="font-sans font-normal text-sm text-[#A9A9A9] leading-5">
                Sub category
              </div>
              <div className="font-sans font-normal text-sm text-[#A9A9A9] leading-5">
                Location
              </div>
              <div className="font-sans font-normal text-sm text-[#A9A9A9] leading-5">
                Stock
              </div>
            </div>
            <div className=" h-[112px] flex flex-col gap-[8px] ">
              <div className="font-sans font-normal h-[19px] text-sm text-[#A9A9A9] leading-5">
                {product.category}
              </div>
              <div className="font-sans font-normal h-[19px] text-sm text-[#A9A9A9] leading-5">
                {product.subCategory}
              </div>
              <div className="font-sans font-normal h-[19px] text-sm text-[#A9A9A9] leading-5">
                {`${product.location?.addressLine}, ${product.location?.state}`}
              </div>
              <div className="font-sans font-normal h-[19px] text-sm text-[#A9A9A9] leading-5">
                <span className="text-[#4A7B24]] font-sans">
                  {product.inStock ? "In Stock" : "Not in Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[172px] h-[216px] ml-[96px] mt-[32px]  justify-between flex flex-col">
          <div className="flex flex-col mb-[16px]">
            <span className="font-poppins font-semibold text-lg text-[#151515]">
              {!!Number(product.price?.value)
                ? `${product.price?.value} / ${product.price?.unit}`
                : "Not fixed Price"}
            </span>
            <span className="font-poppins font-semibold text-xs text-[#A9A9A9] leading-5">
              Free Shipping
            </span>
          </div>

          <div className="flex flex-col h-[95px] w-[164px] gap-[12px] ml-[8px]">
            <span>
              <button
                onClick={handleDetail}
                className="flex flex-row bg-[#7AC93B] h-[47px] w-full rounded-xl py-[12px] pl-[20px] gap-[12px] items-center"
              >
                <span className=" text-white font-poppins font-bold text-[15px] leading-[22px]">
                  Product Detail
                </span>
                <img src="/images/arrow.png" alt=">" />
              </button>
            </span>
            <button
              disabled={product.sellerId === user?.id}
              onClick={() => dispatch(openQuotationModal(product))}
              className={`bg-[#F5F5F5] h-[36px] flex flex-row items-center rounded-xl py-[6px] pl-[12px] gap-[8px] ${
                product.sellerId === user?.id
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } `}
            >
              <span
                className={`font-poppins font-bold text-[15px] leading-[22.5px] text-[#151515] order-1`}
              >
                Send Requirement
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
