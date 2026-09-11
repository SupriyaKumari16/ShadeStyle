import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const OTPPopup = ({ phone, onClose, onVerified }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp === "1234") {
      onVerified();
    } else {
      alert("Invalid OTP");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;

    // Only numbers + maximum 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
      }}
    >
      <OTPBox
        initial={{
          opacity: 0,
          scale: 0.85,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.92,
          y: 15,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* CLOSE */}

        <CloseButton
          type="button"
          onClick={onClose}
          whileHover={{
            rotate: 90,
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.85,
          }}
        >
          ✕
        </CloseButton>

        {/* TITLE */}

        <Title
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.1,
          }}
        >
          Enter OTP
        </Title>

        {/* PHONE */}

        <PhoneText
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.15,
          }}
        >
          OTP sent to{" "}
          <strong>{phone || "your mobile number"}</strong>
        </PhoneText>

        {/* OTP INPUT */}

        <OTPInput
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={otp}
          onChange={handleOtpChange}
          autoFocus
          placeholder="••••"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
        />

        {/* VERIFY */}

        <VerifyButton
          type="button"
          onClick={handleVerify}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          Verify OTP
        </VerifyButton>

        {/* CANCEL */}

        <CancelButton
          type="button"
          onClick={onClose}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          Cancel
        </CancelButton>
      </OTPBox>
    </Overlay>
  );
};

export default OTPPopup;

/* =====================================================
   OVERLAY
===================================================== */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(8, 44, 44, 0.4);

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10000;

  padding: 20px;

  box-sizing: border-box;
`;

/* =====================================================
   OTP BOX
===================================================== */

const OTPBox = styled(motion.div)`
  position: relative;

  width: 300px;
  max-width: 100%;

  background: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  color: ${({ theme }) =>
    theme.text || "#123333"};

  padding: 25px 20px;

  border-radius: 16px;

  text-align: center;

  box-shadow:
    0 8px 30px rgba(18, 51, 51, 0.25);

  border: 1px solid
    ${({ theme }) =>
      theme.textRgba
        ? `rgba(${theme.textRgba}, 0.08)`
        : "rgba(18, 51, 51, 0.08)"};

  box-sizing: border-box;

  @media (max-width: 400px) {
    width: 92%;
    padding: 23px 17px;
  }
`;

/* =====================================================
   CLOSE
===================================================== */

const CloseButton = styled(motion.button)`
  position: absolute;

  top: 8px;
  right: 10px;

  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;

  background: transparent;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
`;

/* =====================================================
   TITLE
===================================================== */

const Title = styled(motion.h3)`
  color: ${({ theme }) =>
    theme.text || "#123333"};

  font-size: 22px;

  font-weight: 700;

  margin: 0 25px 8px;
`;

/* =====================================================
   PHONE
===================================================== */

const PhoneText = styled(motion.p)`
  color: ${({ theme }) =>
    theme.text || "#123333"};

  font-size: 13px;

  opacity: 0.75;

  margin: 0 0 15px;

  line-height: 1.5;

  word-break: break-word;

  strong {
    font-weight: 700;
  }
`;

/* =====================================================
   OTP INPUT
===================================================== */

const OTPInput = styled(motion.input)`
  width: 100%;

  padding: 11px 10px;

  border: 1px solid
    ${({ theme }) =>
      theme.grey || "#D2E0DC"};

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  color: ${({ theme }) =>
    theme.text || "#123333"};

  outline: none;

  text-align: center;

  font-size: 20px;

  font-weight: 600;

  letter-spacing: 8px;

  box-sizing: border-box;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:focus {
    border-color: ${({ theme }) =>
      theme.text || "#123333"};

    box-shadow:
      0 0 0 3px
      ${({ theme }) =>
        theme.textRgba
          ? `rgba(${theme.textRgba}, 0.08)`
          : "rgba(18, 51, 51, 0.08)"};
  }

  &::placeholder {
    color: ${({ theme }) =>
      theme.textRgba
        ? `rgba(${theme.textRgba}, 0.35)`
        : "rgba(18, 51, 51, 0.35)"};

    letter-spacing: 6px;
  }
`;

/* =====================================================
   VERIFY BUTTON
===================================================== */

const VerifyButton = styled(motion.button)`
  width: 100%;

  margin-top: 15px;

  background: ${({ theme }) =>
    theme.text || "#123333"};

  color: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  padding: 12px;

  border: none;

  border-radius: 10px;

  cursor: pointer;

  font-size: 14px;

  font-weight: 600;

  transition:
    opacity 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    opacity: 0.92;

    box-shadow:
      0 5px 15px
      ${({ theme }) =>
        theme.textRgba
          ? `rgba(${theme.textRgba}, 0.18)`
          : "rgba(18, 51, 51, 0.18)"};
  }
`;

/* =====================================================
   CANCEL
===================================================== */

const CancelButton = styled(motion.button)`
  width: 100%;

  margin-top: 9px;

  background: transparent;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  padding: 10px;

  border: 1px solid
    ${({ theme }) =>
      theme.grey || "#D2E0DC"};

  border-radius: 10px;

  cursor: pointer;

  font-size: 13px;

  font-weight: 500;
`;