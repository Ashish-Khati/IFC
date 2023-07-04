import { useLoadScript } from "@react-google-maps/api";

import ProductFormModal from "./components/SellerModals/ProductFormModal";
import QuoteModal from "./components/QuoteModal";
import RootRoute from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHashElement from "./components/ScrollToHashElement";
import AuthModal from "./components/AuthModal";
import OrderSuccessModal from "./components/OrderSuccessModal";

import "./App.css";
import ProfileChangeModal from "./components/ProfileChangeModal";

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCFdT2vEH2HZCMOe8eSD3lcP82124VKYcc",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <img src="images/Loading-bar.gif" alt="loading" />
      </div>
    );
  }

  return (
    <div className="App ">
      <ScrollToTop />
      <ProductFormModal />
      <QuoteModal />
      <AuthModal />
      <ProfileChangeModal />
      <OrderSuccessModal />
      <RootRoute />
      <ScrollToHashElement />
    </div>
  );
}
