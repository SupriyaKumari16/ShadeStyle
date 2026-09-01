import "locomotive-scroll/dist/locomotive-scroll.css";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

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

import { WishlistProvider } from "./context/WishlistContext";

import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";


/* =====================================================
   MAIN WEBSITE
   Locomotive Scroll is used ONLY here
===================================================== */

function MainWebsite() {
  const containerRef = useRef(null);

  const [Loaded, setLoaded] = useState(false);


  /* =====================================================
     LOADER
  ===================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
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

      {/* =================================================
          LOADER
      ================================================= */}

      <AnimatePresence mode="wait">
        {!Loaded && <Loader />}
      </AnimatePresence>


      {/* =================================================
          MAIN SCROLL CONTAINER
      ================================================= */}

      <main
        className="App"
        data-scroll-container
        ref={containerRef}
      >

        <ScrollTriggerProxy />


        {Loaded && (
          <>

            {/* HOME */}
            <Home />


            {/* ABOUT */}
            <About />


            {/* COLOR TONE */}
            <ColorTone />


            {/* MARQUEE */}
            <Marquee />


            {/* NEW ARRIVALS */}
            <NewArrival />


            {/* FOOTER */}
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

        <WishlistProvider>

          <Routes>

            {/* =================================================
                MAIN WEBSITE
            ================================================= */}

            <Route
              path="/"
              element={<MainWebsite />}
            />


            {/* =================================================
                YOUR BEST COLORS
            ================================================= */}

            <Route
              path="/best-colors/:tone"
              element={<YourBestColors />}
            />


            {/* =================================================
                TRENDY COLLECTION
            ================================================= */}

            <Route
              path="/collection/trendy"
              element={<TrendyCollection />}
            />


            {/* =================================================
                TRADITIONAL COLLECTION
            ================================================= */}

            <Route
              path="/collection/traditional"
              element={<TraditionalCollection />}
            />


            {/* =================================================
                JEWELLERY COLLECTION
            ================================================= */}

            <Route
              path="/collection/jewellery"
              element={<JewelleryCollection />}
            />


            {/* =================================================
                PRODUCT DETAIL
            ================================================= */}

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />


            {/* =================================================
                WISHLIST
            ================================================= */}

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />


            {/* =================================================
                INVALID URL
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

        </WishlistProvider>

      </ThemeProvider>
    </>
  );
}


export default App;
