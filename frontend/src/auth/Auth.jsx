import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import Login from "./login";
import Signup from "./signup";

const Auth = ({ showAuth, setShowAuth }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const containerRef = useRef(null);
  const flipCardRef = useRef(null);

  // ================= OPEN ANIMATION =================

  useEffect(() => {
    if (!showAuth || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        scale: 0.84,
        y: 35,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }
    );
  }, [showAuth]);

  // ================= CLOSE =================

  const handleClose = () => {
    if (!containerRef.current) {
      setShowAuth(false);
      navigate("/");
      return;
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 25,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setShowAuth(false);
        navigate("/");
      },
    });
  };

  // ================= LOGIN → SIGNUP =================

  const switchToSignup = () => {
    if (!flipCardRef.current || !isLogin) return;

    gsap.to(flipCardRef.current, {
      rotateY: -180,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        setIsLogin(false);
      },
    });
  };

  // ================= SIGNUP → LOGIN =================

  const switchToLogin = () => {
    if (!flipCardRef.current || isLogin) return;

    gsap.to(flipCardRef.current, {
      rotateY: 0,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        setIsLogin(true);
      },
    });
  };

  if (!showAuth) return null;

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      onClick={handleClose}
    >
      <AuthContainer
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}

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

        {/* FLIP */}

        <FlipWrapper>
          <FlipCard ref={flipCardRef}>

            {/* LOGIN SIDE */}

            <Side className="login-side">
              <Login onSwitch={switchToSignup} />
            </Side>

            {/* SIGNUP SIDE */}

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

  background: rgba(0, 0, 0, 0.55);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  overflow-y: auto;
`;

// =====================================================
// AUTH CONTAINER
// =====================================================

const AuthContainer = styled.div`
  position: relative;

  width: 100%;
  max-width: 1050px;

  height: 650px;

  perspective: 1600px;

  border-radius: 24px;

  overflow: visible;

  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    height: 90vh;
    max-height: 750px;
  }
`;

// =====================================================
// FLIP WRAPPER
// =====================================================

const FlipWrapper = styled.div`
  width: 100%;
  height: 100%;

  perspective: 1600px;
`;

// =====================================================
// FLIP CARD
// =====================================================

const FlipCard = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  transform-style: preserve-3d;

  will-change: transform;

  border-radius: 24px;
`;

// =====================================================
// SIDES
// =====================================================

const Side = styled.div`
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;

  border-radius: 24px;

  background: ${({ theme }) => theme.body};

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
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

  cursor: pointer;

  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
  }
`;