import {
  where,
  query,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  setDoc,
  or,
  serverTimestamp,
  orderBy,
  limit,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const sendMessage = async (chatId, message) => {
  try {
    const docRef = await addDoc(collection(db, "messages", chatId, "message"), {
      ...message,
      sendAt: serverTimestamp(),
      chatId,
    });
  } catch (err) {
    console.log("chat", err);
  }
};

export const createChat = async (userId, sellerId, requirementId) => {
  try {
    const docRef = await addDoc(collection(db, "chats"), {
      buyerId: userId,
      sellerId,
      recentMessage: {
        text: "Requirement",
        fileUrl: "",
        sendBy: 0,
        sendAt: Timestamp.fromDate(new Date()),
      },
      requirementId,
      createdAt: Timestamp.fromDate(new Date()),
    });
    return docRef.id;
  } catch (err) {
    console.log("chat", err);
  }
};

export const getRecentMessage = async (chatId) => {
  try {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (err) {
    console.log("chat", err);
  }
};
