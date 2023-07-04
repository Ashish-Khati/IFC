import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductMiniCard from "../../components/ProductMiniCard";
import { GrFormDown } from "react-icons/gr";
import { openQuotationModal } from "../../redux/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getUser } from "../../redux/api";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { setCurrentProduct } from "../../redux/store/currentProductSlice";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { PersonOutline } from "@mui/icons-material";
import { SUB_CATEGORY } from "../../constants/list";
import { where } from "firebase/firestore";
import Fuse from "fuse.js";

const ProductPage = () => {
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState(true);
  const [review, setReview] = useState(false);
  const [ques, setQues] = useState(false);
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const storage = getStorage();

  async function getImages(product) {
    let pi = product.imagesUrl?.map(async (url) => {
      return getDownloadURL(ref(storage, url));
    });
    setProductImages(await Promise.all(pi));
  }

  useEffect(() => {
    const productId = location.pathname.split("/")[2];

    async function fetchProduct() {
      const p = await getProduct(productId);
      setProduct(p);
      await fetchSeller(p);
      await getImages(p);
      await getProducts(p);
    }
    async function fetchSeller(product) {
      const s = await getUser(product.sellerId);
      setSeller(s);
    }

    fetchProduct();
  }, [location]);

  const handleDesc = (e) => {
    setDesc(true);
    setReview(false);
    setQues(false);
  };

  const handleReview = (e) => {
    setDesc(false);
    setReview(true);
    setQues(false);
  };

  const handleQues = (e) => {
    setDesc(false);
    setReview(false);
    setQues(true);
  };

  //scroller
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  function handleRequirement(product) {
    const currentProduct = {
      name: product.name,
      price: product.price,
      sellerId: product.sellerId,
    };
    dispatch(setCurrentProduct(currentProduct));
    dispatch(openQuotationModal());
  }

  const getProducts = async (product) => {
    const productsCollectionRef = query(
      collection(db, "products"),
      where("subCategory", "==", product?.subCategoryategory)
    );

    try {
      const data = await getDocs(productsCollectionRef);
      let productsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      productsData = productsData.filter((p) => p.id !== product.id);

      setProducts(productsData);
      console.log(productsData);
    } catch (err) {
      console.log(err);
    }
  };

  const star = 0; //value of stars
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    return (
      <span key={index}>
        {star > index ? (
          <div className="w-[20px] h-[20px]">
            <img src="/Images/star.png" alt="stars" />
          </div>
        ) : (
          <div className="w-[20px] h-[20px]">
            <img src="/Images/emptystar.png" alt="stars" />
          </div>
        )}
      </span>
    );
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center justify-between lg:px-[55px] md:px-[55px] px-4 lg:py-[40px] md:py-[40px] py-[20px]">
        <Link to="/">
          <div className="font-poppins font-semibold lg:text-[32px] md:text-[32px] text-[18px] lg:leading-[44px] md:leading-[44px] leading-[20px]">
            Fuelcab
          </div>
        </Link>
        <span className="md:block hidden">
          <SearchBar />
        </span>

        <Link to="dashboard/setting" className="flex items-center">
          <PersonOutline fontSize="large" />
          {user && (
            <p className="font-bold md:text-xl text-md ml-2">{user.fullName}</p>
          )}
        </Link>
      </div>
      <span className="md:hidden flex justify-center mb-2">
        <SearchBar />
      </span>
      <div className="flex flex-row w-full h-[55px] bg-[#F9F9F9] lg:px-[40px] md:px-[40px] px-[30px] lg:gap-[40px] md:gap-[40px] lg:justify-normal md:justify-normal justify-between items-center relative">
        {FuelTypeList.map((fuelType, index) => (
          <DropDownMenu item={fuelType} key={index} />
        ))}
      </div>
      <div className="w-[1175px] mx-[42.5px] my-[16px] flex flex-row gap-[32px]">
        <div className="flex flex-col gap-[32px] w-[569px] h-full ">
          {productImages?.map((img) => (
            <div className="w-[569px] h-[436px] rounded-xl bg-[#F9F9F9]">
              <img
                src={img}
                alt="product image"
                className="object-contain h-full"
              />
            </div>
          ))}
        </div>

        <div className="w-[574px] h-full flex flex-col">
          {product && (
            <>
              <div className="w-full flex flex-col gap-[40px]">
                <div className="flex flex-col w-[full] h-[73px] gap-[8px] justify-start">
                  <div className="font-poppins font-semibold text-[32px] leading-[45px] text-[#151515]">
                    {product.name}
                  </div>
                  <div className="flex flex-row w-[240px] h-[20px] gap-[8px] items-center">
                    <div className="flex flex-row gap-[2px] items-center">
                      {ratingStar}
                    </div>
                    <u className="font-sans text-xs text-[#A9A9A9]">
                      {`(${
                        product.totalReviews ? product.totalReviews : 0
                      } customer reviews)`}
                    </u>
                  </div>
                </div>
                <div className="w-full h-[112px] flex flex-row gap-[32px]">
                  <div className="w-[269px] h-full flex flex-col gap-[12px]">
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        SKU:
                      </div>
                      <div className="w-[160px] h-full font-sans text-sm text-[#151515]">
                        {`${product.id}`.slice(-5)}
                      </div>
                    </div>
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        Category:
                      </div>
                      <div className="capitalize w-[160px] h-full font-sans text-sm text-[#151515]">
                        <u className="font-sans">{product.category}</u>
                      </div>
                    </div>
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        Stock:
                      </div>
                      <div className="w-[160px] h-full font-sans text-sm text-[#7AC93B]">
                        <u className="font-sans">
                          {product.inStock ? "In stock" : "out of stock"}
                        </u>
                      </div>
                    </div>
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        Company:
                      </div>
                      <div className="w-[160px] h-full font-sans text-sm text-[#151515]">
                        {seller?.fullName}
                      </div>
                    </div>
                  </div>

                  <div className="w-[269px] h-full flex flex-col gap-[12px]">
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        Buy by:
                      </div>
                      <div className="capitalize w-[160px] h-full font-sans text-sm text-[#151515]">
                        {product.price?.unit}
                      </div>
                    </div>
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        Sub category:
                      </div>
                      <div className="w-[160px] h-full font-sans text-sm text-[#151515]">
                        {product.subCategory}
                      </div>
                    </div>
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        Delivery:
                      </div>
                      <div className="w-[160px] h-full font-sans text-sm text-[#151515]">
                        Free shipping
                      </div>
                    </div>
                    <div className="w-full h-[19px] flex flex-row">
                      <div className="w-[102px] h-full font-sans text-sm text-[#A9A9A9]">
                        Location:
                      </div>
                      <div className="w-[160px] h-full font-sans text-sm text-[#151515]">
                        {`${product?.location?.addressLine}, ${product.location?.city}`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[534px] h-[148px] flex flex-col gap-[24px]">
                  <div className="w-full h-[89px] flex border-[1px] border-[#F5F5F5] rounded-[10px] items-center p-4 justify-between">
                    <h2 className="font-semibold text-[26px] leading-[39px] text-[#7AC93B]">
                      {Number(product.price?.value)
                        ? "Rs. " + product?.price.value
                        : "AUTO"}
                    </h2>
                    <div className="w-[25%] p-1 h-[48px] flex flex-row border-[1px] border-[#D1D1D1] rounded-xl my-[20.5px] ml-[90px] bg-[#F9F9F9] items-center">
                      <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="number"
                        placeholder="Enter quantity"
                        className="h-[19px] w-full outline-none bg-[#F9F9F9] font-sans text-sm text-[#D1D1D1] ml-[14px]"
                      />
                    </div>
                    <button
                      onClick={() => handleRequirement(product)}
                      className="w-[30%] text-white font-semibold h-[47px] rounded-[10px] bg-[#7AC93B] items-center"
                    >
                      Send Requirement
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  w-full gap-[48px] ">
                <div className="w-full h-[43px] flex flex-row items-center">
                  <button
                    className={`${
                      desc ? "border-b-2 border-[#5932EA]" : null
                    } w-[165px] h-full font-poppins text-lg font-semibold text-[#151515] flex items-center `}
                    onClick={handleDesc}
                  >
                    Description
                  </button>
                  <button
                    className={`${
                      review ? "border-b-2 border-[#5932EA]" : null
                    } w-[112px] h-full font-poppins text-lg font-semibold text-[#151515] ml-[32px] mr-[90px] flex items-center`}
                    onClick={handleReview}
                  >
                    Reviews
                    <p className="w-[29px] h-[18px] bg-[#F4F8EC] rounded-xl font-poppins text-xs font-semibold ml-[8px] text-[#5932EA]">
                      0
                    </p>
                  </button>
                </div>

                {desc && (
                  <div className="w-full h-full flex flex-col gap-[32px]">
                    <div className="w-full h-[50px] flex flex-col gap-[8px]">
                      <span className="font-sans text-sm text-[#151515]">
                        {product.description}
                      </span>
                    </div>
                  </div>
                )}
                {review && (
                  <div className="w-full h-full flex flex-col gap-[32px]">
                    <div className="w-full h-[50px] flex flex-col gap-[8px]">
                      <span className="font-poppins font-medium text-[15px] text-[#151515] leading-[22px]">
                        No Review
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full px-[45px] gap-[32px] ">
        <div className="flex flex-row w-full h-[38px] mt-[64px] justify-between items-center">
          <span className="font-poppins text-lg font-semibold text-[#151515]">
            Related Products
          </span>

          <button
            className="flex flex-row gap-[6px] py-[6px] px-[12px] items-center"
            onClick={slideRight}
          >
            <span className="font-poppins text-[15px] font-bold leading-[22px] text-[#151515]">
              More Product
            </span>
            <img src="/Images/ic-chevron-right.png" />
          </button>
        </div>
        <div
          id="slider"
          className="flex flex-row w-full pb-4 gap-[32px] overflow-hidden "
        >
          {products?.map((product) => (
            <ProductMiniCard
              key={product.id}
              product={product}
              handleRequirement={handleRequirement}
            />
          ))}
          {!products.length && (
            <p className="text-center mb-4 w-full text-md font-semibold">
              No related products found...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FuelTypeList = [
  {
    name: "Solid",
    list: [
      "Animal Tallow",
      "Chicken Tallow",
      "Palm Stearin",
      "PP/HDPE Waste",
      "LDP/MHW",
      "Tyre Waste",
      "Saw Dust",
      "Wood Chips",
      "Rise Husk",
      "Coffee Husk",
      "Ground Nut Cell",
      "Soya Husk",
      "Carbon Black",
      "Bio-Mass Pallets",
      "Starch Based Raw Materials",
      "RDF (Refuse Derived Fuel)",
      "Biomass Briquettes/Bio Coal",
      "Other Bio Mass",
    ],
  },
  {
    name: "Liquid",
    list: [
      "High Speed Diesel",
      "Bio Diesel (B-100)",
      "LDO",
      "Bio-LDO",
      "Furnace Oil ",
      "Base Oil",
      "Bitumen",
      "UCO",
      "MTO",
      "MTO Cut",
      "MHO",
      "Bio-Ethanol",
      "Bio-Furnace Oil",
      "Bio- Fuel Additives",
      "Acid Oil",
      "Other Vegetable Oil",
      "Bio-Lubricants",
      "Lubricants",
      "New Bitumen",
    ],
  },
  { name: "Gas", list: ["Bio-CNG/CBG", "CNG", "LNG", "Green Hydrogen"] },
];

const DropDownMenu = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (category, subCategory) => {
    navigate("/products", {
      relative: false,
      replace: true,
      state: { category: `${category}`.toLocaleLowerCase(), subCategory },
    });
  };
  return (
    <div className="flex flex-col relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-[23px] flex items-center gap-[4px]  outline-none font-poppins font-medium text-[15px] leading-[22px] text-[#151515]"
      >
        {item.name}
        <GrFormDown />
      </button>
      {isOpen && (
        <React.Fragment>
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`absolute w-[300px] top-[42px] bg-[#F9F9F9] border border-gray-200 px-[8px] py-[10px] rounded-xl opacity-100 z-50 `}
          >
            {item.list.map((listItem, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  handleNavigation(item.name, listItem);
                }}
                className="h-[40px] flex items-center gap-[4px] p-[8px] outline-none bg-[#F9F9F9]  font-poppins font-medium text-[15px] leading-[22px] text-[#151515] hover:bg-[#e8e8ed] rounded-lg w-full"
              >
                {listItem}
              </button>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const SearchBar = ({ setFilters }) => {
  const [searchAutocomplete, setSearchAutocomplete] = useState([]);
  const navigate = useNavigate();
  const fuse = useRef();

  useEffect(() => {
    const { gas, liquid, solid } = SUB_CATEGORY;
    fuse.current = new Fuse([...gas, ...liquid, ...solid], {
      keys: ["title", "desc"],
    });
  }, []);

  const handleNavigation = (subCategory) => {
    let category = "solid";
    if (SUB_CATEGORY.gas.find(({ title }) => title === subCategory)) {
      category = "gas";
    } else if (SUB_CATEGORY.liquid.find(({ title }) => title === subCategory)) {
      category = "liquid";
    }

    navigate("/products", {
      relative: false,
      replace: true,
      state: { category, subCategory },
    });
  };

  return (
    <div className="relative flex flex-row lg:w-[358px] md:w-[358px] w-11/12 h-[42px] border border-[#D1D1D1] justify-between items-center bg-[#F9F9F9] rounded-xl px-[16px]">
      <input
        onChange={(e) => {
          if (fuse.current) {
            const res = fuse.current.search(e.target.value);
            setSearchAutocomplete(res.slice(0, 10));
          }
        }}
        placeholder=" Search Product, Categories ..."
        className="font-sans lg:w-[262px] md:w-[262px] w-full h-[19px] text-sm  text-[#A9A9A9] bg-[#F9F9F9] outline-none"
      />
      <button className="w-[18px] h-[16px] transform-scale-x-100">
        <img src="/Images/ProductNavBar-searchIcon.png" alt="search" />
      </button>

      {!!searchAutocomplete.length && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-xl left-0 top-14 px-[8px] py-[10px]  w-full">
          {searchAutocomplete.map(({ item }, index) => (
            <button
              key={index}
              onClick={(e) => {
                handleNavigation(item.title);
                setSearchAutocomplete([]);
              }}
              value={item}
              className="font-sg text-[14px] leading-[28px] h-[38px] p-[8px] text-[#111B29]  flex items-center justify-start hover:bg-[#e1e1e6] rounded-lg w-full"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
