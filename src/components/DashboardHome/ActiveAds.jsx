import React, { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDispatch, useSelector } from "react-redux";
import { openProductFormModal } from "../../redux/store/modalSlice";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getDocs, collection, where, query } from "firebase/firestore";
import { auth, db } from "../../firebase";

function ActiveAds() {
  const dispatch = useDispatch();

  function handleNewAds() {
    dispatch(openProductFormModal());
  }

  const [ads, setActiveAds] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  const getAds = async () => {
    const ads = [];
    const q = query(
      collection(db, "products"),
      where("sellerId", "==", currentUser.uid)
    );
    const docsSnap = await getDocs(q);
    docsSnap.forEach((doc) => {
      ads.push({ ...doc.data() });
    });
    return ads;
  };

  const fetchAds = async () => {
    const res = await getAds();
    setActiveAds(res);
  };

  useEffect(() => {
    if (currentUser.customerType == "seller") fetchAds();
  }, []);

  return (
    <div className="p-6 max-w-[35rem] lg:max-w-[39rem] rounded-3xl border-1 border-gray-300 cursor-pointer transform transition ease-out duration-[400ms] hover:scale-105">
      <h1 className="font-bold text-sm mt-2">Products</h1>
      <div className="flex gap-x-2 py-2 pb-4 overflow-x-scroll scrollbar overflow-y-hidden">
        {ads.map((add) => {
          return <Add add={add} />;
        })}
        <div>
          <div
            className="text-white rounded-xl flex flex-col items-center justify-center h-28 w-32 bg-[#558D29] ml-2 cursor-pointer"
            onClick={handleNewAds}
          >
            <div className="flex items-cente justify-center border-white rounded-lg border-2 p-0.5">
              <AddRoundedIcon style={{ fontSize: "20px" }} />
            </div>
            <p className="flex flex-row text-sm mt-2">Post Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Add({ add }) {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();

  const getImageUrl = async (path) => {
    const image = await getDownloadURL(ref(storage, path));
    setImageUrl(image);
  };

  useEffect(() => {
    async function getImage() {
      await getImageUrl(add.imagesUrl[0]);
    }
    getImage();
  }, [imageUrl]);

  return (
    <>
      <div className="rounded-xl flex flex-col items-center justify-center relative pb-4 ml-2">
        <div className="overflow-hidden rounded-md transition ease-out duration-100 h-28 w-32">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="img"
              className="object-cover w-full h-full"
            />
          ) : (
            <span>loading</span>
          )}
        </div>
        <p className="text-xs font-semibold absolute bottom-[-10px] left-2">
          {add.name}
        </p>
      </div>
    </>
  );
}

export default ActiveAds;
