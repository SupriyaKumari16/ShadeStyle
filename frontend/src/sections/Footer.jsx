import { motion } from "framer-motion";
import React from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  overflow-x: hidden;

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;

  .bag {
    width: 10vw;
    height: auto;

    stroke: ${(props) => props.theme.text};
    fill: none;

    @media (max-width: 48em) {
      width: 20vw;
    }
  }

  h3 {
    font-family: "Kaushan Script";

    font-size: ${(props) => props.theme.fontxxl};

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxl};
    }
  }
`;

const FooterComponent = styled(motion.footer)`
  width: 80vw;

  @media (max-width: 48em) {
    width: 90vw;
  }

  ul {
    list-style: none;

    display: flex;

    justify-content: space-between;
    align-items: center;

    flex-wrap: wrap;

    margin: 2rem;
    margin-top: 4rem;

    padding: 0 1rem;

    border-top: 1px solid ${(props) => props.theme.text};
    border-bottom: 1px solid ${(props) => props.theme.text};

    @media (max-width: 48em) {
      justify-content: center;
    }
  }

  li {
    padding: 2rem;

    font-size: ${(props) => props.theme.fontlg};

    text-transform: uppercase;

    cursor: pointer;

    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 48em) {
      padding: 1rem;

      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const Bottom = styled.div`
  padding: 0.5rem 0;

  margin: 0 4rem;

  font-size: ${(props) => props.theme.fontlg};

  display: flex;

  justify-content: space-between;
  align-items: center;

  a {
    color: inherit;
    text-decoration: underline;
  }

  @media (max-width: 64em) {
    flex-direction: column;

    justify-content: center;

    span {
      transform: none !important;
    }
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const ShoppingBag = styled.svg`
  width: 10vw;
  height: auto;

  overflow: visible;

  stroke: ${(props) => props.theme.text};

  stroke-width: 1.5;

  stroke-linecap: round;
  stroke-linejoin: round;

  fill: none;

  @media (max-width: 48em) {
    width: 20vw;
  }
`;

const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    const elem = document.querySelector(id);

    if (!elem || !scroll) return;

    scroll.scrollTo(elem, {
      offset: "-100",
      duration: "2000",
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  return (
    <Section>
      <LogoContainer>
        <ShoppingBag
          viewBox="0 0 64 64"
          data-scroll
          data-scroll-speed="2"
          aria-label="ShadeStyle"
        >
          {/* Handles */}
          <path d="M22 24V18C22 11.4 26.5 6 32 6C37.5 6 42 11.4 42 18V24" />

          {/* Bag */}
          <path d="M14 20H50L54 58H10L14 20Z" />

          {/* Small detail */}
          <path d="M24 32C24 36.4 27.6 40 32 40C36.4 40 40 36.4 40 32" />
        </ShoppingBag>

        <h3 data-scroll data-scroll-speed="-1">
          ShadeStyle
        </h3>
      </LogoContainer>

      <FooterComponent
        initial={{ y: "-400px" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
        }}
      >
        <ul>
          <li
            aria-hidden="true"
            onClick={() => handleScroll("#home")}
          >
            home
          </li>

          <li
            aria-hidden="true"
            onClick={() => handleScroll(".about")}
          >
            about
          </li>

          <li
            aria-hidden="true"
            onClick={() => handleScroll("#color-tone")}
          >
            color tone
          </li>

          <li
            aria-hidden="true"
            onClick={() => handleScroll(".new-arrival")}
          >
            new arrival
          </li>

          <li>
            <a
              href="#lookbook"
              onClick={(e) => e.preventDefault()}
            >
              look book
            </a>
          </li>

          <li>
            <a
              href="#reviews"
              onClick={(e) => e.preventDefault()}
            >
              reviews
            </a>
          </li>
        </ul>

        <Bottom>
          <span
            data-scroll
            data-scroll-speed="2"
            data-scroll-direction="horizontal"
          >
            &copy; 2026. All Rights Reserved.
          </span>

          <span
            data-scroll
            data-scroll-speed="-2"
            data-scroll-direction="horizontal"
          >
            Made with &hearts; by{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              ShadeStyle
            </a>
          </span>
        </Bottom>
      </FooterComponent>
    </Section>
  );
};

export default Footer;