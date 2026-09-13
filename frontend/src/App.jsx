import "locomotive-scroll/dist/locomotive-scroll.css";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Loader from "./components/Loader";
import ScrollTriggerProxy from "./components/ScrollTriggerProxy";

import Home from "./sections/Home";
import About from "./sections/About";
import ColorTone from "./sections/ColorTone";
import Marquee from "./sections/Marquee";
import NewArrival from "./sections/NewArrival";
import Footer from "./sections/Footer";

import YourBestColors from "./shades/YourBestColors";

import TrendyCollection from "./collections/TrendyCollection";
import TraditionalCollection from "./collections/TraditionalCollection";
import JewelleryCollection from "./collections/JewelleryCollection";

import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import AuthPage from "./auth/Auth";

import MyAccount from "./profile/MyAccount";
import AccountDetails from "./profile/AccountDetails";
import AddressPage from "./profile/AddressPage";
import MyOrders from "./profile/MyOrders";
import MyOrderDetails from "./profile/MyOrderDetails";
import OrderUpdates from "./profile/OrderUpdates";
import WriteReview from "./profile/WriteReview";

import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";


/* =====================================================
   MAIN WEBSITE
===================================================== */

function MainWebsite() {
  const containerRef = useRef(null);

  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,

        smartphone: {
          smooth: true,
        },

        tablet: {
          smooth: true,
        },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <AnimatePresence mode="wait">
        {!Loaded && <Loader />}
      </AnimatePresence>

      <main
        className="App"
        data-scroll-container
        ref={containerRef}
      >
        {Loaded && (
          <>
            <ScrollTriggerProxy />

            <Home />

            <About />

            <ColorTone />

            <Marquee />

            <NewArrival />

            <Footer />
          </>
        )}
      </main>
    </LocomotiveScrollProvider>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={dark}>
        <Routes>

          {/* =================================================
              HOME
          ================================================= */}

          <Route
            path="/"
            element={<MainWebsite />}
          />


          {/* =================================================
              AUTH
          ================================================= */}

          <Route
            path="/auth"
            element={
              <AuthPage
                showAuth={true}
                setShowAuth={() => {}}
              />
            }
          />


          {/* =================================================
              YOUR BEST COLORS
          ================================================= */}

          <Route
            path="/your-best-colors"
            element={<YourBestColors />}
          />


          {/* =================================================
              COLLECTIONS
          ================================================= */}

          <Route
            path="/collections/trendy"
            element={<TrendyCollection />}
          />

          <Route
            path="/collections/traditional"
            element={<TraditionalCollection />}
          />

          <Route
            path="/collections/jewellery"
            element={<JewelleryCollection />}
          />


          {/* =================================================
              PRODUCT
          ================================================= */}

          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />


          {/* =================================================
              SHOPPING
          ================================================= */}

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />


          {/* =================================================
              ACCOUNT
          ================================================= */}

          <Route
            path="/account"
            element={<MyAccount />}
          />

          <Route
            path="/account/details"
            element={<AccountDetails />}
          />

          <Route
            path="/account/addresses"
            element={<AddressPage />}
          />


          {/* =================================================
              MY ORDERS
          ================================================= */}

          <Route
  path="/orders"
  element={<MyOrders />}
/>

<Route
  path="/orders/:id"
  element={<MyOrderDetails />}
/>

<Route
  path="/orders/:id/updates"
  element={<OrderUpdates />}
/>

<Route
  path="/orders/:id/review"
  element={<WriteReview />}
/>


          {/* =================================================
              FALLBACK
          ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;