import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
  useLayoutEffect,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import img1 from "../assets/images/colortone/Fair.png";
import img2 from "../assets/images/colortone/Light.png";
import img3 from "../assets/images/colortone/Medium.png";
import img4 from "../assets/images/colortone/Olive.png";
import img5 from "../assets/images/colortone/Tan.png";
import img6 from "../assets/images/colortone/Dusky.png";
import img7 from "../assets/images/colortone/DeepBrown.png";
import img8 from "../assets/images/colortone/DeepDark.png";


/* =====================================================
   SECTION
===================================================== */

const Section = styled(motion.section)`
  /* ==============================
     DESKTOP / DEFAULT
     ORIGINAL DESIGN
  ============================== */

  min-height: 100vh;
  height: auto;
  width: 100%;
  margin: 0 auto;

  overflow: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  position: relative;


  /* ==============================
     TABLET
  ============================== */

  @media (min-width: 48.01em) and (max-width: 64em) {
    min-height: 100vh;
    width: 100%;
  }


  /* ==============================
     MOBILE
  ============================== */

  @media (max-width: 48em) {
    min-height: 100vh;
    width: 100%;
  }


  /* ==============================
     SMALL MOBILE
  ============================== */

  @media (max-width: 30em) {
    min-height: 100vh;
    width: 100%;
  }
`;


/* =====================================================
   TITLE
===================================================== */

const Title = styled.h1`
  /* ==============================
     DESKTOP / DEFAULT
  ============================== */

  font-size: ${(props) => props.theme.fontxxxl};

  font-family: "Kaushan Script";

  font-weight: 300;

  color: ${(props) => props.theme.text};

  text-shadow:
    1px 1px 1px
    ${(props) => props.theme.body};

  position: absolute;

  top: 1rem;
  left: 5%;

  z-index: 11;


  /* ==============================
     TABLET
  ============================== */

  @media (min-width: 48.01em) and (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};

    top: 1rem;
    left: 5%;
  }


  /* ==============================
     MOBILE
  ============================== */

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};

    top: 1rem;
    left: 5%;
  }


  /* ==============================
     SMALL MOBILE
  ============================== */

  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontxl};

    top: 0.8rem;
    left: 5%;
  }
`;


/* =====================================================
   LEFT
===================================================== */

const Left = styled.div`
  /* ==============================
     DESKTOP / DEFAULT
     ORIGINAL DESIGN
  ============================== */

  width: 35%;

  background-color:
    ${(props) => props.theme.body};

  color:
    ${(props) => props.theme.text};

  min-height: 100vh;

  z-index: 10;

  position: fixed;

  left: 0;

  display: flex;

  justify-content: center;

  align-items: center;


  p {
    font-size:
      ${(props) => props.theme.fontlg};

    font-weight: 300;

    width: 80%;

    margin: 0 auto;
  }


  /* ==============================
     TABLET
  ============================== */

  @media (min-width: 48.01em) and (max-width: 64em) {
    width: 35%;

    min-height: 100vh;

    p {
      font-size:
        ${(props) => props.theme.fontmd};

      width: 80%;
    }
  }


  /* ==============================
     MOBILE
  ============================== */

  @media (max-width: 48em) {
    width: 40%;

    min-height: 100vh;

    p {
      font-size:
        ${(props) => props.theme.fontsm};

      width: 80%;
    }
  }


  /* ==============================
     SMALL MOBILE
  ============================== */

  @media (max-width: 30em) {
    width: 42%;

    min-height: 100vh;

    p {
      font-size:
        ${(props) => props.theme.fontxs};

      width: 82%;
    }
  }
`;


/* =====================================================
   RIGHT
===================================================== */

const Right = styled.div`
  /* ==============================
     DESKTOP / DEFAULT
     ORIGINAL DESIGN
  ============================== */

  position: absolute;

  left: 35%;

  padding-left: 30%;

  background-color:
    ${(props) => props.theme.grey};

  min-height: 100vh;

  display: flex;

  justify-content: flex-start;

  align-items: center;


  /* ==============================
     TABLET
  ============================== */

  @media (min-width: 48.01em) and (max-width: 64em) {
    left: 35%;

    padding-left: 25%;

    min-height: 100vh;
  }


  /* ==============================
     MOBILE
  ============================== */

  @media (max-width: 48em) {
    left: 40%;

    padding-left: 25%;

    min-height: 100vh;
  }


  /* ==============================
     SMALL MOBILE
  ============================== */

  @media (max-width: 30em) {
    left: 42%;

    padding-left: 22%;

    min-height: 100vh;
  }
`;


/* =====================================================
   CARD
===================================================== */

const Item = styled(motion.div)`
  /* ==============================
     DESKTOP / DEFAULT
     ORIGINAL DESIGN
  ============================== */

  display: inline-block;

  width: 20rem;

  margin-right: 6rem;

  color:
    ${(props) => props.theme.text};

  cursor: pointer;


  img {
    width: 100%;

    height: auto;

    cursor: pointer;

    display: block;
  }


  h1 {
    font-weight: 500;

    text-align: center;

    cursor: pointer;

    margin-top: 0.8rem;

    color:
      ${(props) => props.theme.text};
  }


  p {
    text-align: center;

    font-size:
      ${(props) => props.theme.fontsm};

    margin-top: 0.3rem;

    color:
      ${(props) => props.theme.text};
  }


  /* ==============================
     TABLET
  ============================== */

  @media (min-width: 48.01em) and (max-width: 64em) {
    width: 18rem;

    margin-right: 5rem;

    img {
      width: 100%;
      height: auto;
    }

    h1 {
      font-size: ${(props) => props.theme.fontmd};
    }

    p {
      font-size: ${(props) => props.theme.fontsm};
    }
  }


  /* ==============================
     MOBILE
     SAME CARD DESIGN
  ============================== */

  @media (max-width: 48em) {
    width: 15rem;

    margin-right: 4rem;

    img {
      width: 100%;
      height: auto;
    }

    h1 {
      font-size: ${(props) => props.theme.fontmd};

      margin-top: 0.8rem;
    }

    p {
      font-size: ${(props) => props.theme.fontxs};

      margin-top: 0.3rem;
    }
  }


  /* ==============================
     SMALL MOBILE
  ============================== */

  @media (max-width: 30em) {
    width: 13rem;

    margin-right: 3rem;

    img {
      width: 100%;
      height: auto;
    }

    h1 {
      font-size: ${(props) => props.theme.fontsm};

      margin-top: 0.7rem;
    }

    p {
      font-size: ${(props) => props.theme.fontxs};

      margin-top: 0.25rem;
    }
  }
`;


