import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./Products/Products";
import Product from "./Product/Product";
import Home from "./Home/Home";
import PaymentModal from "../components/PaymentModal";
import SubCategory from "./SubCategory";
import PageNotFound from "./PageNotFound";
import Booking from "./Booking/Booking";
import PrivacyPolicy from "./PrivacyPolicy";
import OurTeam from "./OurTeam/OurTeam";
import FAQ from "./FAQ";
import WhoAreWe from "./WhoAreWe";

const Dashboard = lazy(() => import("./Dashboard"));
const Stats = lazy(() => import("./Stats/Stats"));
const Chat = lazy(() => import("./Chat/Chat"));
const Tracking = lazy(() => import("./Tracking/Tracking"));
const Setting = lazy(() => import("./Setting"));
const Wallet = lazy(() => import("./Wallet/Wallet"));
const Orders = lazy(() => import("./Orders/Orders"));
const Support =lazy(()=> import("./Support/Support"))
const loading = (
  <div className="h-full w-full flex justify-center items-center">
    <img src="Images/Loading-bar.gif" alt="loading" />
  </div>
);

function RootRoute() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="subcategory" element={<SubCategory />} />
      <Route path="booking" element={<Booking />} />
      <Route path="team" element={<OurTeam />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="who-are-we" element={<WhoAreWe />} />
      <Route path="booking" element={<Booking />} />
      <Route path="products" element={<Products />} />
      <Route path="paymentmodal" element={<PaymentModal />} /> // for testing
      <Route path="product/:id" element={<Product />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route
        path="dashboard"
        element={
          <Suspense fallback={loading}>
            <Dashboard />
          </Suspense>
        }
      >
        <Route
          path=""
          element={
            <Suspense fallback={loading}>
              <Stats />
            </Suspense>
          }
        />
        <Route
          path="chat"
          element={
            <Suspense fallback={loading}>
              <Chat />
            </Suspense>
          }
        >
          <Route
            path=":id"
            element={
              <Suspense fallback={loading}>
                <Chat />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="tracking"
          element={
            <Suspense fallback={loading}>
              <Tracking />
            </Suspense>
          }
        >
          <Route
            path=":id"
            element={
              <Suspense fallback={loading}>
                <Tracking />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="setting"
          element={
            <Suspense fallback={loading}>
              <Setting />
            </Suspense>
          }
        />
        <Route
          path="wallet"
          element={
            <Suspense fallback={loading}>
              <Wallet />
            </Suspense>
          }
        />
        <Route
          path="orders"
          element={
            <Suspense fallback={loading}>
              <Orders />
            </Suspense>
          }
        /> <Route
          path="support"
          element={
            <Suspense fallback={loading}>
            
              <Support/>
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RootRoute;
