import React from "react";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const ProductMiniCard = ({ product, handleRequirement }) => {
  if (!product?.price?.value || !product?.imagesUrl || !product?.name) return;
  return (
    <div className="flex flex-col w-[268px] h-[323px] p-[16px] gap-[16px] border border-[#D1D1D1] rounded-xl">
      <Img product={product} />
      <div className="flex flex-col w-[236px] h-[95px] gap-[16px]">
        <div className="flex flex-col w-full h-[43px] gap-[4px]">
          <span className="font-poppins font-medium text-[15px] leading-[22px] text-[#151515]">
            {product.name}
          </span>
          <span className="font-sans text-xs text-[#575757]">
            {product.description}
          </span>
        </div>
        <div className="flex flex-row w-full h-[36px] justify-between items-center">
          <div className="flex flex-col font-poppins text-[18px] font-semibold text-[#151515]">
            {product?.price.value}

            {product?.oldPrice && (
              <s className="font-poppins text-xs font-semibold text-[#A9A9A9]">
                {product.oldPrice}
              </s>
            )}
          </div>
          <button
            className="w-[90px] h-[36px] bg-[#5932EA] font-poppins font-bold text-[15px] leading-[22px] text-[#ffffff] items-center rounded-xl"
            onClick={() => handleRequirement(product)}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

function Img({ product }) {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();

  const getImageUrl = async (path) => {
    const image = await getDownloadURL(ref(storage, path));
    setImageUrl(image);
  };

  useEffect(() => {
    async function getImage() {
      await getImageUrl(product?.imagesUrl[0]);
    }
    getImage();
  }, [imageUrl]);

  return (
    <div
      className="w-[236px] h-[180px] "
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        borderRadius: "5px",
      }}
    ></div>
  );
}

export default ProductMiniCard;
