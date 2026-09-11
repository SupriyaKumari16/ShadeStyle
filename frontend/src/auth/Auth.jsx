import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import Login from "./login";
import Signup from "./signup";

const Auth = ({ showAuth, setShowAuth }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // =====================================================
  // OPEN ANIMATION
  // =====================================================

  useEffect(() => {
    if (!showAuth) return;

    setIsLogin(true);

    const container = document.querySelector(".auth-container");

    if (!container) return;

    gsap.fromTo(
      container,
      {
        opacity: 0,
        scale: 0.94,
        y: 25,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, [showAuth]);

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    const container = document.querySelector(".auth-container");

    if (!container) {
      setShowAuth(false);
      navigate("/");
      return;
    }

    gsap.to(container, {
      opacity: 0,
      scale: 0.96,
      y: 20,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        setShowAuth(false);
        navigate("/");
      },
    });
  };

  // =====================================================
  // LOGIN → SIGNUP
  // =====================================================

  const switchToSignup = () => {
    setIsLogin(false);
  };

  // =====================================================
  // SIGNUP → LOGIN
  // =====================================================

  const switchToLogin = () => {
    setIsLogin(true);
  };

  if (!showAuth) return null;

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      onClick={handleClose}
    >
      <AuthContainer
        className="auth-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}

        <CloseButton
          onClick={handleClose}
          whileHover={{
            scale: 1.1,
            rotate: 90,
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          ×
        </CloseButton>

        {/* =====================================================
            3D FLIP
        ===================================================== */}

        <FlipWrapper>
          <FlipCard
            animate={{
              rotateY: isLogin ? 0 : 180,
            }}
            transition={{
              duration: 1.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* =====================================================
                LOGIN SIDE
            ===================================================== */}

            <Side className="login-side">
              <Login onSwitch={switchToSignup} />
            </Side>

            {/* =====================================================
                SIGNUP SIDE
            ===================================================== */}

            <Side
              className="signup-side"
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              <Signup onSwitch={switchToLogin} />
            </Side>
          </FlipCard>
        </FlipWrapper>
      </AuthContainer>
    </Overlay>
  );
};

export default Auth;

// =====================================================
// OVERLAY
// =====================================================

const Overlay = styled(motion.div)`
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 20px;

  /* NO BLACK OVERLAY */
  background: transparent;

  /* NO BLUR */
  backdrop-filter: none;
  -webkit-backdrop-filter: none;

  overflow: hidden;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (max-width: 1024px) {
    padding: 18px;

    overflow: hidden;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    padding: 10px;

    align-items: center;

    overflow: hidden;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

// =====================================================
// AUTH CONTAINER
// =====================================================

const AuthContainer = styled.div`
  position: relative;

  width: 100%;

  max-width: 1050px;

  height: 650px;

  perspective: 1200px;

  border-radius: 24px;

  overflow: visible;

  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.08);

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 950px;

    width: calc(100vw - 36px);

    height: min(650px, calc(100vh - 36px));

    border-radius: 22px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    width: calc(100vw - 20px);

    height: calc(100vh - 20px);

    max-height: none;

    margin: 0;

    border-radius: 20px;

    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.22),
      0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    width: calc(100vw - 16px);

    height: calc(100vh - 16px);

    border-radius: 18px;
  }
`;

// =====================================================
// FLIP WRAPPER
// =====================================================

const FlipWrapper = styled.div`
  position: relative;

  width: 100%;

  height: 100%;

  perspective: 1200px;

  border-radius: inherit;
`;

// =====================================================
// FLIP CARD
// =====================================================

const FlipCard = styled(motion.div)`
  position: relative;

  width: 100%;

  height: 100%;

  transform-style: preserve-3d;

  -webkit-transform-style: preserve-3d;

  transform-origin: center center;

  border-radius: 24px;

  will-change: transform;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    border-radius: 22px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    border-radius: 20px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    border-radius: 18px;
  }
`;

// =====================================================
// LOGIN / SIGNUP SIDES
// =====================================================

const Side = styled.div`
  position: absolute;

  inset: 0;

  width: 100%;

  height: 100%;

  overflow: hidden;

  border-radius: 24px;

  background: ${({ theme }) => theme.body || "#ffffff"};

  backface-visibility: hidden;

  -webkit-backface-visibility: hidden;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    overflow-y: auto;

    overflow-x: hidden;

    -webkit-overflow-scrolling: touch;

    scrollbar-width: thin;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    border-radius: 20px;

    overflow-y: auto;

    overflow-x: hidden;

    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
  }

  /* =====================================================
     SCROLLBAR
  ===================================================== */

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(18, 51, 51, 0.25);

    border-radius: 10px;
  }

  @media (max-width: 767px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    border-radius: 18px;
  }
`;

// =====================================================
// CLOSE BUTTON
// =====================================================

const CloseButton = styled(motion.button)`
  position: absolute;

  top: 18px;

  right: 22px;

  z-index: 100;

  width: 38px;

  height: 38px;

  border: none;

  border-radius: 50%;

  display: flex;

  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.18);

  color: #ffffff;

  font-size: 28px;

  font-weight: 300;

  line-height: 1;

  cursor: pointer;

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    top: 14px;

    right: 16px;

    width: 36px;

    height: 36px;

    font-size: 26px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    top: 12px;

    right: 12px;

    width: 36px;

    height: 36px;

    font-size: 25px;

    background: rgba(8, 44, 44, 0.72);

    backdrop-filter: blur(8px);

    -webkit-backdrop-filter: blur(8px);
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    top: 10px;

    right: 10px;

    width: 34px;

    height: 34px;

    font-size: 23px;
  }
`;

