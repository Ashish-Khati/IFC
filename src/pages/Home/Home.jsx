import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PriceCard from "../../components/PriceCard";
import Footer from "../../components/Footer";
import { FiSearch } from "react-icons/fi";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch } from "react-redux";
import {
  openAuthModal,
  openFeedbackModal,
  openProductFormModal,
  openProfileChangeModal,
} from "../../redux/store/modalSlice";
import Quotation from "../../components/Quotation";
import Menu from "../../components/UIElements/Menu/Menu";
import FeedbackForm from "../../components/Feedback";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { getTrendingProducts } from "../../redux/api";
import { islocationEqual } from "../../utils/location";
import { getReverseGeo } from "../../api/location";
import { setUserLocation } from "../../redux/store/locationSlice";
import { getFuelPrice } from "../../api/fuelPrice";
import VerProductCard from "../../components/VerProductCard";
import { MenuOpen } from "@mui/icons-material";
import { fetchProductsByAdmin } from "../../redux/store/productSlice";
import Carousel from "react-material-ui-carousel";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { userLocation } = useSelector((state) => state.location);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [fuelType, setFuelType] = useState("Petrol");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    getTrendingProducts().then((products) => {
      setTrendingProducts(products);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchProductsByAdmin());
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        if (
          !userLocation.address ||
          !islocationEqual({ latitude, longitude }, userLocation)
        ) {
          const userLoc = await getReverseGeo(latitude, longitude);
          const fuelsPrice = await getFuelPrice(
            `${userLoc.address?.village || ""}, ${userLoc.address?.county}`
          );
          dispatch(
            setUserLocation({
              latitude,
              longitude,
              address: userLoc.address,
              fuelsPrice,
            })
          );
        }
      });
    }
  }, []);

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setLocation({
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    }
  };

  const handleBookDelivery = () => {
    navigate("/booking", {
      state: { location, date, fuelType: fuelType.toLocaleLowerCase() },
    });
  };

  function handleLoginClick() {
    dispatch(openAuthModal());
  }

  const slideRight = () => {
    let slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const DropDownList = [
    {
      name: "For Buyers ▾",
      list: [
        {
          title: "Post Your Requirement",
          onClick: () => {
            navigate("#product-requirement-form");
          },
        },
        {
          title: "Search Supplier/Products",
          onClick: () => {
            navigate("products");
          },
        },
        { title: "Book FCI Logistics", onClick: () => {}, commingSoon: true },
        { title: "Pay with FuelCab", onClick: () => {}, commingSoon: true },
      ],
    },
    {
      name: "For Sellers ▾",
      list: [
        {
          title: "Sell on FuelCab",
          onClick: () => {
            if (!currentUser) {
              handleLoginClick();
            } else if (currentUser.userType === 0) {
              dispatch(openProfileChangeModal(1));
            } else {
              dispatch(openProductFormModal());
            }
          },
        },
        {
          title: "Search Verified Leads",
          onClick: () => {
            navigate("products");
          },
        },
        {
          title: "My Membership",
          onClick: () => {
            if (!currentUser) {
              handleLoginClick();
            } else {
              navigate("dashboard/setting");
            }
          },
        },
        { title: "Get Freight Quotes", onClick: () => {}, commingSoon: true },
        { title: "Ship with FuelCab", onClick: () => {}, commingSoon: true },
      ],
    },
    {
      name: "Contact ▾",
      list: [
        {
          title: "Call Us: +91-9988909052 ",
          onClick: () => {
            document.location.href = "tel:9988909052";
          },
        },
        {
          title: "Feedback",
          onClick: () => {
            dispatch(openFeedbackModal());
          },
        },
      ],
    },
    {
      name: "Company ▾",
      list: [
        {
          title: "Who We Are",
          onClick: () => {
            navigate("who-are-we");
          },
        },
        { title: "Blogs", onClick: () => {}, commingSoon: true },
        { title: "Events", onClick: () => {}, commingSoon: true },
        { title: "Media Press", onClick: () => {}, commingSoon: true },
        {
          title: "Our Team",
          onClick: () => {
            navigate("team");
          },
        },
        {
          title: "Our Testimonial",
          onClick: () => {
            navigate("#testimonial");
          },
        },
        {
          title: "Franchise",
          onClick: () => {},
          commingSoon: true,
        },
        {
          title: "Faq’s",
          onClick: () => {
            navigate("faq");
          },
        },
      ],
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  return (
    <div className="flex flex-col w-full bg-[#F2FAEB] text-black font-poppins">
      <div className="flex w-full h-[91px] justify-between items-center lg:py-[36px] md:py-[36px] py-[20px] lg:px-20 md:px-2 px-4">
        <div
          className={`lg:hidden absolute top-16 bg-white p-2 rounded-lg left-2 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-start justify-start text-[#4A7B24]">
            <Link
              to="/booking"
              className="flex items-center font-inter font-semibold text-[15px] tracking-[-0.03em] h-[41px] hover:border-b-2 border-[#4A7B24]"
            >
              HSD Delivery
            </Link>
            {DropDownList?.map((list, index) => (
              <Menu key={index} item={list} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="lg:hidden block">
            <button
              type="button"
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 pl-0 rounded-md text-[#4A7B24]"
            >
              <MenuOpen fontSize="large"></MenuOpen>
            </button>
          </div>
          <h1 className="relative">
            <Link className="lg:text-[22px] text-[17px] font-extrabold font-inter text-black">
              Fuelcab
            </Link>
            <span className="absolute text-sm">Beta</span>
          </h1>
        </div>
        <div className="lg:flex hidden gap-[18px] items-center text-[#4A7B24]">
          <div className="flex flex-col relative justify-center">
            <Link
              to="/booking"
              className="flex items-center font-inter font-semibold text-[15px] tracking-[-0.03em] h-[41px] hover:border-b-2 border-[#4A7B24]"
            >
              HSD Delivery
            </Link>
          </div>
          {DropDownList?.map((list, index) => (
            <Menu key={index} item={list} />
          ))}
        </div>
        {currentUser ? (
          <div className="flex items-center gap-[20px]">
            <p className="md:block hidden font-inter font-semibold text-[15px] tracking-[-0.02em] ">
              Hi, {currentUser.fullName}
            </p>
            <Link to="/dashboard">
              <button className="bg-[#7AC93B] w-[120px] text-white h-[41px] rounded-3xl justify-center flex items-center font-inter font-semibold text-[15px] tracking-[-0.03em] hover:scale-105 duration-200">
                Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <Link onClick={handleLoginClick}>
            <button className="bg-[#7AC93B] text-white h-[41px] rounded-3xl px-[24px] flex items-center justify-center font-inter font-semibold text-[15px] tracking-[-0.03em] hover:scale-105 duration-300">
              Login
            </button>
          </Link>
        )}
      </div>
      <div className="md:flex block md:mt-auto mt-10 flex-col justify-center items-center h-[85vh]">
        <div className="w-full flex flex-col items-center justify-center gap-[38px] text-[#294B0E] mx-auto lg:px-0 md:px-0 px-5">
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center font-inter font-semibold lg:text-[53px] md:text-[53px] text-[35px] md:leading-[58px] leading-[48px] tracking-[-0.03em]">
              Fuelcab
            </div>
            <div className="flex justify-center items-center font-inter font-semibold lg:text-[53px] md:text-[53px] text-[35px] md:leading-[58px] leading-[48px] tracking-[-0.03em] ">
              Get your Fuel Today
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center lg:leading-[32px] md:leading-[32px] leading-[32px] text-center w-full">
            <div className="flex justify-center items-center font-inter lg:text-[20px] md:text-[20px] text-[18px] tracking-[-0.03em] text-opacity-80">
              Preseting you doorstep fuel delivery, available 24X7. We provide
              fuel for your personal & industrial
            </div>
            <div className="flex justify-center items-centerfont-inter lg:text-[20px] md:text-[20px] text-[16px] tracking-[-0.03em] text-opacity-80">
              equipments safely at your door, so you can focus on your business.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap max-w-[834px] h-[65px] mt-16 items-center rounded-[50px] lg:bg-white md:bg-white bg-transparent gap-[5px] mx-auto lg:px-1 md:px-1 px-5">
          <div className="flex flex-col lg:w-[322px] md:w-[322px] bg-white rounded-[50px] w-full h-full py-[12px] pl-[30px] pr-[30px] justify-center gap-[2px]">
            <span className="font-roboto font-bold text-sm text-black">
              Location
            </span>
            <StandaloneSearchBox
              style={{ border: "10px" }}
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type="text"
                className="font-roboto text-sm text-[#717171] outline-none w-full"
                placeholder="Where you want the delivery?"
              />
            </StandaloneSearchBox>
          </div>
          <div className="lg:block md:block hidden  h-[50px] border-[0.5px] border-[#d1cdcd]">
            {""}
          </div>
          <div className="lg:w-[221px] md:w-[221px] rounded-[50px] w-full flex flex-col bg-white h-full py-[12px] pl-[30px] pr-[30px] justify-center gap-[4px]">
            <span className="font-roboto font-bold text-sm text-black pl-[3px]">
              Date
            </span>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="lg:block md:block hidden h-[50px] border-[0.5px] border-[#d1cdcd]">
            {""}
          </div>
          <div className="flex flex-col lg:w-[205px] md:w-[205px]  rounded-[50px] w-full h-full py-[15px] pl-[30px] pr-[30px] justify-center gap-[2px] bg-white">
            <span className="font-roboto font-bold text-sm text-black">
              Fuel Type
            </span>

            <div className="font-roboto text-sm text-[#717171] outline-none cursor-pointer">
              <SelectMenu fuel={fuelType} setFuel={setFuelType} />
            </div>
          </div>
          <button
            onClick={handleBookDelivery}
            className="mx-auto bg-[#7AC93B] lg:w-[47px] md:w-[47px] w-[50%] gap-3 h-[47px] rounded-full flex items-center justify-center hover:rotate-90 duration-300"
          >
            <h1 className="lg:hidden md:hidden block text-white text-xl font-semibold">
              Search
            </h1>
            <FiSearch className="text-white w-[25px] h-[25px]" />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:px-[135px] md:px-[135px] px-5 pb-[70px] mt-24 gap-[55px]">
        <div className="flex flex-col gap-[19px] text-[#294B0E]">
          <span className="text-center flex items-center justify-center font-inter font-semibold lg:text-[48px] md:text-[48px] text-[1.75rem] lg:leading-[58px] md:leading-[58px] leading-[40px] tracking-[-0.03em]">
            Which category you are looking for ?
          </span>
          <div className="flex flex-col">
            <div className="text-center mx-4 flex justify-center font-inter lg:text-[20px] md:text-[20px] text-[16px] lg:leading-[32px] md:leading-[32px] leading-[25px] tracking-[-0.03em] text-opacity-80">
              Explore a Vast Array of Categories to Fulfill Your Requirements
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] ">
          <div className="flex lg:flex-nowrap flex-wrap gap-[30px]  justify-center">
            <Link
              to="./subcategory?category=gas"
              className="flex max-w-[540px] gap-2  bg-[#D0FAFA] rounded-2xl items-center justify-between py-10 md:px-8 px-4 overflow-hidden hover:scale-105 transition-all duration-300 "
            >
              <div className="flex flex-col w-[60%] min-h-[149px] gap-[10px] justify-center">
                <h3 className="font-inter font-semibold text-[24px] leading-[29px] text-black">
                  Gas Fuels
                </h3>
                <p className="font-inter text-[16px] leading-[26px] text-black text-opacity-80">
                  It is widely utilized for heating, cooking, and powering
                  various appliances.
                </p>
                <div className="flex mt-[2px]">
                  <span className="font-inter font-semibold text-[16px] text-black">
                    Select {"->"}
                  </span>
                </div>
              </div>
              <div className="flex justify-center w-[40%]">
                <img className="" src="images/gas.png" alt="" />
              </div>
            </Link>
            <Link
              to="./subcategory?category=liquid"
              className="flex max-w-[540px] gap-2 bg-[#E8D2FC] rounded-2xl items-center justify-between py-10 md:px-8 px-4 overflow-hidden hover:scale-105 transition-all duration-300 "
            >
              <div className="flex flex-col w-[60%] min-h-[149px] gap-[10px] justify-center">
                <h3 className="font-inter font-semibold text-[24px] leading-[29px] text-black">
                  Liquid Fuels
                </h3>
                <p className="font-inter text-[16px] leading-[26px] text-black text-opacity-80">
                  Derived from petroleum, utilized for transportation, heating,
                  etc.
                </p>
                <div className="flex mt-[2px]">
                  <span className="font-inter font-semibold text-[16px] text-black">
                    Select {"->"}
                  </span>
                </div>
              </div>
              <div className="flex justify-center w-[40%]">
                <img className="" src="images/liquid.png" alt="" />
              </div>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="./subcategory?category=solid"
              className="flex max-w-[540px] gap-2 bg-[#FDD6D6] rounded-2xl items-center justify-between py-10 md:px-8 px-4 overflow-hidden hover:scale-105 transition-all duration-300 "
            >
              <div className="flex flex-col w-[60%] min-h-[149px] gap-[10px] justify-center">
                <h3 className="font-inter font-semibold text-[24px] leading-[29px] text-black">
                  Solid Fuels
                </h3>
                <p className="font-inter text-[16px] leading-[26px] text-black text-opacity-80">
                  Used in residential heating and traditional cooking methods.
                </p>
                <div className="flex mt-[2px]">
                  <span className="font-inter font-semibold text-[16px] text-black">
                    Select {"->"}
                  </span>
                </div>
              </div>
              <div className="flex justify-center w-[40%]">
                <img className="" src="images/solid.png" alt="solid" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="flex text-[#294B0E] flex-col w-full gap-[27px] my-[27px] lg:px-[60px] md:px-[60px] px-5">
        <div className="flex justify-between items-center mr-[28px] ">
          <span className="font-inter font-semibold lg:text-[48px] md:text-[48px] text-[1.75rem] lg:leading-[58px] md:leading-[58px] leading-[40px] tracking-[-0.03em]">
            Trending Products
          </span>
          <div className="flex gap-[20px] items-center">
            <Link
              to="products"
              className="font-semibold md:text-[20px] text-[18px] leading-[28px]"
            >
              View All
            </Link>
          </div>
        </div>

        <div
          id="slider1"
          className="flex flex-row flex-wrap w-full gap-[65px] scroll-smooth"
        >
          {(width < 1024
            ? width < 840
              ? trendingProducts?.slice(0, 2)
              : trendingProducts?.slice(0, 3)
            : trendingProducts
          )?.map((item, index) => (
            <div>
              <VerProductCard key={index} item={item} />
            </div>
          ))}
        </div>
      </div> */}
      <div className="flex flex-col lg:py-[65px] md:py-[65px] py-[30px] lg:px-[55px] md:px-[55px] px-5 gap-[18px]">
        <div className="text-[#294B0E] font-inter font-semibold lg:text-[48px] md:text-[48px] text-[1.75rem] lg:leading-[58px] md:leading-[58px] leading-[40px] tracking-[-0.03em]">
          Explore more
        </div>
        <Carousel>
          {[1, 2, 3]?.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-[20px] relative overflow-hidden cursor-pointer"
            >
              <img
                src={`/Images/ad${item}.png`}
                className="w-full lg:h-[394px] md:h-[394px] h-[160px] relative"
                alt="banner"
              />
            </div>
          ))}
        </Carousel>
      </div>
      {/* <PriceCard fuelsPrice={userLocation.fuelsPrice} /> */}
      <Quotation />
    
      <div
        className="flex flex-col w-full items-center gap-[18px] text-[#294B0E] my-16 px-5"
        id="testimonial"
      >
        <div className="text-center font-inter font-semibold lg:text-[48px] md:text-[48px] text-[1.75rem] lg:leading-[58px] md:leading-[58px] leading-[38px]">
          What our customers are saying.
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center font-inter lg:text-[20px] md:text-[20px] text-[16px] lg:leading-[32px] md:leading-[32px] leading-[28px] tracking-[-0.03em] text-opacity-80">
            Uncover the Experiences and Testimonials Shared by Our Valued
            Customers!
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-[30px] mt-6">
          <div className="flex flex-col lg:w-[370px] md:w-[370px] w-full h-[536px] relative hover:scale-105 transition-all duration-300 ">
            <img
              src="/Images/1.png"
              className="rounded-t-3xl h-[240px] relative"
            />
            <div className="w-full h-[315px] flex flex-col py-[45px] px-[32px] bg-[#373B29] rounded-[20px] gap-[8px] absolute top-[221px]">
              <span className="font-inter text-[20px] leading-[32px] tracking-[-0.03em] text-white">
                Stephanie
              </span>
              <p className="font-inter text-[16px] leading-[26px] text-white text-opacity-80">
                The instructor’s clear and consistent focus on the four basic
                principles of graphic design (contrast, repetition, alignment,
                and proximity) kept the course very focused and efficient. The
                reading material was clear and well presented.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:w-[370px] md:w-[370px] w-full h-[536px] relative hover:scale-105 transition-all duration-300 ">
            <img
              src="/Images/2.png"
              className="rounded-t-3xl h-[240px] relative"
            />
            <div className="w-full h-[315px] flex flex-col py-[45px] px-[32px] bg-[#373B29] rounded-[20px] gap-[8px] absolute top-[221px]">
              <span className="font-inter text-[20px] leading-[32px] tracking-[-0.03em] text-white">
                Marcela
              </span>
              <p className="font-inter text-[16px] leading-[26px] text-white text-opacity-80">
                I received my certificate, and I would like to thank you for
                your support. Your course was challenging, but you were always
                there supporting me and ready to help. I enjoyed your class
                tremendously. I look forward to taking another class with you.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:w-[370px] md:w-[370px] w-full h-[536px] relative hover:scale-105 transition-all duration-300">
            <img
              src="/Images/3.png"
              className="rounded-t-3xl h-[240px] relative"
            />
            <div className="w-full h-[315px] flex flex-col py-[45px] px-[32px] bg-[#373B29] rounded-[20px] gap-[8px] absolute top-[221px]">
              <span className="font-inter text-[20px] leading-[32px] tracking-[-0.03em] text-white">
                Mario
              </span>
              <p className="font-inter text-[16px] leading-[26px] text-white text-opacity-80">
                Doug adalah instruktur yang sangat baik yang benar-benar tahu
                barang-barangnya. Dia jelas antusias dengan topik tersebut dan
                itu membuat kursus ini sangat menyenangkan. Bersedia berbagi
                ilmunya meskipun saya memiliki pertanyaan yang melampaui materi
                pelajaran.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FeedbackForm />
      <Footer />
    </div>
  );
};

const DatePicker = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <input
        value={format(date, "dd/MM/yyyy")}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-roboto text-sm text-[#717171] outline-none cursor-pointer"
        placeholder="22/01/2023"
      />
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Calendar
            date={date}
            onChange={(d) => setDate(d)}
            className="absolute mt-[12px] ml-[-80px] rounded-xl"
          />
        </div>
      )}
    </>
  );
};

const SelectMenu = ({ fuel, setFuel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const List = ["Diesel", "Gas", "Petrol"];

  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)}>{fuel} </button>
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute w-[200px] mt-[15px]  bg-white border border-gray-300 px-[8px] py-[10px] rounded-xl "
        >
          {List?.map((item, index) => (
            <button
              key={index}
              onClick={(e) => setFuel(e.target.value)}
              value={item}
              className="font-sg text-[14px] leading-[28px] h-[38px] p-[8px] text-[#111B29]  flex items-center justify-start hover:bg-[#e1e1e6] rounded-lg w-full"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
