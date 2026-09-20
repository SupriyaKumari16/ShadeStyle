import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

import MainVideo from "../assets/video/fashion.mp4";

const VideoContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    display: block;

    /* =========================
       EXISTING DESKTOP
       ========================= */

    @media (max-width: 48em) {
      height: 100svh;
      object-position: center 10%;
    }

    /* =========================
       TABLET
       ========================= */

    @media (min-width: 48.01em) and (max-width: 64em) {
      height: 100svh;
      object-position: center center;
    }

    /* =========================
       MOBILE
       ========================= */

    @media (max-width: 30em) {
      height: 100svh;
      object-position: center 50%;
    }

    /* =========================
       SMALL PHONES
       ========================= */

    @media (max-width: 23.5em) {
      height: 100svh;
      object-position: center 50%;
    }
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;

  background-color: ${(props) =>
    `rgba(${props.theme.bodyRgba},0.6)`};
`;

const Title = styled(motion.div)`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 5;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.text};

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  h1 {
    font-family: "Kaushan Script";

    font-size: ${(props) => props.theme.fontBig};

    text-shadow: 1px 1px 1px
      ${(props) => props.theme.body};

    /* =========================
       TABLET
       ========================= */

    @media (min-width: 48.01em) and (max-width: 64em) {
      font-size: clamp(6rem, 13vw, 9rem);
    }

    /* =========================
       MOBILE
       ========================= */

    @media (max-width: 48em) {
      font-size: clamp(4.5rem, 16vw, 7rem);
    }

    /* =========================
       SMALL PHONES
       ========================= */

    @media (max-width: 30em) {
      font-size: clamp(3.8rem, 15vw, 5.5rem);
    }

    @media (max-width: 23.5em) {
      font-size: clamp(3.2rem, 14.5vw, 4.8rem);
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontlg};

    font-family: "Sirin Stencil";

    font-weight: 500;

    text-shadow: 1px 1px 1px
      ${(props) => props.theme.body};

    margin: 0 auto;

    text-transform: capitalize;

    /* =========================
       TABLET
       ========================= */

    @media (min-width: 48.01em) and (max-width: 64em) {
      font-size: 1.1rem;
      margin-top: 0.5rem;
    }

    /* =========================
       MOBILE
       ========================= */

    @media (max-width: 48em) {
      font-size: 1rem;
      margin-top: 0.25rem;
    }

    /* =========================
       SMALL PHONES
       ========================= */

    @media (max-width: 30em) {
      font-size: 0.85rem;
      margin-top: -0.75rem;
    }

    @media (max-width: 23.5em) {
      font-size: 0.78rem;
      margin-top: -0.5rem;
    }
  }

  /* =========================
     TABLET TITLE
     ========================= */

  @media (min-width: 48.01em) and (max-width: 64em) {
    padding: 0 2rem;
  }

  /* =========================
     MOBILE TITLE
     ========================= */

  @media (max-width: 48em) {
    padding: 0 1rem;

    div {
      max-width: 100%;
      justify-content: center;
    }
  }

  /* =========================
     SMALL PHONE TITLE
     ========================= */

  @media (max-width: 30em) {
    padding: 0 0.5rem;

    div {
      width: 100%;
      justify-content: center;
    }
  }
`;

const container = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      delayChildren: 5,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
  },
};

const CoverVideo = () => {
  return (
    <VideoContainer data-scroll>
      <DarkOverlay />

      <Title
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.13"
            data-scroll-speed="4"
          >
            S
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.09"
            data-scroll-speed="4"
          >
            h
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.06"
            data-scroll-speed="4"
          >
            a
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.04"
            data-scroll-speed="4"
          >
            d
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.03"
            data-scroll-speed="4"
          >
            e
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.02"
            data-scroll-speed="4"
          >
            S
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.01"
            data-scroll-speed="4"
          >
            t
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.01"
            data-scroll-speed="4"
          >
            y
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.01"
            data-scroll-speed="4"
          >
            l
          </motion.h1>

          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.01"
            data-scroll-speed="4"
          >
            e
          </motion.h1>
        </div>

        <motion.h2
          style={{
            alignSelf: "flex-end",
          }}
          variants={item}
          data-scroll
          data-scroll-delay="0.04"
          data-scroll-speed="2"
        >
          style. create. inspire
        </motion.h2>
      </Title>

      <video
        src={MainVideo}
        type="video/mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </VideoContainer>
  );
};

export default CoverVideo;