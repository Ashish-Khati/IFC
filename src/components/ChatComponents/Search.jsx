// component for search the new users
import React, { useState } from "react";
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@mui/icons-material";

function Search({ tempChats }) {
  const [username, setUsername] = useState("");
  const [enter, setEnter] = useState(false);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const handleSearch = async () => {
    setEnter(true);
    try {
      tempChats.forEach(function (item) {
        username === item.userInfo.displayName
          ? setUser(item.userInfo)
          : setUser(null);
      });
    } catch (err) {
      setErr(true);
    }
  };

  console.log(user);

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            // photoURL: auth.currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
    setEnter(false);
  };

  return (
    <>
      <div className="rounded-xl flex items-center shadow-lg  border-2 bg-white px-2 gap-2 align-baseline">
        <SearchOutlined />
        <input
          placeholder={"Search..."}
          className="py-3 w-full outline-none"
          type="text"
          value={username}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
      </div>
      {(!user || err) && enter && (
        <span className="text-black py-3 text-center">User not found!</span>
      )}
      {user && enter && (
        <div onClick={handleSelect} className="cursor-pointer">
          <div className="text-gray-300 px-4 my-2">1 Result Found</div>
          <div className="flex items-center gap-4 px-4 py-2 text-black border-b-2">
            <div>
              <img className="w-12 h-12 rounded-full" src={user.image} alt="" />
            </div>
            <div>{user.displayName}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
