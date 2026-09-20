import React, { Suspense } from "react";
import styled from "styled-components";

const CoverVideo = React.lazy(
  () => import("../components/CoverVideo")
);

const Navbar = React.lazy(
  () => import("../components/Navbar")
);

const Logo = React.lazy(
  () => import("../components/Logo")
);

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100svh;

  overflow: hidden;

  /* Prevent horizontal overflow on smaller screens */
  max-width: 100%;
  isolation: isolate;

  /* Tablet */
  @media (max-width: 1024px) {
    min-height: 100svh;
    height: 100svh;
  }

  /* Mobile */
  @media (max-width: 768px) {
    min-height: 100svh;
    height: 100svh;
  }

  /* Small phones */
  @media (max-width: 480px) {
    min-height: 100svh;
    height: 100svh;
  }
`;

const Home = () => {
  return (
    <Section id="home">
      <Suspense fallback={null}>
        <Logo />
        <Navbar />
        <CoverVideo />
      </Suspense>
    </Section>
  );
};

export default Home;