/* =====================================================
   COLOR CARD
===================================================== */

const ColorCard = ({
  img,
  title,
  description,
  tone,
  onClick,
}) => {

  return (

    <Item
      onClick={() => onClick(tone)}

      initial={{
        filter: "grayscale(100%)",
      }}

      whileInView={{
        filter: "grayscale(0%)",
      }}

      whileHover={{
        scale: 1.03,
      }}

      whileTap={{
        scale: 0.98,
      }}

      transition={{
        duration: 0.5,
      }}

      viewport={{
        once: false,
        amount: "all",
      }}
    >

      <img
        width="400"
        height="600"
        src={img}
        alt={title}
      />


      <h1>
        {title}
      </h1>


      <p>
        {description}
      </p>

    </Item>

  );
};


/* =====================================================
   COLOR TONE
===================================================== */

const ColorTone = () => {

  gsap.registerPlugin(
    ScrollTrigger
  );


  const navigate =
    useNavigate();


  const ref =
    useRef(null);


  const horizontalRef =
    useRef(null);


  /* ===================================================
     HORIZONTAL SCROLL
  =================================================== */

  useLayoutEffect(() => {

    const element =
      ref.current;


    const scrollingElement =
      horizontalRef.current;


    if (
      !element ||
      !scrollingElement
    ) {
      return;
    }


    let pinWrapWidth =
      scrollingElement.offsetWidth;


    const timeline =
      gsap.timeline();


    const createScrollAnimation =
      () => {

        pinWrapWidth =
          scrollingElement.offsetWidth;


        timeline.clear();


        timeline.to(
          element,
          {

            scrollTrigger: {

              trigger: element,

              start: "top top",

              end:
                `${pinWrapWidth} bottom`,

              scroller: ".App",

              scrub: 1,

              pin: true,

            },


            height:
              `${scrollingElement.scrollWidth}px`,

            ease: "none",

          }
        );


        timeline.to(
          scrollingElement,
          {

            scrollTrigger: {

              trigger:
                scrollingElement,

              start: "top top",

              end:
                `${pinWrapWidth} bottom`,

              scroller: ".App",

              scrub: 1,

            },


            x: -pinWrapWidth,

            ease: "none",

          }
        );


        ScrollTrigger.refresh();

      };


    const timer =
      setTimeout(
        createScrollAnimation,
        500
      );


    return () => {

      clearTimeout(timer);

      timeline.kill();

      ScrollTrigger
        .getAll()
        .forEach(
          (trigger) => {
            trigger.kill();
          }
        );

    };

  }, []);


  /* ===================================================
     CARD NAVIGATION
  =================================================== */

  const handleToneClick =
    (tone) => {

      navigate(
        `/best-colors/${tone}`
      );

    };


  return (

    <Section
      ref={ref}
      id="color-tone"
    >

      <Title
        data-scroll
        data-scroll-speed="-1"
      >
        Color Tone
      </Title>


      {/* =================================================
          LEFT CONTENT
      ================================================= */}

      <Left>

        <p>

          Discover the colors that naturally complement
          your skin tone.

          <br />
          <br />

          ShadeStyle helps you understand which shades
          bring out your best features, so choosing an
          outfit becomes easier and more personal.

          <br />
          <br />

          Explore different color palettes and discover
          clothing shades that work beautifully with your
          natural tone.

        </p>

      </Left>


      {/* =================================================
          RIGHT CARDS
      ================================================= */}

      <Right
        data-scroll
        ref={horizontalRef}
      >

        <ColorCard
          img={img1}
          title="Fair Tones"
          description="Light, soft and delicate shades"
          tone="fair"
          onClick={handleToneClick}
        />


        <ColorCard
          img={img2}
          title="Light Tones"
          description="Soft and elegant shades"
          tone="light"
          onClick={handleToneClick}
        />


        <ColorCard
          img={img3}
          title="Medium Tones"
          description="Balanced and versatile shades"
          tone="medium"
          onClick={handleToneClick}
        />


        <ColorCard
          img={img4}
          title="Olive"
          description="Earthy and sophisticated shades"
          tone="olive"
          onClick={handleToneClick}
        />


        <ColorCard
          img={img5}
          title="Tan"
          description="Warm and rich shades"
          tone="tan"
          onClick={handleToneClick}
        />


        <ColorCard
          img={img6}
          title="Dusky"
          description="Bold and vibrant shades"
          tone="dusky"
          onClick={handleToneClick}
        />


        <ColorCard
          img={img7}
          title="Deep Brown"
          description="Rich and striking shades"
          tone="deep"
          onClick={handleToneClick}
        />


        <ColorCard
          img={img8}
          title="Deep Dark"
          description="Jewel tones and rich shades"
          tone="deep-dark"
          onClick={handleToneClick}
        />

      </Right>

    </Section>

  );
};


export default ColorTone;