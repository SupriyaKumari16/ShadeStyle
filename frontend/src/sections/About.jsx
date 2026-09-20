import React from "react";
import styled from "styled-components";

import img1 from "../assets/images/model1.jpg";
import img2 from "../assets/images/model2.jpg";
import img3 from "../assets/images/model3.jpg";

const Section = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;
  position: relative;
  display: flex;

  /* TABLET */
  @media (max-width: 64em) {
    width: 90vw;
    min-height: 100svh;
  }

  /* MOBILE */
  @media (max-width: 48em) {
    width: 92vw;
    min-height: 100svh;
  }

  /* SMALL MOBILE */
  @media (max-width: 30em) {
    width: 100vw;
    min-height: 100svh;
  }
`;

const Left = styled.div`
  width: 50%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: relative;
  z-index: 5;
  margin-top: 20%;

  /* TABLET */
  @media (max-width: 64em) {
    width: 80%;
    position: absolute;

    /* Card moved slightly down */
    top: 58%;
    left: 50%;

    transform: translate(-50%, -50%) !important;

    margin: 0 auto;
    padding: 2rem;
    font-weight: 600;

    backdrop-filter: blur(2px);

    background-color: ${(props) =>
      `rgba(${props.theme.textRgba},0.4)`};

    border-radius: 20px;
  }

  /* MOBILE */
  @media (max-width: 48em) {
    width: 82%;

    /* Move card further down so face stays visible */
    top: 62%;

    font-size: ${(props) => props.theme.fontmd};

    padding: 1.75rem;

    line-height: 1.6;

    max-height: 70svh;
    overflow-y: auto;
  }

  /* SMALL MOBILE */
  @media (max-width: 30em) {
    width: 78%;

    top: 64%;

    font-size: ${(props) => props.theme.fontsm};

    padding: 1.35rem;

    line-height: 1.55;

    max-height: 65svh;
  }

  /* VERY SMALL PHONES */
  @media (max-width: 23.5em) {
    width: 80%;

    top: 65%;

    padding: 1.1rem;

    font-size: 0.8rem;

    line-height: 1.5;
  }
`;

const Right = styled.div`
  width: 50%;
  position: relative;

  img {
    width: 100%;
    height: auto;
  }

  .small-img-1 {
    width: 40%;
    position: absolute;
    right: 95%;
    bottom: 10%;
  }

  .small-img-2 {
    width: 40%;
    position: absolute;
    left: 80%;
    top: 30%;
  }

  /* TABLET */
  @media (max-width: 64em) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100svh;
      object-fit: cover;
    }

    .small-img-1 {
      width: 30%;
      height: auto;
      left: 5%;
      bottom: 10%;
    }

    .small-img-2 {
      width: 30%;
      height: auto;
      position: absolute;
      left: 60%;
      bottom: 20%;
    }
  }

  /* MOBILE */
  @media (max-width: 48em) {
    img {
      width: 100%;
      height: 100svh;
      object-fit: cover;
    }

    .small-img-1 {
      width: 28%;
      left: 4%;
      bottom: 8%;
    }

    .small-img-2 {
      width: 28%;
      left: 64%;
      bottom: 18%;
      top: auto;
    }
  }

  /* SMALL MOBILE */
  @media (max-width: 30em) {
    img {
      height: 100svh;
      object-fit: cover;
    }

    .small-img-1 {
      width: 26%;
      left: 3%;
      bottom: 7%;
    }

    .small-img-2 {
      width: 26%;
      left: 67%;
      bottom: 16%;
    }
  }

  /* VERY SMALL PHONES */
  @media (max-width: 23.5em) {
    .small-img-1 {
      width: 24%;
      left: 3%;
      bottom: 6%;
    }

    .small-img-2 {
      width: 24%;
      left: 69%;
      bottom: 14%;
    }
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontBig};
  font-family: "Kaushan Script";
  font-weight: 300;
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 5;

  span {
    display: inline-block;
  }

  /* TABLET */
  @media (max-width: 64em) {
    font-size: ${(props) =>
      `calc(${props.theme.fontBig} - 5vw)`};

    top: 0;
    left: 0%;
  }

  /* MOBILE */
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxxl};

    top: 1rem;
    left: 5%;
  }

  /* SMALL MOBILE */
  @media (max-width: 30em) {
    font-size: clamp(2.5rem, 12vw, 4rem);

    top: 1rem;
    left: 5%;
  }

  /* VERY SMALL PHONES */
  @media (max-width: 23.5em) {
    font-size: clamp(2.2rem, 11vw, 3.2rem);
  }
`;

const About = () => {
  return (
    <Section id="fixed-target" className="about">
      <Title
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
      >
        About Us
      </Title>

      <Left
        data-scroll
        data-scroll-sticky
        data-scroll-target="#fixed-target"
      >
        We're a fashion studio based in California. We create
        timeless pieces that combine modern aesthetics with
        classic design.

        <br />
        <br />

        Our approach is simple — focus on quality,
        craftsmanship and creating pieces that make you feel
        confident. Every collection is carefully designed
        with attention to detail.

        <br />
        <br />

        At ShadeStyle, fashion is more than just clothing.
        It's a way of expressing who you are.
      </Left>

      <Right>
        <img
          width="400"
          height="600"
          src={img3}
          alt="ShadeStyle fashion"
        />

        <img
          width="400"
          height="600"
          className="small-img-1"
          src={img2}
          alt="ShadeStyle fashion"
          data-scroll
          data-scroll-speed="5"
        />

        <img
          width="400"
          height="600"
          className="small-img-2"
          src={img1}
          alt="ShadeStyle fashion"
          data-scroll
          data-scroll-speed="-2"
        />
      </Right>
    </Section>
  );
};

export default About;