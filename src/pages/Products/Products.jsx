import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ProductCard from "../../components/ProductCard";
import { GrFormDown } from "react-icons/gr";
import { getProducts } from "../../redux/api";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { where, or, and } from "firebase/firestore";
import { FilterAlt } from "@mui/icons-material";
import {
  Close,
  PersonOutline,
  ShoppingBag,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import Fuse from "fuse.js";
import { SUB_CATEGORY } from "../../constants/list";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Rating = [
  {
    star: 1,
  },
  {
    star: 2,
  },
  {
    star: 3,
  },
  {
    star: 4,
  },
  {
    star: 5,
  },
];

const ProductPerPage = 4;
const initialFilters = {
  category: [],
  subCategory: [],
  rating: [],
  price: [0, 0],
};

const ProductsPage = () => {
  const [filters, setFilters] = useState(initialFilters);
  const { user } = useSelector((state) => state.auth);
  const [productList, setProductList] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { category, subCategory } = state || { category: "", subCategory: "" };

  useEffect(() => {
    getProducts();
  }, [filters]);

  useEffect(() => {
    if (category && subCategory) {
      setFilters((p) => {
        if (p.subCategory.includes(subCategory)) return p;
        return {
          ...p,
          category: [...p.category, category],
          subCategory: [...p.subCategory, subCategory],
        };
      });
    }
  }, []);

  async function getProducts() {
    let cQueries = undefined;
    let scQueries = undefined;
    let rQueries = undefined;
    let raQueries = undefined;
    let allQueries = [];

    setLoading(true);

    if (filters?.category.length > 0) {
      cQueries = or(
        ...filters?.category.map((c) => {
          return where("category", "==", c);
        })
      );
      allQueries.push(cQueries);
    }

    if (filters?.subCategory.length > 0) {
      scQueries = or(
        ...filters?.subCategory.map((sc) => {
          return where("subCategory", "==", sc);
        })
      );
      allQueries.push(scQueries);
    }

    if (filters?.rating.length > 0) {
      rQueries = or(
        ...filters?.rating.map((r) => {
          return where("rating", "==", r);
        })
      );
      allQueries.push(rQueries);
    }

    if (filters?.price[1] !== 0 || filters?.price[0] !== 0) {
      raQueries = or(
        where("price.value", ">=", filters?.price[0]),
        where("price.value", "<=", filters?.price[1])
      );
      allQueries.push(raQueries);
    }

    if (allQueries.length > 1) {
      allQueries = [and(...allQueries)];
    }

    const productQuery = query(collection(db, "products"), ...allQueries);

    try {
      const { docs } = await getDocs(productQuery);
      const products = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const currentProduct = useMemo(() => {
    const indexofLastProduct = currentPage * ProductPerPage;
    const indexofFirstProduct = indexofLastProduct - ProductPerPage;
    return productList.slice(indexofFirstProduct, indexofLastProduct);
  }, [currentPage, productList]);

  const handleFilter = (name, value) => {
    let newValues = [];
    if (filters[name]?.includes(value)) {
      newValues = filters[name]?.filter((val) => val !== value);
    } else {
      newValues = [...filters[name], value];
    }
    setFilters((p) => ({ ...p, [name]: newValues }));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center justify-between lg:px-[55px] md:px-[55px] px-4 lg:py-[40px] md:py-[40px] py-[20px]">
        <Link to="/">
          <div className="font-poppins font-semibold lg:text-[32px] md:text-[32px] text-[18px] lg:leading-[44px] md:leading-[44px] leading-[20px]">
            Fuelcab
          </div>
        </Link>
        <span className="md:block hidden">
          <SearchBar setFilters={setFilters} />
        </span>

        <Link to="dashboard/setting" className="flex items-center">
          <PersonOutline fontSize="large" />
          {user && (
            <p className="font-bold md:text-xl text-md ml-2">{user.fullName}</p>
          )}
        </Link>
      </div>
      <span className="md:hidden flex justify-center mb-2">
        <SearchBar setFilters={setFilters} />
      </span>
      <div className="flex flex-row w-full h-[55px] bg-[#F9F9F9] lg:px-[40px] md:px-[40px] px-[30px] lg:gap-[40px] md:gap-[40px] lg:justify-normal md:justify-normal justify-between items-center relative">
        {FuelTypeList.map((fuelType, index) => (
          <DropDownMenu item={fuelType} key={index} setFilters={setFilters} />
        ))}
      </div>
      {subCategory && (
        <div className="py-[8px] lg:px-[45px] md:px-[45px] px-5 h-[64px] flex items-center justify-between">
          <strong className="font-poppins text-2xl font-semibold leading-[48px]">
            Results
          </strong>

          <div className=" flex font-sans text-[#A9A9A9] text-xs">
            <p className="bg-[#F9F9F9] font-sans text-[#558D29] items-center mr-2 border-2 rounded-lg w-[30px] flex justify-center">
              {productList.length}
            </p>
            Products
          </div>
        </div>
      )}
      {Object.entries(filters).some(
        ([key, val]) => val.length > 0 && key !== "price"
      ) && (
        <div className="lg:flex hidden flex-row px-[45px] gap-[12px] items-center mt-4">
          <div className="font-poppins text-[#A9A9A9] text-xs font-semibold">
            Applied Filtres :
          </div>

          {Object.entries(filters).map(([name, values]) => {
            if (!values || values.length === 0) return;
            return (
              values &&
              name !== "price" &&
              values.map((txt) => (
                <div
                  onClick={() => handleFilter(name, txt)}
                  className="py-1 font-poppins cursor-pointer text-[#558D29] text-xs font-semibold rounded-xl bg-[#F4F8EC] gap-[4px] px-[8px] flex items-center "
                >
                  {txt}
                  <Close sx={{ fontSize: "16px" }} />
                </div>
              ))
            );
          })}
        </div>
      )}

      {!!productList.length && currentProduct.length > 4 && (
        <div className="lg:px-[45px] md:px-[45px] px-[5px] lg:py-[32px] md:py-[32px] py-1 lg:mt-[16px] md:mt-[16px] -mb-[20px]">
          <Pagination
            color="standard"
            defaultPage={1}
            count={Math.ceil(productList.length / ProductPerPage)}
            size="large"
            page={currentPage}
            onChange={(value) => setcurrentPage(value)}
          />
        </div>
      )}

      <div className="flex flex-row lg:px-[45px] md:px-[45px] px-2 py-[64px] gap-[64px]">
        <div className="lg:flex md:flex hidden flex-col w-[270px] gap-[48px]">
          <div className="flex flex-col w-full gap-[16px]">
            <div className="font-poppins font-semibold text-[18px] text-[#151515] leading-[27px]">
              Categories
            </div>
            <div className="flex flex-col gap-[12px]">
              {Object.keys(SUB_CATEGORY).map((name, index) => (
                <div className="flex gap-2">
                  <input
                    className="w-[20px] h-[20px] accent-[#558D29]"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                    checked={filters?.category.includes(name)}
                    onClick={() => handleFilter("category", name)}
                  />
                  <button
                    key={index}
                    className="flex justify-between w-full h-[19px] font-sans capitalize text-sm text-[#151515]"
                  >
                    {name}
                    {/* <p className="text-[#5932EA] font-semibold text-xs font-poppins px-[8px]   rounded-xl p-1 bg-[#F4F8EC]">
                      {0}
                    </p> */}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {!!filters?.category.length && (
            <div className="flex flex-col w-full gap-[16px]">
              <div className="font-poppins font-semibold text-[18px] text-[#151515] leading-[27px]">
                Sub Category
              </div>
              <div className="flex flex-col gap-[12px]">
                {filters?.category.map((category) => {
                  return SUB_CATEGORY[category].map(({ title }, index) => (
                    <div
                      key={index}
                      className="flex items-center h-[24px] gap-[8px]"
                    >
                      <input
                        className="w-[20px] h-[20px] accent-[#558D29]"
                        type="checkbox"
                        defaultValue
                        checked={filters.subCategory.includes(title)}
                        id="flexCheckDefault"
                        onClick={() => handleFilter("subCategory", title)}
                      />
                      <label
                        className=" flex font-sans text-sm text-[#151515] items-center"
                        htmlFor="flexCheckDefault"
                      >
                        {title}
                      </label>
                    </div>
                  ));
                })}
              </div>
            </div>
          )}
          {/* <div className="flex flex-col w-full gap-[16px]">
            <div className="font-poppins font-semibold text-[18px] text-[#151515] leading-[27px]">
              Rating
            </div>
            <div className="flex flex-col gap-[12px]">
              {Rating.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center h-[24px] gap-[8px]"
                >
                  <input
                    className="w-[20px] h-[20px] accent-[#558D29]"
                    type="checkbox"
                    defaultValue
                    checked={filters?.rating.includes(index + 1)}
                    id="flexCheckDefault"
                    onClick={() => handleFilter("rating", index + 1)}
                  />
                  <div className="flex gap-[2px]">
                    <RatingStar star={item.star} />
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
        <div className="flex flex-col gap-[32px] w-full">
          {currentProduct.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
          {!currentProduct?.length && !loading && (
            <div className="w-full text-center">
              <p className="font-bold text-xl">No product found</p>
            </div>
          )}
          {loading && (
            <div className="w-full text-center">
              <h2 className="font-bold text-xl">Getting your products</h2>
              <p className="text-sm">Hang tide products will display soon</p>
            </div>
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

const DropDownMenu = ({ item, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavigation = (category, subCategory) => {
    setFilters((p) => ({
      ...p,
      category: [`${category}`.toLocaleLowerCase()],
      subCategory: [subCategory],
    }));
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
                onClick={() => {
                  setIsOpen(false);
                  handleNavigation(item.name, listItem);
                }}
                key={index}
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
export default ProductsPage;

const SearchBar = ({ setFilters }) => {
  const [searchAutocomplete, setSearchAutocomplete] = useState([]);
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

    setFilters((p) => ({
      ...p,
      category: [category],
      subCategory: [subCategory],
    }));
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
