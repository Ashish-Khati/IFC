import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdLocationOn } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { db } from "../firebase";
import validator from "validator";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  where,
  query,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    Address: "",
    password: "",
    confPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      setUser((user) => {
        return {
          ...user,
          name: currentUser.name,
          email: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          Address: currentUser.Address,
        };
      });
    }
  }, [currentUser]);

  const handleProfileSubmit = (e) => {
    if (user.name == "" || user.email == 0) {
      alert("Fill the complete form");
    } else {
      console.log(user.name, user.email);
    }
  };

  const handleDetailsSubmit = (e) => {
    if (user.phoneNumber == 0 || user.address == 0) {
      alert("Fill the complete form");
    } else if (user.age > 120 || user.phoneNumber.toString.length != 10) {
      alert(" Contact number");
    } else {
      console.log("%d %d %s", user.phoneNumber, user.Address);
    }
  };

  const handlePasswordSubmit = (e) => {
    if (user.password == 0 && user.confPassword == 0) {
      alert("Fill the complete form");
    } else if (user.password != user.confPassword) {
      alert("Password not matched!");
    } else {
      console.log("%s", user.password);
    }
  };

  const clearForm = () => {
    setUser({
      name: "",
      email: "",
      age: "",
      phoneNumber: "",
      Address: "",
      password: "",
      confPassword: "",
    });
  };

  const [bg, changeBGColor] = React.useState(1);
  const [bg2, changeBGColor2] = React.useState(1);

  const [iSAddressTabOpen, setISAddressTabOpen] = useState(false);
  const [address, setAddress] = useState([]);

  const [addressToAdd, setAddressToAdd] = useState({
    userId: "",
    addressLine: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNO: "",
  });

  const getAddresses = async () => {
    const addressCollectionRef = query(
      collection(db, "addresses"),
      where("userId", "==", currentUser.uid)
    );
    try {
      const data = await getDocs(addressCollectionRef);
      const userAllAddress = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAddress(userAllAddress);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const handleOnChangeAddressToAdd = (e) => {
    setAddressToAdd({
      ...addressToAdd,
      [e.target.name]: e.target.value,
    });
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (v) => {
    const errors = {};

    if (!v.addressLine) {
      errors.addressLine = "Required *";
    }
    if (!v.city) {
      errors.city = "Required *";
    }
    if (!v.postalCode) {
      errors.postalCode = "Required *";
    }
    if (!v.country) {
      errors.country = "Required *";
    }
    if (!v.phoneNO) {
      errors.phoneNO = "Valid Phone Number Required *";
    }

    return errors;
  };

  const createAddress = async (e) => {
    const addressesCollectionRef = collection(db, "addresses");
    try {
      await addDoc(addressesCollectionRef, addressToAdd);
      setISAddressTabOpen(false);
      setAddressToAdd({
        userId: "",
        addressLine: "",
        city: "",
        postalCode: "",
        country: "",
        phoneNO: "",
      });
    } catch (err) {
      console.log(err);
    }
    getAddresses();
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };
  const handleAddAddress = (e) => {
    e.preventDefault();
    addressToAdd.userId = currentUser.uid;
    const validNumber = validatePhoneNumber(addressToAdd.phoneNO);
    if (!validNumber) {
      addressToAdd.phoneNO = "";
    }
    setFormErrors(validate(addressToAdd));
    if (Object.keys(formErrors).length === 0 && validNumber) {
      setFormErrors(validate(addressToAdd));
      setIsSubmit(true);
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      createAddress();
    }
  }, [formErrors]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-full overflow-hidden overflow-y-scroll scrollbar h-screen bg-[#e0e5e8]">
      <div className="px-10 lg:flex md:flex hidden w-full justify-between items-center bg-white mb-4 py-3 border-b-2  shadow-lg">
          <h1 className="text-4xl font-poppins font-semibold text-[#8A8A8A] pl-8">
            Settings
          </h1>
          <div className="flex flex-row gap-4 justify-center items-center">
            <div className="text-[#7AC93B]">
              <NotificationsIcon
                fontSize="large"
              ></NotificationsIcon>
            </div>
            <Avatar alt="Radhakrishn" src="/static/images/avatar/3.jpg" />
            <p className="text-[#8A8A8A] text-xl">{currentUser.name}</p>
          </div>
        </div>
      <div className="min-h-[80%] flex flex-col items-center md:flex-row md:items-start">
        <Tabs className="overflow-hidden px-[62px] py-4 pt-8">
          <TabList className=" pb-[72px] gap-4  flex flex-wrap justify-center md:justify-start md:flex md:gap-12 text-lg text-slate-500  ">
            <Tab
              className="cursor-pointer font-sans font-semibold select-none underline"
              onClick={() => changeBGColor2(1)}
              style={{
                color: bg2 === 1 ? "#232360" : "#6a7a81",
                textDecorationColor: bg2 === 1 ? "#7AC93B" : "#e0e5e8",
                textDecorationThickness: 4,
              }}
            >
              Profile
            </Tab>
            <Tab
              className="cursor-pointer font-sans font-semibold select-none underline"
              onClick={() => changeBGColor2(2)}
              style={{
                color: bg2 === 2 ? "#232360" : "#6a7a81",
                textDecorationColor: bg2 === 2 ? "#7AC93B" : "#e0e5e8",
                textDecorationThickness: 4,
              }}
            >
              Address
            </Tab>
            <Tab
              className="cursor-pointer font-sans font-semibold select-none underline"
              onClick={() => changeBGColor2(3)}
              style={{
                color: bg2 === 3 ? "#232360" : "#6a7a81",
                textDecorationColor: bg2 === 3 ? "#7AC93B" : "#e0e5e8",
                textDecorationThickness: 4,
              }}
            >
              Password
            </Tab>
          </TabList>

          <TabPanel className="text-[#2a254b] " required>
            <div>
              <form
                id="form1"
                onSubmit={(e) => {
                  handleProfileSubmit(e);
                }}
                className="flex flex-col gap-5 md:flex-row"
              >
                <div className="md:flex gap-3 ">
                  <div className="flex-col gap-2 ">
                    <label className="text-[#232360] font-sans font-semibold ">
                      Name
                    </label>
                    <input
                      type="text"
                      className="bg-transparent font-sans pl-[5px] text-[#768396] border-2  border-slate-300  rounded-md  w-96 flex resize-none h-12  focus:outline-0  "
                      value={user.name}
                      required
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex-col ">
                  <label className="text-[#232360] font-sans font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="bg-transparent font-sans  text-[#768396] border-2  border-slate-300   rounded-md p-2  flex resize-none h-12 focus:outline-0 w-96"
                    required
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <br />
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <form
                id="form2"
                onSubmit={(e) => {
                  handleDetailsSubmit(e);
                }}
                className="flex flex-col gap-5 md:flex-row"
              >
                <div className="md:flex  gap-3 ">
                  <div className="flex-row">
                    <label className="text-[#232360] font-sans font-semibold  ">
                      Contact Number
                    </label>
                    <input
                      // type="tel"
                      className="bg-transparent  text-[#768396] border-2  border-slate-300   rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0"
                      value={user.phoneNumber}
                      required
                      onChange={(e) =>
                        setUser({ ...user, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[20px] lg:pt-0">
                  <div className="flex gap-[10px]">
                    <div className="flex border-2 border-slate-300 rounded-md w-[300px] items-center pl-[20px] py-[8px] gap-[15px]">
                      <MdLocationOn size="40px" className="text-[#2945FF]" />
                      <div className="flex flex-col">
                        <div className="font-poppins font-medium text-lg text-[#232360] flex justify-start">
                          {" "}
                          Your Address
                        </div>
                        <div className="text-[#768396] text-[14px] flex justify-start items-start">
                          Add or Edit Address to change delivery Location
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setISAddressTabOpen((prev) => !prev)}
                      className="border-2 border-slate-300 rounded-md h-[100px] w-[100px]  hover:bg-slate-300 flex items-center justify-center"
                    >
                      <GrAdd size="20px" className="text-[#2945FF]" />
                    </button>
                  </div>
                  {iSAddressTabOpen && (
                    <div className="flex flex-col gap-[8px] ml-[10px] justify-center">
                      <p className="text-[#ff0000] text-xs">
                        {formErrors.addressLine}
                      </p>
                      <input
                        type="text"
                        placeholder="AddressLine"
                        name="addressLine"
                        value={addressToAdd.addressLine}
                        className="bg-transparent  text-[#768396] border-2  border-slate-300  rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0 "
                        required
                        onChange={handleOnChangeAddressToAdd}
                      />
                      <p className="text-[#ff0000] text-xs">
                        {formErrors.city}
                      </p>
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={addressToAdd.city}
                        className="bg-transparent  text-[#768396] border-2  border-slate-300  rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0 "
                        required
                        onChange={handleOnChangeAddressToAdd}
                      />
                      <p className="text-[#ff0000] text-xs">
                        {formErrors.postalCode}
                      </p>
                      <input
                        type="text"
                        placeholder="PostalCode"
                        name="postalCode"
                        value={addressToAdd.postalCode}
                        className="bg-transparent  text-[#768396] border-2  border-slate-300  rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0 "
                        required
                        onChange={handleOnChangeAddressToAdd}
                      />
                      <p className="text-[#ff0000] text-xs">
                        {formErrors.country}
                      </p>
                      <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={addressToAdd.country}
                        className="bg-transparent  text-[#768396] border-2  border-slate-300  rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0 "
                        required
                        onChange={handleOnChangeAddressToAdd}
                      />
                      <p className="text-[#ff0000] text-xs">
                        {formErrors.phoneNO}
                      </p>
                      <input
                        type="text"
                        placeholder="Number"
                        name="phoneNO"
                        value={addressToAdd.phoneNO}
                        className="bg-transparent  text-[#768396] border-2  border-slate-300  rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0 "
                        required
                        onChange={handleOnChangeAddressToAdd}
                      />
                      <button
                        onClick={handleAddAddress}
                        className="w-[100px] bg-[#2945FF] text-white rounded-lg h-[40px]"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  <div className="flex flex-wrap w-full gap-[20px]">
                    {address.map((singleAddress, index) => (
                      <UserDeatils
                        singleAddress={singleAddress}
                        key={index}
                        getAddresses={getAddresses}
                      />
                    ))}
                  </div>
                </div>
                <br />
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <form
                id="form3"
                onSubmit={(e) => {
                  handlePasswordSubmit(e);
                }}
              >
                <div className="md:flex  gap-3 ">
                  <div className="flex-col gap-2 px-1 ">
                    <label className="text-[#232360] font-sans font-semibold  ">
                      Password
                    </label>
                    <input
                      type="password"
                      value={user.password}
                      className="bg-transparent  text-slate-500 border-2  border-slate-300   rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0 "
                      required
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex-col gap-2 px-1 ">
                    <label className="text-[#232360] font-sans font-semibold  ">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={user.confPassword}
                      className="bg-transparent  text-slate-500 border-2  border-slate-300   rounded-md p-2 w-96 flex resize-none h-12 focus:outline-0 "
                      required
                      onChange={(e) =>
                        setUser({
                          ...user,
                          confPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <br />
              </form>
            </div>
          </TabPanel>
        </Tabs>
        <div className="py-6 ml-0 mt-60 md:mt-0 md:ml-40">
          <button
            className="bg-transparent hover:bg-[#7AC93B]  font-sans font-semibold
         hover:text-white border-slate-300 border hover:border-transparent  rounded-md p-2 mr-3 "
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-transparent hover:bg-[#7AC93B]  font-sans font-semibold
         hover:text-white border-slate-300 border hover:border-transparent  rounded-md p-2 mr-3 "
            onClick={clearForm}
          >
            Cancel
          </button>
          <input
            className="cursor-pointer bg-transparent hover:bg-[#7AC93B]  font-sans font-semibold
         hover:text-white border-slate-300 border hover:border-transparent  rounded-md py-2 px-3"
            type="submit"
            form={bg2 == 1 ? "form1" : bg2 == 2 ? "form2" : "form3"}
            value="Save"
          />
        </div>
      </div>
    </div>
  );
}

const UserDeatils = ({ singleAddress, getAddresses }) => {
  const [isEditTabOpen, setEditTabOpen] = useState(false);
  const [editAddressValue, setEditAddressValue] = useState(singleAddress);

  const handleOnChangetempAddress = (e) => {
    setEditAddressValue({
      ...editAddressValue,
      [e.target.name]: e.target.value,
    });
  };

  const editAddress = async () => {
    try {
      const addressDoc = doc(db, "addresses", singleAddress.id);
      await updateDoc(addressDoc, editAddressValue);
    } catch (err) {
      console.log(err);
    }
    getAddresses();
    setEditTabOpen(false);
  };

  const deleteAddress = async () => {
    try {
      const addressDoc = doc(db, "addresses", singleAddress.id);
      await deleteDoc(addressDoc);
    } catch (err) {
      console.log(err);
    }
    getAddresses();
  };

  //Validation
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (v) => {
    const errors = {};

    if (!v.addressLine) {
      errors.addressLine = "Required *";
    }
    if (!v.city) {
      errors.city = "Required *";
    }
    if (!v.postalCode) {
      errors.postalCode = "Required *";
    }
    if (!v.country) {
      errors.country = "Required *";
    }
    if (!v.phoneNO) {
      errors.phoneNO = "Valid Phone Number Required *";
    }

    return errors;
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    const validNumber = validatePhoneNumber(editAddressValue.phoneNO);
    if (!validNumber) {
      editAddressValue.phoneNO = "";
    }
    setFormErrors(validate(editAddressValue));
    if (Object.keys(formErrors).length === 0 && validNumber) {
      setFormErrors(validate(editAddressValue));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      editAddress();
    }
  }, [formErrors]);

  return (
    <div
      className={`${
        !isEditTabOpen && "h-[250px] "
      } flex flex-col border-2 border-gray-300 rounded-lg w-[400px] p-[20px] gap-[20px]  `}
    >
      {!isEditTabOpen && (
        <div className="flex flex-col">
          <div className="bg-transparent  text-[#768396]  rounded-md p-2 ">
            <span className="text-black font-medium ">Address: </span>
            <p>
              {singleAddress.addressLine} , {singleAddress.city} ,{" "}
              {singleAddress.postalCode} , {singleAddress.country}
            </p>
          </div>

          <div className="bg-transparent  text-[#768396]  rounded-md p-2 ">
            <span className="text-black font-medium ">Phone Number: </span>{" "}
            {singleAddress.phoneNO}
          </div>
        </div>
      )}

      {isEditTabOpen && (
        <div className="flex flex-col gap-[5px] overflow-hidden">
          {Object.keys(formErrors).length !== 0 && (
            <p className="text-[#ff0000] text-xs">Fill All Required Input*</p>
          )}
          <input
            type="text"
            placeholder="AddressLine"
            name="addressLine"
            value={editAddressValue.addressLine}
            className="bg-transparent  text-[#768396] border-b-2 border-slate-300 p-2 w-96 outline-none"
            required
            onChange={handleOnChangetempAddress}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={editAddressValue.city}
            className="bg-transparent  text-[#768396] border-b-2 border-slate-300 p-2 w-96 outline-none"
            required
            onChange={handleOnChangetempAddress}
          />
          <input
            type="text"
            placeholder="PostalCode"
            name="postalCode"
            value={editAddressValue.postalCode}
            className="bg-transparent  text-[#768396] border-b-2 border-slate-300 p-2 w-96 outline-none"
            required
            onChange={handleOnChangetempAddress}
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={editAddressValue.country}
            className="bg-transparent  text-[#768396] border-b-2 border-slate-300 p-2 w-96 outline-none"
            required
            onChange={handleOnChangetempAddress}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNO"
            value={editAddressValue.phoneNO}
            className="bg-transparent  text-[#768396] border-b-2 border-slate-300 p-2 w-96 outline-none"
            required
            onChange={handleOnChangetempAddress}
          />
        </div>
      )}
      <div className="flex gap-[10px]">
        {!isEditTabOpen ? (
          <button
            onClick={() => setEditTabOpen((prev) => !prev)}
            className="w-[80px] border border-gray-300 rounded-lg h-[40px] hover:bg-gray-300"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleAddAddress}
            className="w-[80px] border border-gray-300 rounded-lg h-[40px] hover:bg-gray-300"
          >
            Confirm
          </button>
        )}

        {!isEditTabOpen ? (
          <button
            onClick={deleteAddress}
            className="w-[80px] border border-gray-300  rounded-lg h-[40px] hover:bg-[#dc5a5a]"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => setEditTabOpen((prev) => !prev)}
            className="w-[80px] border border-gray-300  rounded-lg h-[40px] hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
