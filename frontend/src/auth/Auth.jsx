import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Login from "./login";
import Signup from "./signup";

const Auth = ({ showAuth, setShowAuth }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // ================= CLOSE AUTH =================

  const handleClose = () => {
    setShowAuth(false);
    navigate("/");
  };

  // ================= SWITCH FORM =================

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  // ================= RENDER =================

  if (!showAuth) return null;

  return (
    <Overlay
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AuthContainer
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 30 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* ================= CLOSE BUTTON ================= */}

        <CloseButton
          onClick={handleClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </CloseButton>

        {/* ================= LOGIN / SIGNUP ================= */}

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35 }}
              style={{ height: "100%" }}
            >
              <Login onSwitch={switchToSignup} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              style={{ height: "100%" }}
            >
              <Signup onSwitch={switchToLogin} />
            </motion.div>
          )}
        </AnimatePresence>
      </AuthContainer>
    </Overlay>
  );
};

export default Auth;

// ================= STYLES =================

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
`;

const AuthContainer = styled(motion.div)`
  position: relative;

  width: 100%;
  max-width: 1050px;
  height: 650px;

  border-radius: 24px;
  overflow: hidden;

  background: ${({ theme }) => theme.body};

  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    height: auto;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 18px;
  right: 22px;

  z-index: 20;

  width: 38px;
  height: 38px;

  border: none;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.15);
  color: ${({ theme }) => theme.text};

  font-size: 28px;
  font-weight: 300;

  cursor: pointer;

  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
  }
`;