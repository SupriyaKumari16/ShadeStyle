import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 6;

  width: fit-content;

  a {
    width: 100%;
    display: flex;
    align-items: flex-end;
  }

  svg {
    width: 4rem;
    height: auto;
    overflow: visible;
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
`;

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },

  visible: {
    opacity: 1,
    pathLength: 1,

    transition: {
      duration: 2,
      delay: 3,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },

  visible: {
    opacity: 1,
    x: -5,

    transition: {
      duration: 2,
      delay: 5,
      ease: "easeInOut",
    },
  },
};

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        {/* =================================================
            SHOPPING BAG LOGO
        ================================================= */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
        >
          {/* BAG BODY */}

          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="
              M12 21
              H52
              L49 56
              H15
              Z
            "
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* LEFT HANDLE */}

          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="
              M21 21
              V16
              C21 10.5 25.5 7 32 7
            "
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* RIGHT HANDLE */}

          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="
              M43 21
              V16
              C43 10.5 38.5 7 32 7
            "
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* BAG TOP DETAIL */}

          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M12 21H52"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <Text
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          ShadeStyle
        </Text>
      </Link>
    </Container>
  );
};

export default Logo;