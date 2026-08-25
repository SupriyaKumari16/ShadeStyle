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
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
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