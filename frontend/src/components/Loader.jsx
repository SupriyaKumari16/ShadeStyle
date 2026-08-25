import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  touch-action: none;
  overflow: hidden;

  width: 100vw;
  height: 100vh;

  z-index: 6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: black;

  width: 100%;

  @media (max-width: 48em) {
    svg {
      width: 20vw;
    }
  }

  svg {
    width: 10vw;

    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;

    g {
      path {
        stroke: #fff;
      }
    }
  }
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
      ease: 'easeInOut',
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  padding-top: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const Loader = () => {
  return (
    <Container
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {/* SHOPPING BAG */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
      >
        <g>
          {/* BAG BODY */}

          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M12 20h40l-3 36H15L12 20Z"
            stroke="#fff"
            strokeWidth="2"
          />

          {/* BAG HANDLE */}

          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M23 20v-4a9 9 0 0 1 18 0v4"
            stroke="#fff"
            strokeWidth="2"
          />
        </g>
      </svg>

      <Text
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        ShadeStyle
      </Text>
    </Container>
  );
};

export default Loader;