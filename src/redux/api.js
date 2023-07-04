import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  where,
  query,
  collection,
  addDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
// import { loginFailure, loginStart, loginSuccess } from "./store/userSlice";
import { closeAuthModal } from "./store/modalSlice";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { loadscript } from "../utils/native";
import { setOrders } from "./store/ordersRedux";
import { createChat } from "../api/chat";

const auth = getAuth(app);
const storage = getStorage(app);

// products ---------------------
export const postProduct = async (dispatch, productData) => {
  try {
    const id = uuidv4();
    const imagePromises = productData.images.map(async (file, index) => {
      const storageRef = ref(storage, `products/${id}/${index}`);
      return uploadBytes(storageRef, file);
    });
    const imagesRef = await Promise.all(imagePromises);
    delete productData.images;
    console.log({
      ...productData,
    });
    await setDoc(doc(db, "products", id), {
      ...productData,
      createdAt: Timestamp.fromDate(new Date()),
      imagesUrl: imagesRef.map(({ metadata }) => `${metadata.fullPath}`),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (category, subCategory) => {
  try {
    let products = [];
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      where("subCategory", "==", subCategory)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id) products.push({ ...doc.data(), id: doc.id });
    });
    const productsImgPromise = products.map(async (doc) => {
      const listRef = ref(storage, `products/${doc.id}`);
      return listAll(listRef);
    });
    let productsImgRes = await Promise.all(productsImgPromise);
    productsImgRes = productsImgRes.map(({ items }) =>
      Promise.all(items.map((ref) => getDownloadURL(ref)))
    );
    productsImgRes = await Promise.all(productsImgRes);
    products = products.map((product, index) => {
      return { ...product, imagesRef: productsImgRes[index] };
    });
    return products;
  } catch (err) {
    console.log(err);
  }
};

export const getTrendingProducts = async () => {
  try {
    let products = [];
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id) products.push({ ...doc.data(), id: doc.id });
    });
    const productsImgPromise = products.map(async (doc) => {
      const listRef = ref(storage, `products/${doc.id}`);
      return listAll(listRef);
    });
    let productsImgRes = await Promise.all(productsImgPromise);
    productsImgRes = productsImgRes.map(({ items }) =>
      Promise.all(items.map((ref) => getDownloadURL(ref)))
    );
    productsImgRes = await Promise.all(productsImgRes);
    products = products.map((product, index) => {
      return { ...product, imagesRef: productsImgRes[index] };
    });
    return products;
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = async (productId) => {
  try {
    const docSnap = await getDoc(doc(db, "products", productId));
    if (!docSnap.exists()) {
      return;
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (err) {
    console.log(err);
  }
};

// billings ----------------
export const getAddress = async (addressId) => {
  try {
    const docSnap = await getDoc(doc(db, "addresses", addressId));
    if (!docSnap.exists()) {
      return;
    }
    return { ...docSnap.data(), id: docSnap.id };
  } catch (err) {
    console.log(err);
  }
};

// razorpay ---------------
export const payWithRazorpay = async (
  { amount, name, description },
  onSuccess,
  onError
) => {
  try {
    const isLoaded = await loadscript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!isLoaded) {
      alert("No internet connection");
      return;
    }

    const OPTIONS = {
      key: "rzp_test_lwWpVIxgAcUcqj",
      amount: amount * 100,
      currency: "INR",
      name,
      description,
      handler: async function (res) {
        onSuccess && onSuccess(res);
      },
      modal: {
        ondismiss: async function () {
          onError && onError();
        },
      },
      prefill: {
        name,
      },
    };
    const paymentObj = new window.Razorpay(OPTIONS);
    paymentObj.open();
  } catch (error) {
    onError && onError();
    console.log(error);
  }
};

export const sendOtp = async ({ phoneNumber }) => {
  if (!phoneNumber) return;
  fetch(
    `https://api.authkey.io/request?authkey=40dff8dca020530e&mobile=9389586440&country_code=91&sid=8391&phoneNumber=${phoneNumber}&expireTime=1`
  );
};

// transactions ------------------
export const createTransaction = async (transactionData) => {
  const docRef = await addDoc(collection(db, "transactions"), {
    createdAt: serverTimestamp(),
    ...transactionData,
  });
  return docRef;
};

// orders --------------------
export const createOrder = async ({
  total,
  paymentId,
  buyerId,
  sellerId,
  walletDebitedAmount,
  receiptUrl,
  destination,
  productId,
  quantity,
  requirementId,
  origin,
  vehicleId,
}) => {
  const transactionRef = await createTransaction({
    amount: total,
    paymentId,
    status: 0, // success
    buyerId,
    sellerId,
    walletDebitedAmount: walletDebitedAmount || 0,
    receiptUrl: receiptUrl || "",
  });

  if (!transactionRef.id) return;

  const orderRef = await addDoc(collection(db, "orders"), {
    transactionId: transactionRef.id,
    createdAt: serverTimestamp(),
    eta: "",
    status: 0, // idle
    destination,
    buyerId,
    sellerId,
    productId: productId || "",
    quantity,
    requirementId: requirementId || "",
    origin: origin || {},
    total,
    vehicleId: vehicleId || "",
  });

  return orderRef;
};

// requirements --------------
export const createRequirement = async ({
  quantity,
  unit,
  price,
  productId,
  sellerId,
  buyerId,
  open,
  productName,
  location,
  bookDate,
}) => {
  const requirementRef = await addDoc(collection(db, "requirements"), {
    open,
    quantity: { unit, value: Number(quantity) },
    price,
    productId: productId || "",
    sellerId: sellerId || "",
    buyerId,
    accepted: false,
    sendBy: 0,
    productName: productName || "",
    location: location || {},
    createdAt: serverTimestamp(),
    bookDate: bookDate || "",
  });
  return requirementRef;
};

export const getRequirement = async (requirementId) => {
  try {
    const docSnap = await getDoc(doc(db, "requirements", requirementId));
    if (!docSnap.exists()) {
      return;
    }
    return { ...docSnap.data(), id: docSnap.id };
  } catch (err) {
    console.log(err);
  }
};

export const acceptRequirement = async (requirementId) => {
  const requirementRef = doc(db, "requirements", requirementId);
  await updateDoc(requirementRef, {
    accepted: true,
  });
};

export const updateRequirement = async (requirementId, data) => {
  const requirementRef = doc(db, "requirements", requirementId);
  await updateDoc(requirementRef, {
    ...data,
  });
};

export const sendRequirement = async (buyerId, sellerId, requirement) => {
  const requirementRef = await createRequirement({
    buyerId,
    sellerId,
    ...requirement,
  });
  await createChat(buyerId, sellerId, requirementRef.id);
};

// users ------------------------
export const getUser = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, "users", userId));
    if (!docSnap.exists()) {
      return;
    }
    return { ...docSnap.data(), id: docSnap.id };
  } catch (err) {
    console.log(err);
  }
};

export const setUserProfile = async (userId, userType) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    userType,
  });
};
